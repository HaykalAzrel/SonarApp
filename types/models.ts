export type DeviceStatus = 'online' | 'offline' | 'alert';
export type Severity = 'info' | 'warning' | 'alert';

export type Device = {
  id: string;
  name: string;
  room: string;
  online: boolean;
  monitoring: boolean;
  distance: number;
  threshold: number;
  lastUpdate: string;
  battery: number;
};

export type ActivityLog = {
  id: string;
  deviceId: string;
  message: string;
  severity: Severity;
  createdAt: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  type: Severity;
  read: boolean;
  createdAt: string;
};

export type UserProfile = {
  uid: string;
  fullName: string;
  email: string;
};
