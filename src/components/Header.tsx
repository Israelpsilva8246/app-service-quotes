import { View } from "react-native";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 54,
      }}
    >
      {children}
    </View>
  );
}
