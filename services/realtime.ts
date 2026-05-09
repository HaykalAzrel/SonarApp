import { off, onValue, ref } from 'firebase/database';

import { firebaseDb, isFirebaseConfigured } from '@/firebase/config';
import { type ActivityLog, type Device } from '@/types/models';

export const realtimeService = {
  subscribeDevices(uid: string, onData: (devices: Record<string, Device>) => void) {
    if (!firebaseDb || !isFirebaseConfigured) return () => undefined;

    const devicesRef = ref(firebaseDb, `users/${uid}/devices`);
    const callback = onValue(devicesRef, (snapshot) => {
      onData((snapshot.val() as Record<string, Device>) || {});
    });

    return () => {
      off(devicesRef, 'value', callback);
    };
  },
  subscribeLogs(deviceId: string, onData: (logs: Record<string, ActivityLog>) => void) {
    if (!firebaseDb || !isFirebaseConfigured) return () => undefined;

    const logsRef = ref(firebaseDb, `logs/${deviceId}`);
    const callback = onValue(logsRef, (snapshot) => {
      onData((snapshot.val() as Record<string, ActivityLog>) || {});
    });

    return () => {
      off(logsRef, 'value', callback);
    };
  },
};
