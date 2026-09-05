export type QuoteStatus = "Rascunho" | "Enviado" | "Aprovado" | "Recusado";

export type Item = {
  id: string;
  description: string;
  qty: number;
  price: number;
};

export type QuoteDoc = {
  id: string;
  client: string;
  title: string;
  items: Item[];
  discountPct?: number;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
};

export type SortOption = "recent" | "oldest" | "highest" | "lowest";

export type QuoteFilters = {
  status: QuoteStatus[];
  sortBy: SortOption;
};
