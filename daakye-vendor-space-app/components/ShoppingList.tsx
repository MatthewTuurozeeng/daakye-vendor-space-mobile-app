import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";
import AntDesign from '@expo/vector-icons/AntDesign';

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
      <TouchableOpacity>
      <AntDesign name="close-circle" size={24} color={isComleted? theme.colorGray:  theme.coloRed}/>
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
  
  completedContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,

  },
  
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGray,
    color: theme.colorLightGray,
  },
});
