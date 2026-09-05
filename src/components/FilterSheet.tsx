import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { QuoteFilters, SortOption } from "@/types/quote";
import { STATUS_COLORS, STATUS_OPTIONS } from "@/styles/statusColors";
import { DEFAULT_FILTERS } from "@/storage/filtersStorage";
import { CheckboxOption } from "@/components/CheckboxOption";
import { RadioOption } from "@/components/RadioOption";
import { Button } from "@/components/Button";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Mais recente" },
  { value: "oldest", label: "Mais antigo" },
  { value: "highest", label: "Maior valor" },
  { value: "lowest", label: "Menor valor" },
];

type Props = {
  visible: boolean;
  filters: QuoteFilters;
  onClose: () => void;
  onApply: (filters: QuoteFilters) => void;
};

export function FilterSheet({ visible, filters, onClose, onApply }: Props) {
  const [draft, setDraft] = useState<QuoteFilters>(filters);

  useEffect(() => {
    if (visible) setDraft(filters);
  }, [visible, filters]);

  function toggleStatus(status: QuoteFilters["status"][number]) {
    setDraft((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((item) => item !== status)
        : [...prev.status, status],
    }));
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtrar e ordenar</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={22} color="#111827" />
            </Pressable>
          </View>

          <Text style={styles.sectionLabel}>Status</Text>
          <View style={styles.optionsGrid}>
            {STATUS_OPTIONS.map((status) => (
              <View style={styles.optionCell} key={status}>
                <CheckboxOption
                  label={status}
                  checked={draft.status.includes(status)}
                  onPress={() => toggleStatus(status)}
                  dotColor={STATUS_COLORS[status].dot}
                />
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Ordenação</Text>
          <View style={styles.optionsColumn}>
            {SORT_OPTIONS.map((option) => (
              <RadioOption
                key={option.value}
                label={option.label}
                selected={draft.sortBy === option.value}
                onPress={() => setDraft((prev) => ({ ...prev, sortBy: option.value }))}
              />
            ))}
          </View>

          <View style={styles.actions}>
            <Button
              title="Resetar filtros"
              variant="secondary"
              icon="restart-alt"
              style={styles.actionButton}
              onPress={() => setDraft(DEFAULT_FILTERS)}
            />
            <Button
              title="Aplicar"
              variant="primary"
              icon="check"
              style={styles.actionButton}
              onPress={() => {
                onApply(draft);
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  optionCell: {
    width: "45%",
  },
  optionsColumn: {
    gap: 14,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
});
