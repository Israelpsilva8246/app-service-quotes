import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { QuoteCard } from "@/components/QuoteCard";
import { FilterSheet } from "@/components/FilterSheet";
import { useQuotes } from "@/contexts/QuotesContext";
import { VARIANT_COLORS } from "@/styles/variant";
import { stackRouteList } from "@/routes/StackRoutes";

import { styles } from "./styles";

export function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<stackRouteList>>();
  const { filteredQuotes, filters, search, setSearch, setFilters, quotes } =
    useQuotes();
  const [filterVisible, setFilterVisible] = useState(false);

  const draftCount = quotes.filter((quote) => quote.status === "Rascunho").length;

  return (
    <View style={styles.container}>
      <Header>
        <View>
          <Text style={[styles.headerText, { color: VARIANT_COLORS.primary }]}>
            Orçamentos
          </Text>
          <Text style={styles.subtitle}>
            Você tem {draftCount} {draftCount === 1 ? "item" : "itens"} em
            rascunho
          </Text>
        </View>

        <Button
          title="Novo"
          icon="add"
          onPress={() => navigation.navigate("quoteForm", {})}
        />
      </Header>

      <View style={styles.searchRow}>
        <Input
          placeholder="Título ou cliente"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <MaterialIcons name="tune" size={22} color="#111827" />
        </Pressable>
      </View>

      <FlatList
        data={filteredQuotes}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ gap: 12 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="description" size={32} color="#D1D5DB" />
            <Text style={styles.emptyText}>Nenhum orçamento encontrado</Text>
          </View>
        }
        renderItem={({ item }) => (
          <QuoteCard
            quote={item}
            onPress={() =>
              navigation.navigate("quoteDetail", { quoteId: item.id })
            }
          />
        )}
      />

      <FilterSheet
        visible={filterVisible}
        filters={filters}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
      />
    </View>
  );
}
