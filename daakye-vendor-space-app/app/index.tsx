import { StyleSheet,TextInput, ScrollView} from "react-native";
import { theme } from "../theme";
import { ShoppingList } from "../components/ShoppingList";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  {
    id: "1",
    name: "Coffee",
  },
  {
    id: "2",
    name: "Bread",
  },
  {
    id: "3",
    name: "Tea",
  },
  {
    id: "4",
    name: "Ice",
  },
];


export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setshoppingList] = useState<ShoppingListItemType[]>(initialList);
  const handleSubmit = () => {
    if (value){
      const newShoppingList: ShoppingListItemType[] = [
        {id: new Date().toTimeString(), name: value},
        ...shoppingList,
      ];
      setshoppingList(newShoppingList);
      setValue("");
    }
  };
  
  return (
    <ScrollView style={styles.container}
    contentContainerStyle={styles.contentContainer}
    stickyHeaderIndices={[0]}

    >
      <TextInput placeholder="e.g Coffee" style= {styles.textInput}
        value={value}
        onChangeText={setValue}
        keyboardType="email-address"
        onSubmitEditing={handleSubmit}
  
      />
      {shoppingList.map((item) => (
        <ShoppingList key={item.id} name={item.name} />
      ))}
    </ScrollView>
  );
}

// validate that all styles are used in order to avoid unused style warnings
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 12,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGray,
    borderRadius: 50,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 12,
    fontSize: 18,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingBottom: 24,
  },
});


