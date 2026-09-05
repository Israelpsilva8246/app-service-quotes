import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#9CA3AF"
      style={[styles.input, props.style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
});
