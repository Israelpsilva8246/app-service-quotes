import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Item } from "@/types/quote";
import { generateId } from "@/utils/id";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

type Props = {
  visible: boolean;
  item: Item | null;
  onClose: () => void;
  onSave: (item: Item) => void;
  onDelete: (itemId: string) => void;
};

export function ServiceModal({ visible, item, onClose, onSave, onDelete }: Props) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (visible) {
      setDescription(item?.description ?? "");
      setPrice(item ? String(item.price) : "");
      setQty(item?.qty ?? 1);
    }
  }, [visible, item]);

  function handleSave() {
    if (!description.trim()) return;
    onSave({
      id: item?.id ?? generateId(),
      description: description.trim(),
      price: Number(price.replace(",", ".")) || 0,
      qty,
    });
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Serviço</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={22} color="#111827" />
            </Pressable>
          </View>

          <Input
            placeholder="Descrição do serviço"
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.textarea}
          />

          <View style={styles.row}>
            <Input
              placeholder="R$ 0,00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              style={styles.priceInput}
            />

            <View style={styles.stepper}>
              <Pressable
                style={styles.stepperButton}
                onPress={() => setQty((current) => Math.max(1, current - 1))}
              >
                <MaterialIcons name="remove" size={18} color="#5B37F2" />
              </Pressable>
              <Text style={styles.stepperValue}>{qty}</Text>
              <Pressable
                style={styles.stepperButton}
                onPress={() => setQty((current) => current + 1)}
              >
                <MaterialIcons name="add" size={18} color="#5B37F2" />
              </Pressable>
            </View>
          </View>

          <View style={styles.actions}>
            {item && (
              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  onDelete(item.id);
                  onClose();
                }}
              >
                <MaterialIcons name="delete-outline" size={22} color="#E63946" />
              </Pressable>
            )}
            <Button
              title="Salvar"
              icon="check"
              style={styles.saveButton}
              onPress={handleSave}
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
  textarea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  priceInput: {
    flex: 1,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  stepperButton: {
    padding: 2,
  },
  stepperValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    minWidth: 16,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E63946",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    flex: 1,
  },
});
