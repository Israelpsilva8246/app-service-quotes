import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Item, QuoteDoc, QuoteFilters, QuoteStatus } from "@/types/quote";
import { loadQuotes, saveQuotes } from "@/storage/quotesStorage";
import {
  DEFAULT_FILTERS,
  loadFilters,
  saveFilters,
} from "@/storage/filtersStorage";
import { generateId } from "@/utils/id";
import { getQuoteTotal } from "@/utils/quoteCalculations";

export type NewQuoteInput = {
  title: string;
  client: string;
  status: QuoteStatus;
  items: Item[];
  discountPct?: number;
};

type QuotesContextValue = {
  quotes: QuoteDoc[];
  loading: boolean;
  filters: QuoteFilters;
  search: string;
  filteredQuotes: QuoteDoc[];
  setSearch: (value: string) => void;
  setFilters: (filters: QuoteFilters) => void;
  getQuoteById: (id: string) => QuoteDoc | undefined;
  createQuote: (input: NewQuoteInput) => QuoteDoc;
  updateQuote: (id: string, input: NewQuoteInput) => void;
  deleteQuote: (id: string) => void;
  duplicateQuote: (id: string) => void;
};

const QuotesContext = createContext<QuotesContextValue | null>(null);

export function QuotesProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<QuoteDoc[]>([]);
  const [filters, setFiltersState] = useState<QuoteFilters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const [storedQuotes, storedFilters] = await Promise.all([
        loadQuotes(),
        loadFilters(),
      ]);
      setQuotes(storedQuotes);
      setFiltersState(storedFilters);
      setLoading(false);
    }
    bootstrap();
  }, []);

  const persistQuotes = useCallback((next: QuoteDoc[]) => {
    setQuotes(next);
    saveQuotes(next);
  }, []);

  const setFilters = useCallback((next: QuoteFilters) => {
    setFiltersState(next);
    saveFilters(next);
  }, []);

  const getQuoteById = useCallback(
    (id: string) => quotes.find((quote) => quote.id === id),
    [quotes]
  );

  const createQuote = useCallback(
    (input: NewQuoteInput) => {
      const now = new Date().toISOString();
      const quote: QuoteDoc = {
        id: generateId(),
        client: input.client,
        title: input.title,
        items: input.items,
        discountPct: input.discountPct,
        status: input.status,
        createdAt: now,
        updatedAt: now,
      };
      persistQuotes([quote, ...quotes]);
      return quote;
    },
    [quotes, persistQuotes]
  );

  const updateQuote = useCallback(
    (id: string, input: NewQuoteInput) => {
      const next = quotes.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              client: input.client,
              title: input.title,
              items: input.items,
              discountPct: input.discountPct,
              status: input.status,
              updatedAt: new Date().toISOString(),
            }
          : quote
      );
      persistQuotes(next);
    },
    [quotes, persistQuotes]
  );

  const deleteQuote = useCallback(
    (id: string) => {
      persistQuotes(quotes.filter((quote) => quote.id !== id));
    },
    [quotes, persistQuotes]
  );

  const duplicateQuote = useCallback(
    (id: string) => {
      const original = quotes.find((quote) => quote.id === id);
      if (!original) return;
      const now = new Date().toISOString();
      const copy: QuoteDoc = {
        ...original,
        id: generateId(),
        title: `${original.title} (cópia)`,
        status: "Rascunho",
        createdAt: now,
        updatedAt: now,
        items: original.items.map((item) => ({ ...item, id: generateId() })),
      };
      persistQuotes([copy, ...quotes]);
    },
    [quotes, persistQuotes]
  );

  const filteredQuotes = useMemo(() => {
    let result = quotes;

    if (filters.status.length > 0) {
      result = result.filter((quote) => filters.status.includes(quote.status));
    }

    const term = search.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (quote) =>
          quote.title.toLowerCase().includes(term) ||
          quote.client.toLowerCase().includes(term)
      );
    }

    const sorted = [...result];
    switch (filters.sortBy) {
      case "recent":
        sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "highest":
        sorted.sort((a, b) => getQuoteTotal(b) - getQuoteTotal(a));
        break;
      case "lowest":
        sorted.sort((a, b) => getQuoteTotal(a) - getQuoteTotal(b));
        break;
    }

    return sorted;
  }, [quotes, filters, search]);

  const value: QuotesContextValue = {
    quotes,
    loading,
    filters,
    search,
    filteredQuotes,
    setSearch,
    setFilters,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote,
    duplicateQuote,
  };

  return (
    <QuotesContext.Provider value={value}>{children}</QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
}
