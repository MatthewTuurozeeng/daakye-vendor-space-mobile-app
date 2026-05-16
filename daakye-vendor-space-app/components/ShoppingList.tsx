import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";

type ShoppingListProps = {
  id: string;
  name: string;
  isCompleted?: boolean;
  onDelete?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
};
export function ShoppingList({
  id,
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: ShoppingListProps) {
  const handleDeletePress = () => {
    Alert.alert(
      "Delete button pressed",
      "Are you sure you want to delete this item?",
      [
        {
          text: "OK",
          onPress: () => onDelete?.(id),
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
    );
  };

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={() => onToggleComplete?.(id)}
   >
    <View style={styles.row}>
      <AntDesign name={isCompleted? "check": "ci-circle"} size={24} color={isCompleted? theme.colorGray: theme.colorCerulean} />
      <Text
        numberOfLines={1} // This will ensure that the text does not overflow and will be truncated with an ellipsis if it's too long to fit in one line.
        style={[
          styles.ItemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
    </View>
      <TouchableOpacity onPress={handleDeletePress} activeOpacity={0.8}>
        <AntDesign
          name="close-circle"
          size={24}
          color={isCompleted ? theme.colorGray : theme.coloRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ItemText: {
    fontSize: 18,
    fontWeight: "200",
    flex:1
    // color: "#fff",
  },

  completedContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,
  },

  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGray,
    color: theme.colorLightGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex:1
  },
});
