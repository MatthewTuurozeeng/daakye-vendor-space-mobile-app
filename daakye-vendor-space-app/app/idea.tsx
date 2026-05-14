
import { Text, View, StyleSheet, TouchableOpacity, } from "react-native";

export default function IdeaScreen() {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Text style={{textAlign:"center", marginBottom: 18, fontSize:24}}>Idea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

