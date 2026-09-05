import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuoteFilters } from "@/types/quote";

const FILTERS_KEY = "@service-quotes:filters";

export const DEFAULT_FILTERS: QuoteFilters = {
  status: [],
  sortBy: "recent",
};

export async function loadFilters(): Promise<QuoteFilters> {
  const raw = await AsyncStorage.getItem(FILTERS_KEY);
  return raw ? JSON.parse(raw) : DEFAULT_FILTERS;
}

export async function saveFilters(filters: QuoteFilters): Promise<void> {
  await AsyncStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
}
