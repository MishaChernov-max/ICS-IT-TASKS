// src/lib/search-engine.ts
import matter from "gray-matter";
import { PorterStemmerRu } from "natural";
import { AzLemmatizer } from "./az-lemmatizer";

const k1 = 1.2;
const b = 0.75;

// Стоп-слова
const INDEX_STOP_WORDS = new Set([
  "и",
  "а",
  "но",
  "или",
  "в",
  "на",
  "с",
  "по",
  "к",
  "у",
  "о",
  "об",
  "за",
  "для",
  "от",
]);

export type AlgorithmType = "bm25" | "stemming" | "lemmatization";

export type SearchResult = {
  id: number;
  title: string;
  score: number;
  content: string;
  snippet: string;
  originalContent: string;
};

interface DocParams {
  id: number;
  tokens: string[];
  originalLength: number;
  title: string;
  content: string;
  originalContent: string;
}

export class BM25Search {
  private documents: DocParams[] = [];
  private avgdl: number = 0;
  private corpusSize: number = 0;
  private idfCache: Map<string, number> = new Map();
  private currentAlgorithm: AlgorithmType = "bm25";

  constructor(rawData: string[]) {
    this.indexDocuments(rawData);
  }

  private processToken(token: string): string {
    // 1. Если выбран режим СТЕММИНГА (Классика)
    if (this.currentAlgorithm === "stemming") {
      return PorterStemmerRu.stem(token);
    }

    // 2. Если выбран режим ЛЕММАТИЗАЦИИ (Гибрид)
    if (this.currentAlgorithm === "lemmatization") {
      const lemma = AzLemmatizer.lemmatize(token);
      return PorterStemmerRu.stem(lemma);
    }

    return token;
  }

  private cleanText(text: string): string {
    return text
      .replace(/\[image:[^\]]+\]/g, "")
      .replace(/:::[a-z]+ ?(.*)?/g, "$1")
      .replace(/:::/g, "")
      .replace(/\{\.[^}]+\}/g, "")
      .replace(/---[\s\S]*?---/, "")
      .replace(/#+\s/g, "");
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .split(/[^a-zа-яё0-9]+/i)
      .filter((t) => t.length > 1)
      .map((t) => this.processToken(t));
  }

  // --- ИНДЕКСАЦИЯ ---
  private indexDocuments(rawData: string[]) {
    this.idfCache.clear();
    let totalLength = 0;

    this.documents = rawData.map((fileContent, index) => {
      const { data, content: rawBody } = matter(fileContent);
      const cleanBody = this.cleanText(rawBody);
      const tokens = this.tokenize(cleanBody + " " + (data.title || ""));

      totalLength += tokens.length;

      return {
        id: index,
        tokens,
        originalLength: tokens.length,
        title: data.title || `Untitled ${index}`,
        content: cleanBody,
        originalContent: fileContent,
      };
    });

    this.corpusSize = this.documents.length;
    this.avgdl = totalLength / Math.max(1, this.corpusSize);
  }

  private calculateIDF(term: string): number {
    if (this.idfCache.has(term)) return this.idfCache.get(term)!;
    const nq = this.documents.filter((doc) => doc.tokens.includes(term)).length;
    const idf = Math.log(1 + (this.corpusSize - nq + 0.5) / (nq + 0.5));
    const finalIdf = Math.max(idf, 0);
    this.idfCache.set(term, finalIdf);
    return finalIdf;
  }

  // === НОВЫЙ ГЕНЕРАТОР СНИППЕТОВ (СКАНИРУЮЩИЙ) ===
  private generateSnippet(text: string, queryTokens: string[]): string {
    // Если запрос пустой, возвращаем начало
    if (!queryTokens.length) return text.slice(0, 180) + "...";

    // 1. Разбиваем оригинальный текст на слова с сохранением разделителей,
    // чтобы потом можно было восстановить позицию.
    // Регулярка захватывает разделители в массив.
    const splitRegex = /([^a-zа-яё0-9]+)/i;
    const parts = text.split(splitRegex);

    let currentPos = 0;
    let bestPos = -1;

    // 2. Бежим по каждому слову в тексте
    for (const part of parts) {
      // Если это разделитель (пробел, запятая), просто двигаем позицию
      if (!/[a-zа-яё0-9]/i.test(part)) {
        currentPos += part.length;
        continue;
      }

      // Если это слово - применяем к нему ТЕКУЩИЙ АЛГОРИТМ
      // Например, в тексте "людьми" -> превращаем в "человек" (если включена лемматизация)
      const token = this.processToken(part.toLowerCase());

      // 3. Проверяем, есть ли этот токен в запросе
      if (queryTokens.includes(token)) {
        bestPos = currentPos;
        break; // Нашли первое вхождение!
      }

      // Доп. проверка: если токен не найден точно, проверим вхождение корня (для надежности)
      // Если ищем "сервер", а нашли "серверный" (стем может отличаться)
      if (
        queryTokens.some((qt) => token.startsWith(qt) || qt.startsWith(token))
      ) {
        bestPos = currentPos;
        break;
      }

      currentPos += part.length;
    }

    // 4. Если ничего не нашли (странно, но бывает), возвращаем начало
    if (bestPos === -1) {
      return text.substring(0, 200) + (text.length > 200 ? "..." : "");
    }

    // 5. Вырезаем кусок
    const start = Math.max(0, bestPos - 60);
    const end = Math.min(text.length, bestPos + 120);

    let snippet = text.substring(start, end);

    // Чистим обрывки слов по краям
    if (start > 0) {
      const firstSpace = snippet.indexOf(" ");
      if (firstSpace !== -1) snippet = snippet.substring(firstSpace + 1);
    }
    if (end < text.length) {
      const lastSpace = snippet.lastIndexOf(" ");
      if (lastSpace !== -1) snippet = snippet.substring(0, lastSpace);
    }

    return (
      (start > 0 ? "..." : "") + snippet + (end < text.length ? "..." : "")
    );
  }

  // --- ПОИСК ---
  public search(query: string, algorithm: AlgorithmType): SearchResult[] {
    this.currentAlgorithm = algorithm;

    // Перестраиваем индекс (это быстро)
    this.indexDocuments(this.documents.map((d) => d.originalContent));

    const queryTokens = this.tokenize(query).filter(
      (t) => !INDEX_STOP_WORDS.has(t)
    );

    if (queryTokens.length === 0) return [];

    const scores = new Map<number, number>();

    this.documents.forEach((doc) => {
      // Строгая проверка: все токены должны быть в документе
      const hasAllTokens = queryTokens.every((qToken) =>
        doc.tokens.includes(qToken)
      );
      if (!hasAllTokens) return;

      let score = 0;
      queryTokens.forEach((term) => {
        const freq = doc.tokens.filter((t) => t === term).length;
        const idf = this.calculateIDF(term);
        const numerator = freq * (k1 + 1);
        const denominator =
          freq + k1 * (1 - b + b * (doc.originalLength / this.avgdl));
        score += idf * (numerator / denominator);
      });
      scores.set(doc.id, score);
    });

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id, score]) => {
        const doc = this.documents.find((d) => d.id === id)!;
        return {
          id: doc.id,
          title: doc.title,
          score,
          content: doc.content,
          // Передаем токены для умной нарезки
          snippet: this.generateSnippet(doc.content, queryTokens),
          originalContent: doc.originalContent,
        };
      });
  }

  public searchBM25(query: string) {
    return this.search(query, "bm25");
  }
  public searchBM25Stemming(query: string) {
    return this.search(query, "stemming");
  }
  public searchBM25Lemmatization(query: string) {
    return this.search(query, "lemmatization");
  }
}
