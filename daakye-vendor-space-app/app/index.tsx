import { StyleSheet, TextInput, FlatList } from "react-native";
import { theme } from "../theme";
import { ShoppingList } from "../components/ShoppingList";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
  lastUpdatedTimestamp: number;
};

type ListHeaderProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
};

function ListHeader({ value, onChangeText, onSubmitEditing }: ListHeaderProps) {
  return (
    <TextInput
      placeholder="Add item to shopping list"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      style={styles.textInput}
    />
  );
}


const initialList: ShoppingListItemType[] = [
  {
    id: "1",
    name: "Coffee",
    lastUpdatedTimestamp: Date.now(),
  },
  {
    id: "2",
    name: "Bread",
    lastUpdatedTimestamp: Date.now(),
  },
  {
    id: "3",
    name: "Tea",
    lastUpdatedTimestamp: Date.now(),
  },
  {
    id: "4",
    name: "Ice",
    lastUpdatedTimestamp: Date.now(),
  },
];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>(
    initialList,
  );

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const newShoppingList: ShoppingListItemType[] = [
      {
        id: new Date().toISOString(),
        name: trimmed,
        lastUpdatedTimestamp: Date.now(),
      },
      ...shoppingList,
    ];
    setShoppingList(newShoppingList);
    setValue("");
  };

  // delete item from shopping list by id and show an alert to confirm deletion
  const handleDeleteItem = (id: string) => {
    setShoppingList((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimeStamp: item.completedAtTimeStamp
            ? undefined
            : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      }
      return item;
    });
    setShoppingList(newShoppingList);
  };

  function orderShoppingList(list: ShoppingListItemType[]) {
    return [...list].sort((item1, item2) => {
      if (item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
        return (
          (item2.completedAtTimeStamp as number) -
          (item1.completedAtTimeStamp as number)
        );
      }

      if (item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
        return 1;
      }

      if (!item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
        return -1;
      }

      if (!item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  return (
    // use ScrollView when the list is small and FlatList when the list is large to optimize performance
    <FlatList
      data= {orderShoppingList(shoppingList)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="none"
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <ListHeader
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
        />
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ShoppingList
          id={item.id}
          name={item.name}
          onDelete={handleDeleteItem}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean (item.completedAtTimeStamp)}
        />
      )}
    />
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
