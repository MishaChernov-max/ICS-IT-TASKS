// src/components/ArticleModal.tsx
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";
import matter from "gray-matter";
import { RuStemmer } from "@/lib/ru-stemmer";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  highlightQuery: string;
}

// Компонент морфологической подсветки (самый надежный)
const MorphologyHighlighter = ({
  text,
  queryStems,
}: {
  text: string;
  queryStems: string[];
}) => {
  if (!text || queryStems.length === 0) return <>{text}</>;

  // 1. Разбиваем текст на слова и разделители (пробелы, знаки препинания)
  // Регулярка ([^...]+) захватывает разделители в массив
  const parts = text.split(/([^a-zа-яё0-9]+)/i);

  return (
    <>
      {parts.map((part, i) => {
        // Если это разделитель или пустота — возвращаем как есть
        if (!part.trim() || /[^a-zа-яё0-9]/i.test(part)) {
          return <span key={i}>{part}</span>;
        }

        // 2. Вычисляем корень текущего слова в тексте
        const partStem = RuStemmer.stem(part.toLowerCase());

        // 3. Проверяем: есть ли этот корень в списке корней запроса?
        // Пример: в тексте "фильтрация" (корень "фильтр"), в запросе "фильтры" (корень "фильтр"). Совпадение!
        const isMatch = queryStems.includes(partStem);

        return isMatch ? (
          <mark
            key={i}
            className="bg-yellow-200 rounded-sm px-0.5 text-black font-medium"
          >
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </>
  );
};

export default function ArticleModal({
  isOpen,
  onClose,
  content,
  highlightQuery,
}: ArticleModalProps) {
  if (!isOpen) return null;

  const { content: markdownBody, data } = matter(content);

  // Подготавливаем КОРНИ (stems) запроса
  const queryStems = useMemo(() => {
    if (!highlightQuery) return [];

    return highlightQuery
      .toLowerCase()
      .split(/[^a-zа-яё0-9]+/i)
      .filter((w) => w.length > 1) // Игнорируем короткие предлоги
      .map((w) => RuStemmer.stem(w)); // Превращаем запрос в массив корней
  }, [highlightQuery]);

  // Обработка контента (очистка от лишних тегов)
  let processedContent = markdownBody
    .replace(/:::note (.*?)\n([\s\S]*?):::/g, "> **Note: $1**\n> \n> $2")
    .replace(/\[image:.*?\]/g, "")
    .replace(/\{\.[^}]+\}/g, "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full max-w-3xl max-h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b dark:border-zinc-700 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {data.title}
            </h2>
            <p className="text-xs text-zinc-500">Order: {data.order}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto prose dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p>
                  {React.Children.map(children, (child) =>
                    typeof child === "string" ? (
                      <MorphologyHighlighter
                        text={child}
                        queryStems={queryStems}
                      />
                    ) : (
                      child
                    )
                  )}
                </p>
              ),
              li: ({ children }) => (
                <li>
                  {React.Children.map(children, (child) =>
                    typeof child === "string" ? (
                      <MorphologyHighlighter
                        text={child}
                        queryStems={queryStems}
                      />
                    ) : (
                      child
                    )
                  )}
                </li>
              ),
              h1: ({ children }) => (
                <h1>
                  {React.Children.map(children, (c) =>
                    typeof c === "string" ? (
                      <MorphologyHighlighter text={c} queryStems={queryStems} />
                    ) : (
                      c
                    )
                  )}
                </h1>
              ),
              h2: ({ children }) => (
                <h2>
                  {React.Children.map(children, (c) =>
                    typeof c === "string" ? (
                      <MorphologyHighlighter text={c} queryStems={queryStems} />
                    ) : (
                      c
                    )
                  )}
                </h2>
              ),
              h3: ({ children }) => (
                <h3>
                  {React.Children.map(children, (c) =>
                    typeof c === "string" ? (
                      <MorphologyHighlighter text={c} queryStems={queryStems} />
                    ) : (
                      c
                    )
                  )}
                </h3>
              ),
              blockquote: ({ children }) => <blockquote>{children}</blockquote>,
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
