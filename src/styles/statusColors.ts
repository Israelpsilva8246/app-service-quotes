import { QuoteStatus } from "@/types/quote";

export const STATUS_COLORS: Record<
  QuoteStatus,
  { bg: string; text: string; dot: string }
> = {
  Rascunho: { bg: "#F1F1F4", text: "#6B7280", dot: "#9CA3AF" },
  Enviado: { bg: "#E8F0FE", text: "#2563EB", dot: "#3B82F6" },
  Aprovado: { bg: "#E6F7EE", text: "#16A34A", dot: "#22C55E" },
  Recusado: { bg: "#FDECEC", text: "#DC2626", dot: "#EF4444" },
};

export const STATUS_OPTIONS: QuoteStatus[] = [
  "Rascunho",
  "Enviado",
  "Aprovado",
  "Recusado",
];
