import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Home } from "@/app/Home";
import { QuoteForm } from "@/app/QuoteForm";
import { QuoteDetail } from "@/app/QuoteDetail";

export type stackRouteList = {
  home: undefined;
  quoteForm: { quoteId?: string };
  quoteDetail: { quoteId: string };
};

export type stackRouteProps<T extends keyof stackRouteList> =
  NativeStackScreenProps<stackRouteList, T>;

const Stack = createNativeStackNavigator<stackRouteList>();

export function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerTitle: "Inicio", headerShown: false }}
      />
      <Stack.Screen
        name="quoteForm"
        component={QuoteForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="quoteDetail"
        component={QuoteDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
