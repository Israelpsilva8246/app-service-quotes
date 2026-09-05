import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Item } from "@/types/quote";
import { getItemTotal } from "@/utils/quoteCalculations";
import { formatCurrency } from "@/utils/format";

export function ServiceItemRow({
  item,
  onPress,
}: {
  item: Item;
  onPress: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.meta}>
          {formatCurrency(getItemTotal(item))} · Qt: {item.qty}
        </Text>
      </View>
      <Pressable onPress={onPress} hitSlop={8}>
        <MaterialIcons name="edit" size={18} color="#5B37F2" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  meta: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
