import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  metaSection: {
    gap: 4,
  },
  metaLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  metaValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  emptyItems: {
    fontSize: 13,
    color: "#9CA3AF",
    paddingVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  summaryLabelBold: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  summaryValueBold: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  discountValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E63946",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  shareButton: {
    flex: 1,
  },
});
