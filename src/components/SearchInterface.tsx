"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, BookOpen } from "lucide-react";
import { useDebounce } from "use-debounce";
import ArticleModal from "./ArticleModal";
import { SnippetHighlighter } from "./SnippetHighlighter";

type SearchResult = {
  id: number;
  title: string;
  score: number;
  snippet: string;
  originalContent: string;
};

export default function SearchInterface() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [algorithm, setAlgorithm] = useState("bm25");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<SearchResult | null>(
    null
  );

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: debouncedQuery, algorithm }),
        });
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, algorithm]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Knowledge Base
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          High-performance search powered by BM25 & Russian Morphology
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
        </div>

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer text-zinc-900 dark:text-zinc-100"
        >
          <option value="bm25">Standard BM25</option>
          <option value="stemming">BM25 + Stemming (Ru)</option>
          <option value="lemmatization">BM25 + Lemmatization (Az.js)</option>
        </select>
      </div>

      {/* Results Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : results.length > 0 ? (
          results.map((res) => (
            <div
              key={res.id}
              onClick={() => setSelectedArticle(res)}
              className="group p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-blue-500 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                <BookOpen className="w-3 h-3" />
                <span>Docs</span>
                <span>/</span>
                <span>General</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2 group-hover:underline">
                {res.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                <SnippetHighlighter text={res.snippet} query={debouncedQuery} />
              </p>
            </div>
          ))
        ) : query ? (
          <div className="text-center py-12 text-zinc-500">
            No results found for "{query}"
          </div>
        ) : null}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <ArticleModal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          content={selectedArticle.originalContent}
          highlightQuery={debouncedQuery}
        />
      )}
    </div>
  );
}
