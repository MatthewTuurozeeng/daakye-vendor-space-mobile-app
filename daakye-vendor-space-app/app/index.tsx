import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ShoppingList } from "../components/ShoppingList";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link 
        href="/counter" 
        style={{textAlign:"center", marginBottom: 18, fontSize:24}} >Go to Counter</Link>
      <ShoppingList name="Coffee" isComleted/>
      <ShoppingList name="Bread" />
      <ShoppingList name="Tea" isComleted/>
      <ShoppingList name="Ice" />
    </View>
  );
}

// validate that all styles are used in order to avoid unused style warnings
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 200,
    paddingBottom: 16,
    paddingHorizontal: 12,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
});


