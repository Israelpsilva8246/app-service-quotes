import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
  dotColor?: string;
};

export function CheckboxOption({ label, checked, onPress, dotColor }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <MaterialIcons name="check" size={14} color="#FFFFFF" />}
      </View>
      {dotColor && <View style={[styles.statusDot, { backgroundColor: dotColor }]} />}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    borderColor: "#5B37F2",
    backgroundColor: "#5B37F2",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    color: "#111827",
  },
});
