import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Variant, VARIANT_COLORS } from "@/styles/variant";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: Variant;
  icon?: keyof typeof MaterialIcons.glyphMap;
};

export function Button({
  title,
  variant = "primary",
  icon = "send",
  style,
  ...rest
}: Props) {
  const color = variant === "primary" ? "#FFFFFF" : VARIANT_COLORS[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, styles[variant], style]}
      {...rest}
    >
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.label, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: "#5B37F2",
    borderColor: "#5B37F2",
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    borderColor: "#5B37F2",
  },
  danger: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E63946",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
