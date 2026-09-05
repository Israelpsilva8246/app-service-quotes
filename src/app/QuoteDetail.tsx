import { Alert, Pressable, ScrollView, Share, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { useQuotes } from "@/contexts/QuotesContext";
import {
  getDiscountValue,
  getItemTotal,
  getItemsCount,
  getSubtotal,
  getQuoteTotal,
} from "@/utils/quoteCalculations";
import { formatCurrency, formatDate } from "@/utils/format";
import { stackRouteList, stackRouteProps } from "@/routes/StackRoutes";

import { styles } from "./QuoteDetail.styles";

export function QuoteDetail() {
  const navigation =
    useNavigation<NativeStackNavigationProp<stackRouteList>>();
  const route = useRoute<stackRouteProps<"quoteDetail">["route"]>();
  const { getQuoteById, deleteQuote, duplicateQuote } = useQuotes();

  const quote = getQuoteById(route.params.quoteId);

  if (!quote) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>Orçamento não encontrado</Text>
        </View>
      </View>
    );
  }

  const subtotal = getSubtotal(quote.items);
  const discountValue = getDiscountValue(quote.items, quote.discountPct);
  const total = getQuoteTotal(quote);

  function handleDelete() {
    Alert.alert(
      "Excluir orçamento",
      "Tem certeza que deseja excluir este orçamento? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            deleteQuote(quote!.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  function handleDuplicate() {
    Alert.alert(
      "Duplicar orçamento",
      "Deseja criar uma cópia deste orçamento como rascunho?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Duplicar",
          onPress: () => {
            duplicateQuote(quote!.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  function handleShare() {
    Share.share({
      message: `Orçamento: ${quote!.title}\nCliente: ${quote!.client}\nValor total: ${formatCurrency(
        total
      )}`,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>
            Orçamento #{quote.id.slice(-5).toUpperCase()}
          </Text>
        </View>
        <StatusBadge status={quote.status} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.iconBadge}>
            <MaterialIcons name="description" size={22} color="#5B37F2" />
          </View>
          <Text style={styles.quoteTitle}>{quote.title}</Text>
        </View>

        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>Cliente</Text>
          <Text style={styles.metaValue}>{quote.client}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaSection}>
            <Text style={styles.metaLabel}>Criado em</Text>
            <Text style={styles.metaValue}>{formatDate(quote.createdAt)}</Text>
          </View>
          <View style={styles.metaSection}>
            <Text style={styles.metaLabel}>Atualizado em</Text>
            <Text style={styles.metaValue}>{formatDate(quote.updatedAt)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços inclusos</Text>
          {quote.items.length === 0 ? (
            <Text style={styles.emptyItems}>Nenhum serviço adicionado</Text>
          ) : (
            quote.items.map((item) => (
              <View style={styles.summaryRow} key={item.id}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.metaValue}>{item.description}</Text>
                  <Text style={styles.metaLabel}>Qt: {item.qty}</Text>
                </View>
                <Text style={styles.summaryValue}>
                  {formatCurrency(getItemTotal(item))}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal · {getItemsCount(quote.items)} itens
            </Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>

          {!!quote.discountPct && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Desconto · {quote.discountPct}% off
              </Text>
              <Text style={styles.discountValue}>
                - {formatCurrency(discountValue)}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelBold}>Investimento total</Text>
            <Text style={styles.summaryValueBold}>{formatCurrency(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.iconButton} onPress={handleDelete}>
          <MaterialIcons name="delete-outline" size={20} color="#E63946" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={handleDuplicate}>
          <MaterialIcons name="content-copy" size={18} color="#111827" />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate("quoteForm", { quoteId: quote.id })
          }
        >
          <MaterialIcons name="edit" size={18} color="#111827" />
        </Pressable>
        <Button
          title="Compartilhar"
          icon="ios-share"
          style={styles.shareButton}
          onPress={handleShare}
        />
      </View>
    </View>
  );
}
