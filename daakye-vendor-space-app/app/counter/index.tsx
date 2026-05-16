import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { theme } from "../../theme";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

import { intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";

// 10 seconds from now
const frequency = 10 * 1000;

export const countdownStorageKey = "taskly-countdown";

export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CounterScreen() {
  const [countdownState, setCountdownState] = useState<PersistedCountdownState>();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  const lastCompletedAt = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const getTimestamp = () => (lastCompletedAt ? lastCompletedAt + frequency : Date.now());

    const updateStatus = () => {
      const timestamp = getTimestamp();
      const isOverdue = isBefore(timestamp, Date.now());

      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp },
      );
      setStatus({ isOverdue, distance });
    };

    // run immediately and every second to keep UI updated
    updateStatus();
    const intervalId = setInterval(updateStatus, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastCompletedAt]);

  const scheduleNotification = async () => {
    let pushNotificationId: string | undefined;
    const result = await registerForPushNotificationsAsync();

    if (result === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "The thing is due!",
        },
        trigger: {
          seconds: Math.round(frequency / 1000),
          channelId: "default",
        },
      });
    } else if (result === "denied") {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notifications permission for Expo Go in settings.",
      );
      return;
    } else {
      Alert.alert(
        "Notifications unavailable",
        "Push notifications only work on a physical device.",
      );
      return;
    }

    // cancel any existing scheduled notification
    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };

    setCountdownState(newCountdownState);

    await saveToStorage(countdownStorageKey, newCountdownState);
  };

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Thing due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance?.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>I've done the thing!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colorBlack,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
