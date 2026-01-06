// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { BM25Search, AlgorithmType } from "@/lib/search-engine";
import { getMarkdownFiles } from "@/lib/loader"; // <-- Ваш лоадер

// Глобальная переменная для Singleton (чтобы не пересоздавать индекс при каждом запросе)
const globalForSearch = global as unknown as {
  searchEngine: BM25Search | null;
};

/**
 * Функция получения (или создания) единственного экземпляра движка.
 * Загружает файлы и словари Az.js только 1 раз при старте.
 */
function getSearchEngineInstance() {
  if (globalForSearch.searchEngine) {
    return globalForSearch.searchEngine;
  }

  console.log("🚀 [Server] Инициализация поискового индекса...");

  // 1. Читаем файлы с диска (вашим лоадером)
  const articles = getMarkdownFiles();

  // 2. Создаем движок (тут внутри подгрузятся словари Az.js, если нужно)
  const engine = new BM25Search(articles);

  // 3. Сохраняем в глобальную переменную
  if (process.env.NODE_ENV !== "production") {
    globalForSearch.searchEngine = engine;
  }

  console.log(`✅ [Server] Индекс готов: ${articles.length} статей.`);
  return engine;
}

export async function POST(request: Request) {
  try {
    const { query, algorithm } = await request.json();

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Получаем готовый движок из памяти
    const searchEngine = getSearchEngineInstance();

    // Запускаем поиск с выбранным алгоритмом
    // searchEngine сам переключит режим (BM25 / Stemming / Lemmatization)
    const results = searchEngine.search(query, algorithm as AlgorithmType);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
