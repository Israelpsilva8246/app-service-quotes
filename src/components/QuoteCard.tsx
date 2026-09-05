import { Pressable, StyleSheet, Text, View } from "react-native";

import { QuoteDoc } from "@/types/quote";
import { getQuoteTotal } from "@/utils/quoteCalculations";
import { formatCurrency } from "@/utils/format";
import { StatusBadge } from "@/components/StatusBadge";

export function QuoteCard({
  quote,
  onPress,
}: {
  quote: QuoteDoc;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {quote.title}
        </Text>
        <StatusBadge status={quote.status} />
      </View>
      <Text style={styles.client}>{quote.client}</Text>
      <Text style={styles.price}>{formatCurrency(getQuoteTotal(quote))}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#F0F0F3",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  client: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
});
