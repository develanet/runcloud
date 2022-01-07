export type ClientOpts = {
  api_key: string;
  api_secret: string;
};

export type ServerCreateInput = {
  name: string;
  ipAddress: string;
  provider?: "Digital Ocean" | "Linode" | "Vultr" | "AWS" | "Other";
};

export type Server = {
  id: number;
  name: string;
  provider: string;
  ipAddress: string;
  os: string;
  osVersion?: string;
  connected: boolean;
  online: boolean;
  agentVersion?: string;
  phpCLIVersion: string;
  softwareUpdate: boolean;
  securityUpdate: boolean;
  transferStatus: string;
  created_at: string;
};

export type ServerListResponse = {
  data?: Server[];
  meta: Meta;
};

export type ServerStats = {
  stats: {
    webApplication: number;
    database: number;
    cronJob: number;
    supervisor: number;
  };
  geoRecord: {
    country: string;
    subdivision: string;
    latitude: number;
    longitude: number;
  };
};

export type Health = {
  totalMemory: number;
  availableMemory: number;
  usedMemory: number;
  totalDiskSpace: number;
  availableDiskSpace: number;
  usedDiskSpace: number;
  loadAverage: number;
  updated_at: string;
};

export type Hardware = {
  kernelVersion: string;
  processorName: string;
  totalCPUCore: number;
  totalMemory: number;
  freeMemory: number;
  diskTotal: number;
  diskFree: number;
  loadAvg: number;
  uptime: string;
};

export type PhpVersion =
  | "php55rc"
  | "php56rc"
  | "php70rc"
  | "php71rc"
  | "php72rc"
  | "php73rc";

export type SSHConfig = {
  passwordlessLogin: boolean;
  useDns: boolean;
  preventRootLogin: boolean;
};

export type Meta = {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: any;
  };
};
