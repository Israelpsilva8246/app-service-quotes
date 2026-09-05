import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuoteDoc } from "@/types/quote";

const QUOTES_KEY = "@service-quotes:quotes";

export async function loadQuotes(): Promise<QuoteDoc[]> {
  const raw = await AsyncStorage.getItem(QUOTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveQuotes(quotes: QuoteDoc[]): Promise<void> {
  await AsyncStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}
