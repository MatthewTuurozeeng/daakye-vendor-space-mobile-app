import { Text, StyleSheet, FlatList, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { countdownStorageKey, PersistedCountdownState } from "./";
import { useCallback, useEffect, useState } from "react";
import { getFromStorage } from "../../utils/storage";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState | null>(null);

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const refresh = async () => {
        const value = await getFromStorage(countdownStorageKey);
        setCountdownState(value);
      };

      refresh();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
  data={countdownState?.completedAtTimestamps ?? []}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              {format(item, fullDateFormat)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <Text>No history yet</Text>
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colorWhite,
  },
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    marginTop: 8,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  listItem: {
    marginHorizontal: 8,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: theme.colorLightGray,
    padding: 12,
    borderRadius: 6,
  },
  text: {
    fontSize: 24,
  },
  listItemText: {
    fontSize: 18,
  },
});