import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export function getMarkdownFiles(): string[] {
  // Проверяем, существует ли папка
  if (!fs.existsSync(contentDirectory)) {
    console.warn(
      'Directory "content" not found. Please create it in the project root.'
    );
    return [];
  }

  // Читаем список файлов
  const fileNames = fs.readdirSync(contentDirectory);

  // Фильтруем только .md файлы и читаем их содержимое
  const allContent = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      return fileContents;
    });

  return allContent;
}
