import { RuStemmer } from "@/lib/ru-stemmer";

export const SnippetHighlighter = ({
  text,
  query,
}: {
  text: string;
  query: string;
}) => {
  if (!query || !text) return <>{text}</>;

  // 1. Подготовка стемов запроса
  const queryStems = query
    .toLowerCase()
    .split(/[^a-zа-яё0-9]+/i)
    .filter((w) => w.length > 1)
    .map((w) => RuStemmer.stem(w));

  if (queryStems.length === 0) return <>{text}</>;

  // 2. Разбивка текста на токены и разделители
  const parts = text.split(/([^a-zа-яё0-9]+)/i);

  return (
    <>
      {parts.map((part, i) => {
        // Пропускаем разделители
        if (!part.trim() || /[^a-zа-яё0-9]/i.test(part)) {
          return <span key={i}>{part}</span>;
        }

        const partStem = RuStemmer.stem(part.toLowerCase());

        const isMatch = queryStems.some((qStem) => {
          if (partStem === qStem) return true;
          if (partStem.startsWith(qStem)) return true;
          if (qStem.startsWith(partStem)) return true;
          return false;
        });

        return isMatch ? (
          <mark
            key={i}
            className="bg-yellow-200 rounded-sm px-0 text-black font-medium"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
};
