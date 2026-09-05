import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  dotColor?: string;
};

export function RadioOption({ label, selected, onPress, dotColor }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        {selected && <View style={styles.circleInner} />}
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
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  circleSelected: {
    borderColor: "#5B37F2",
  },
  circleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
