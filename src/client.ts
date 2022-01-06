import axios, { AxiosInstance } from 'axios';
import {
  ClientOpts,
  Hardware,
  PhpVersion,
  Server,
  ServerCreateInput,
  ServerListResponse,
  ServerStats,
  SSHConfig,
} from './types';

export class Runcloud {
  protected readonly client: AxiosInstance;

  constructor(opts: ClientOpts) {
    this.client = axios.create({
      baseURL: 'https://manage.runcloud.io/api/v2',
      auth: {
        username: opts.api_key,
        password: opts.api_secret,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  servers = {
    list: async (): Promise<ServerListResponse> => {
      const { data } = await this.client.get('servers');
      return data;
    },

    listShared: async (): Promise<ServerListResponse> => {
      const { data } = await this.client.get('servers/shared');
      return data;
    },

    create: async (args: ServerCreateInput): Promise<Server> => {
      const { data } = await this.client.post('/servers', {
        data: args,
      });
      return data;
    },

    get: async (serverID: number): Promise<Server> => {
      const { data } = await this.client.post(`/servers/${serverID}`);
      return data;
    },

    installationScript: async (
      serverID: number
    ): Promise<{ script: string }> => {
      const { data } = await this.client.get(
        `/servers/${serverID}/installationscript`
      );
      return data;
    },

    stats: async (serverID: number): Promise<ServerStats> => {
      const { data } = await this.client.get(`/servers/${serverID}/stats`);
      return data;
    },

    hardware: async (serverID: number): Promise<Hardware> => {
      const { data } = await this.client.get(
        `/servers/${serverID}/hardwareinfo`
      );
      return data;
    },

    listPhpVersion: async (serverID: number): Promise<PhpVersion[]> => {
      const { data } = await this.client.get(
        `/servers/${serverID}/php/version`
      );
      return data;
    },

    changePhpCliVersion: async ({
      serverID,
      phpVersion,
    }: {
      serverID: number;
      phpVersion: PhpVersion;
    }): Promise<string[]> => {
      const { data } = await this.client.patch(`/servers/${serverID}/php/cli`, {
        data: {
          phpVersion,
        },
      });
      return data;
    },

    updateMetaData: async ({
      serverID,
      name,
      provider,
    }: {
      serverID: number;
      name: string;
      provider?: string;
    }): Promise<Server> => {
      const { data } = await this.client.patch(
        `/servers/${serverID}/settings/meta`,
        {
          data: {
            name,
            provider,
          },
        }
      );
      return data;
    },

    getSSHConfig: async (serverID: number): Promise<SSHConfig> => {
      const { data } = await this.client.get(
        `/servers/${serverID}/settings/ssh`
      );
      return data;
    },

    updateSSHConfig: async ({
      serverID,
      passwordlessLogin,
      useDns,
      preventRootLogin,
    }: {
      serverID: number;
      passwordlessLogin: boolean;
      useDns: boolean;
      preventRootLogin: boolean;
    }): Promise<SSHConfig> => {
      const { data } = await this.client.patch(
        `/servers/${serverID}/settings/ssh`,
        {
          data: {
            passwordlessLogin,
            useDns,
            preventRootLogin,
          },
        }
      );
      return data;
    },

    softwareUpdate: async ({
      serverID,
      autoupdate,
      securityUpdate,
    }: {
      serverID: number;
      autoupdate: boolean;
      securityUpdate: boolean;
    }): Promise<Server> => {
      const { data } = await this.client.patch(
        `/servers/${serverID}/settings/autoupdate`,
        {
          data: {
            autoupdate,
            securityUpdate,
          },
        }
      );
      return data;
    },

    delete: async (serverID: number): Promise<Server> => {
      const { data } = await this.client.delete(`/servers/${serverID}`);
      return data;
    },
  };
}
