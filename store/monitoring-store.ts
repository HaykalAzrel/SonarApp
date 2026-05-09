import { create } from 'zustand';

import { type ActivityLog } from '@/types/models';

type MonitoringStore = {
  logs: ActivityLog[];
  pushLog: (log: ActivityLog) => void;
};

export const useMonitoringStore = create<MonitoringStore>((set) => ({
  logs: [
    {
      id: 'log-1',
      deviceId: 'SEC-001',
      message: 'Monitoring enabled',
      severity: 'info',
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      id: 'log-2',
      deviceId: 'SEC-002',
      message: 'Distance crossed warning threshold',
      severity: 'warning',
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: 'log-3',
      deviceId: 'SEC-003',
      message: 'Device went offline',
      severity: 'alert',
      createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
  ],
  pushLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 120) })),
}));
