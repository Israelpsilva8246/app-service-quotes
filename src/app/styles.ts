import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 20,
    gap: 12,
  },
  emptyState: {
    marginTop: 60,
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});
