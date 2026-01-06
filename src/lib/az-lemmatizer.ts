import fs from "fs";
import path from "path";
import Az from "az";

let isInitialized = false;

const IT_DICTIONARY: Record<string, string> = {
  // Стемминг
  стемминг: "стемминг",
  стемминга: "стемминг",
  стеммингу: "стемминг",
  стеммингом: "стемминг",

  // Деплой
  деплой: "деплой",
  деплоя: "деплой",
  деплоем: "деплой",
  задеплоить: "задеплоить",

  // Фронтенд/Бэкенд
  фронтенд: "фронтенд",
  бекенд: "бекенд",
  бэкенд: "бекенд",
  ендпоинт: "ендпоинт",

  // Сервер (на случай если Az.js тупит с ним)
  сервера: "сервер",
  серверов: "сервер",
  серверу: "сервер",
};

export class AzLemmatizer {
  static init() {
    if (isInitialized) return;

    try {
      const dictsPath = path.join(process.cwd(), "src", "data");
      const libs = fs.readFileSync(
        path.join(dictsPath, "libs.min.json"),
        "utf8"
      );
      const words = fs.readFileSync(
        path.join(dictsPath, "words.min.json"),
        "utf8"
      );

      Az.Morph.init(libs, words);
      isInitialized = true;
      console.log("Az.js (Лемматизация) загружена.");
    } catch (error) {
      console.error("Ошибка загрузки словарей Az.js:", error);
    }
  }

  static lemmatize(word: string): string {
    if (!isInitialized) this.init();

    const clean = word.toLowerCase().replace(/ё/g, "е").trim();
    if (!clean) return "";

    // 1. СНАЧАЛА ПРОВЕРЯЕМ НАШ РУЧНОЙ IT-СЛОВАРЬ
    // Если слово есть в списке, возвращаем его сразу, не мучая Az.js
    if (IT_DICTIONARY[clean]) {
      return IT_DICTIONARY[clean];
    }

    // 2. Если слова нет в нашем списке, спрашиваем библиотеку
    const morphs = Az.Morph(clean);

    if (morphs.length === 0) return clean;

    return morphs[0].normalize().word;
  }
}
