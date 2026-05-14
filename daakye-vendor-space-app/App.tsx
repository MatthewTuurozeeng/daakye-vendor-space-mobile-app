import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import {theme} from "./theme";

// simple React Native app that displays a welcome message and a delete button. The delete button currently just logs "Pressed" to the console when pressed. The app uses a custom theme for colors.
export default function App() {
  const handleDeletePress = () => {
    Alert.alert("Delete button pressed", "You have pressed the delete button."
      , [
        { text: "OK", onPress: () => console.log("OK Pressed"),
          style: "destructive"
        },
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), 
          style: "cancel" },
      ]  
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log("Pressed");
          handleDeletePress();
        }}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>

      <View style={styles.itemContainer}>
        <Text style={styles.ItemText}>Hello Daakye Vendor space!</Text>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: theme.colorWhite,
    borderBottomColor: "#1a759f", 
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  itemContainer: {
    // backgroundColor: "#1a759f",
    backgroundColor: theme.colorCerulean,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    },
  ItemText: {
    fontSize: 18, 
    fontWeight: "200",
    color: "#fff",
  }, 
  button: {
    // backgroundColor: "red",
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    
  },

});
