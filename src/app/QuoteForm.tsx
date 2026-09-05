import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { RadioOption } from "@/components/RadioOption";
import { ServiceItemRow } from "@/components/ServiceItemRow";
import { ServiceModal } from "@/components/ServiceModal";
import { useQuotes } from "@/contexts/QuotesContext";
import { STATUS_COLORS, STATUS_OPTIONS } from "@/styles/statusColors";
import { Item, QuoteStatus } from "@/types/quote";
import { getItemsCount, getSubtotal, getTotal } from "@/utils/quoteCalculations";
import { formatCurrency } from "@/utils/format";
import { stackRouteList, stackRouteProps } from "@/routes/StackRoutes";

import { styles } from "./QuoteForm.styles";

export function QuoteForm() {
  const navigation =
    useNavigation<NativeStackNavigationProp<stackRouteList>>();
  const route = useRoute<stackRouteProps<"quoteForm">["route"]>();
  const { getQuoteById, createQuote, updateQuote } = useQuotes();

  const existingQuote = route.params?.quoteId
    ? getQuoteById(route.params.quoteId)
    : undefined;

  const [title, setTitle] = useState(existingQuote?.title ?? "");
  const [client, setClient] = useState(existingQuote?.client ?? "");
  const [status, setStatus] = useState<QuoteStatus>(
    existingQuote?.status ?? "Rascunho"
  );
  const [items, setItems] = useState<Item[]>(existingQuote?.items ?? []);
  const [discountPct, setDiscountPct] = useState(
    existingQuote?.discountPct ? String(existingQuote.discountPct) : ""
  );
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);

  const discountValue = Number(discountPct.replace(",", ".")) || 0;
  const subtotal = useMemo(() => getSubtotal(items), [items]);
  const total = useMemo(
    () => getTotal(items, discountValue),
    [items, discountValue]
  );

  function handleOpenNewService() {
    setEditingItem(null);
    setServiceModalVisible(true);
  }

  function handleOpenEditService(item: Item) {
    setEditingItem(item);
    setServiceModalVisible(true);
  }

  function handleSaveItem(item: Item) {
    setItems((prev) => {
      const exists = prev.some((current) => current.id === item.id);
      return exists
        ? prev.map((current) => (current.id === item.id ? item : current))
        : [...prev, item];
    });
  }

  function handleDeleteItem(itemId: string) {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  function handleSave() {
    if (!title.trim() || !client.trim()) return;

    const input = {
      title: title.trim(),
      client: client.trim(),
      status,
      items,
      discountPct: discountValue || undefined,
    };

    if (existingQuote) {
      updateQuote(existingQuote.id, input);
    } else {
      createQuote(input);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Orçamento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações gerais</Text>
          <Input placeholder="Título" value={title} onChangeText={setTitle} />
          <Input placeholder="Cliente" value={client} onChangeText={setClient} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusGrid}>
            {STATUS_OPTIONS.map((option) => (
              <View style={styles.statusCell} key={option}>
                <RadioOption
                  label={option}
                  selected={status === option}
                  onPress={() => setStatus(option)}
                  dotColor={STATUS_COLORS[option].dot}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços inclusos</Text>
          {items.length === 0 ? (
            <Text style={styles.emptyItems}>Nenhum serviço adicionado</Text>
          ) : (
            items.map((item) => (
              <ServiceItemRow
                key={item.id}
                item={item}
                onPress={() => handleOpenEditService(item)}
              />
            ))
          )}
          <Pressable style={styles.addServiceButton} onPress={handleOpenNewService}>
            <MaterialIcons name="add" size={18} color="#5B37F2" />
            <Text style={styles.addServiceLabel}>Adicionar serviço</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investimento</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal · {getItemsCount(items)} itens
            </Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Desconto (%)</Text>
            <Input
              placeholder="0"
              value={discountPct}
              onChangeText={setDiscountPct}
              keyboardType="decimal-pad"
              style={styles.discountInput}
            />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelBold}>Valor total</Text>
            <Text style={styles.summaryValueBold}>{formatCurrency(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancelar"
          variant="danger"
          icon="close"
          style={styles.footerButton}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Salvar"
          variant="primary"
          icon="check"
          style={styles.footerButton}
          onPress={handleSave}
        />
      </View>

      <ServiceModal
        visible={serviceModalVisible}
        item={editingItem}
        onClose={() => setServiceModalVisible(false)}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
    </View>
  );
}
