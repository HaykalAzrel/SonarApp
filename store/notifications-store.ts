import { create } from 'zustand';

import { type AppNotification } from '@/types/models';

type NotificationStore = {
  notifications: AppNotification[];
  enabled: boolean;
  toggleEnabled: () => void;
  markRead: (id: string) => void;
  unreadCount: () => number;
};

export const useNotificationsStore = create<NotificationStore>((set, get) => ({
  enabled: true,
  notifications: [
    {
      id: 'notif-1',
      title: 'Intrusion alert',
      body: 'Main Door Sensor detected close-range movement.',
      type: 'alert',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
    {
      id: 'notif-2',
      title: 'Device offline',
      body: 'Backyard Watch is currently offline.',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      id: 'notif-3',
      title: 'System update',
      body: 'Realtime monitoring has synced successfully.',
      type: 'info',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
    },
  ],
  toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
