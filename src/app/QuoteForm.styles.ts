import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 16,
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
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statusCell: {
    width: "45%",
  },
  addServiceButton: {
    borderWidth: 1,
    borderColor: "#5B37F2",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  addServiceLabel: {
    color: "#5B37F2",
    fontWeight: "600",
    fontSize: 14,
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
  discountInput: {
    width: 90,
    paddingVertical: 8,
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  footerButton: {
    flex: 1,
  },
});
