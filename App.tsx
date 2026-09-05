import { Routes } from "@/routes";
import { QuotesProvider } from "@/contexts/QuotesContext";

export default function App() {
  return (
    <QuotesProvider>
      <Routes />
    </QuotesProvider>
  );
}
