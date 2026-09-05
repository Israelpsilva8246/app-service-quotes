import { Item, QuoteDoc } from "@/types/quote";

export function getItemTotal(item: Item) {
  return item.qty * item.price;
}

export function getItemsCount(items: Item[]) {
  return items.reduce((count, item) => count + item.qty, 0);
}

export function getSubtotal(items: Item[]) {
  return items.reduce((sum, item) => sum + getItemTotal(item), 0);
}

export function getDiscountValue(items: Item[], discountPct?: number) {
  if (!discountPct) return 0;
  return getSubtotal(items) * (discountPct / 100);
}

export function getTotal(items: Item[], discountPct?: number) {
  return getSubtotal(items) - getDiscountValue(items, discountPct);
}

export function getQuoteTotal(quote: QuoteDoc) {
  return getTotal(quote.items, quote.discountPct);
}
