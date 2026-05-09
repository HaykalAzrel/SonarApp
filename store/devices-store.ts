import { create } from 'zustand';

import { type Device } from '@/types/models';

const seedDevices: Device[] = [
  {
    id: 'SEC-001',
    name: 'Main Door Sensor',
    room: 'Entrance',
    online: true,
    monitoring: true,
    distance: 45,
    threshold: 80,
    lastUpdate: new Date().toISOString(),
    battery: 86,
  },
  {
    id: 'SEC-002',
    name: 'Garage Motion Unit',
    room: 'Garage',
    online: true,
    monitoring: true,
    distance: 98,
    threshold: 100,
    lastUpdate: new Date().toISOString(),
    battery: 64,
  },
  {
    id: 'SEC-003',
    name: 'Backyard Watch',
    room: 'Backyard',
    online: false,
    monitoring: false,
    distance: 0,
    threshold: 75,
    lastUpdate: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    battery: 33,
  },
];

type DevicesStore = {
  devices: Device[];
  search: string;
  filter: 'all' | 'online' | 'offline' | 'alert';
  addDevice: (input: Pick<Device, 'id' | 'name' | 'room'>) => void;
  setSearch: (search: string) => void;
  setFilter: (filter: DevicesStore['filter']) => void;
  setMonitoring: (id: string, monitoring: boolean) => void;
  setThreshold: (id: string, threshold: number) => void;
  getDeviceStatus: (device: Device) => 'online' | 'offline' | 'alert';
  tickRealtime: () => void;
};

export const useDevicesStore = create<DevicesStore>((set, get) => ({
  devices: seedDevices,
  search: '',
  filter: 'all',
  addDevice: ({ id, name, room }) =>
    set((state) => ({
      devices: [
        {
          id,
          name,
          room,
          online: true,
          monitoring: true,
          distance: 120,
          threshold: 90,
          lastUpdate: new Date().toISOString(),
          battery: 100,
        },
        ...state.devices,
      ],
    })),
  setSearch: (search) => set({ search }),
  setFilter: (filter) => set({ filter }),
  setMonitoring: (id, monitoring) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, monitoring } : d)),
    })),
  setThreshold: (id, threshold) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, threshold } : d)),
    })),
  getDeviceStatus: (device) => {
    if (!device.online) return 'offline';
    if (device.monitoring && device.distance < device.threshold * 0.6) return 'alert';
    return 'online';
  },
  tickRealtime: () =>
    set((state) => ({
      devices: state.devices.map((device) => {
        if (!device.online) return device;
        const variance = Math.round(Math.random() * 18 - 9);
        const nextDistance = Math.max(20, Math.min(160, device.distance + variance));
        return {
          ...device,
          distance: nextDistance,
          battery: Math.max(15, device.battery - Math.random() * 0.2),
          lastUpdate: new Date().toISOString(),
        };
      }),
    })),
}));
