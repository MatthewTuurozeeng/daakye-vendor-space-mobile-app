import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";

type ShoppingListProps = {
  name: string;
  isComleted?: boolean;
};
export function ShoppingList({ name, isComleted }: ShoppingListProps) {
  const handleDeletePress = () => {
    Alert.alert(
      "Delete button pressed",
      "Are you sure you want to delete this item?",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
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
    <View style={[styles.itemContainer, isComleted? styles.completedContainer:  undefined,]}>
      <Text style={styles.ItemText}>{name}</Text>
      <TouchableOpacity
        style={[styles.button, isComleted? styles.completedButton : undefined,]}
        onPress={handleDeletePress}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, isComleted? styles.completedText: undefined]}>Delete</Text>
      </TouchableOpacity>
    </View>
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
    // color: "#fff",
  },
  button: {
    // backgroundColor: "red",
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,

  },
  completedButton: {
    backgroundColor: theme.colorGray,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGray,
    color: theme.colorLightGray,
  },
});
