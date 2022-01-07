import axios, { AxiosInstance } from "axios";
import {
  ClientOpts,
  Hardware,
  Health,
  PhpVersion,
  Server,
  ServerCreateInput,
  ServerListResponse,
  ServerStats,
  SSHConfig,
} from "./types";
import {
  AddDomainNameInput,
  CloneGitRepoInput,
  CreateWebAppInput,
  DomainName,
  GitObject,
  InstallPHPScriptInput,
  PHPResponse,
  PHPScript,
  WebApplication,
} from "./webApp.types";

export class Runcloud {
  protected readonly client: AxiosInstance;

  constructor(opts: ClientOpts) {
    this.client = axios.create({
      baseURL: "https://manage.runcloud.io/api/v2",
      auth: {
        username: opts.api_key,
        password: opts.api_secret,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  servers = {
    list: async (): Promise<ServerListResponse> => {
      const { data } = await this.client.get("servers");
      return data;
    },

    listShared: async (): Promise<ServerListResponse> => {
      const { data } = await this.client.get("servers/shared");
      return data;
    },

    create: async (args: ServerCreateInput): Promise<Server> => {
      const { data } = await this.client.post("/servers", args);
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
        phpVersion,
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
          name,
          provider,
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
          passwordlessLogin,
          useDns,
          preventRootLogin,
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
          autoupdate,
          securityUpdate,
        }
      );
      return data;
    },

    delete: async (serverID: number): Promise<Server> => {
      const { data } = await this.client.delete(`/servers/${serverID}`);
      return data;
    },
  };

  health = {
    latest: async (serverID: number): Promise<Health> => {
      const { data } = await this.client.get(
        `/servers/${serverID}/health/latest`
      );
      return data;
    },
    cleanDisk: async (serverID: number): Promise<any> => {
      const { data } = await this.client.patch(
        `/servers/${serverID}/health/diskcleaner`
      );
      return data;
    },
  };

  webApps = {
    create: async (serverId: number, args: CreateWebAppInput) => {
      const { data } = await this.client.post(
        `/servers/${serverId}/custom`,
        args
      );
      return data;
    },

    list: async (serverId: number): Promise<WebApplication[]> => {
      const { data } = await this.client.get(`/servers/${serverId}/webapps`);
      return data;
    },

    get: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<WebApplication> => {
      const { data } = await this.client.get(
        `/servers/${serverId}/webapps/${webAppId}`
      );
      return data;
    },

    setDefault: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<WebApplication> => {
      const { data } = await this.client.post(
        `/servers/${serverId}/webapps/${webAppId}/default`
      );
      return data;
    },

    removeDefault: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<WebApplication> => {
      const { data } = await this.client.delete(
        `/servers/${serverId}/webapps/${webAppId}/default`
      );
      return data;
    },

    rebuild: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<WebApplication> => {
      const { data } = await this.client.patch(
        `/servers/${serverId}/webapps/${webAppId}/rebuild`
      );
      return data;
    },

    cloneGit: async (args: CloneGitRepoInput): Promise<WebApplication> => {
      const { data } = await this.client.post(
        `/servers/${args.serverId}/webapps/${args.webAppId}/git`
      );
      return data;
    },

    getGitObject: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<GitObject> => {
      const { data } = await this.client.get(
        `/servers/${serverId}/webapps/${webAppId}/git`
      );
      return data;
    },

    changeGITBranch: async ({
      serverId,
      webAppId,
      gitId,
      branch,
    }: {
      serverId: number;
      webAppId: number;
      gitId: string;
      branch: string;
    }): Promise<GitObject> => {
      const { data } = await this.client.patch(
        `/servers/${serverId}/webapps/${webAppId}/git/${gitId}/branch`,
        {
          branch,
        }
      );
      return data;
    },

    customizeGITDeploymentScript: async ({
      serverId,
      webAppId,
      gitId,
      autoDeploy,
      deployScript,
    }: {
      serverId: number;
      webAppId: number;
      gitId: string;
      autoDeploy: boolean;
      deployScript?: string;
    }): Promise<GitObject> => {
      const { data } = await this.client.patch(
        `/servers/${serverId}/webapps/${webAppId}/git/${gitId}/script`,
        {
          autoDeploy,
          deployScript,
        }
      );
      return data;
    },

    forceDeploymentUsingDeploymentScript: async ({
      serverId,
      webAppId,
      gitId,
    }: {
      serverId: number;
      webAppId: number;
      gitId: string;
    }): Promise<void> => {
      await this.client.put(
        `/servers/${serverId}/webapps/${webAppId}/git/script`
      );
    },

    removeGITRepo: async ({
      serverId,
      webAppId,
      gitId,
    }: {
      serverId: number;
      webAppId: number;
      gitId: string;
    }): Promise<GitObject> => {
      const { data } = await this.client.delete(
        `/servers/${serverId}/webapps/${webAppId}/git/${gitId}`
      );
      return data;
    },

    installPHPScript: async (
      args: InstallPHPScriptInput
    ): Promise<PHPResponse> => {
      const { data } = await this.client.post(
        `/servers/${args.serverId}/webapps/${args.webAppId}/installer`,
        {
          name: args.name,
        }
      );
      return data;
    },

    getPHPScriptObject: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<PHPScript> => {
      const { data } = await this.client.get(
        `/servers/${serverId}/webapps/${webAppId}/installer`
      );
      return data;
    },

    removePHPScript: async ({
      serverId,
      webAppId,
      installerId,
    }: {
      serverId: number;
      webAppId: number;
      installerId: number;
    }): Promise<PHPScript> => {
      const { data } = await this.client.delete(
        `/servers/${serverId}/webapps/${webAppId}/installer/${installerId}`
      );
      return data;
    },

    addDomain: async (args: AddDomainNameInput): Promise<DomainName> => {
      const { data } = await this.client.post(
        `/servers/${args.serverId}/webapps/${args.webAppId}/domains`,
        args
      );
      return data;
    },

    listDomains: async ({
      serverId,
      webAppId,
    }: {
      serverId: number;
      webAppId: number;
    }): Promise<DomainName[]> => {
      const { data } = await this.client.get(
        `/servers/${serverId}/webapps/${webAppId}/domains`
      );
      return data;
    },

    getDomainObject: async ({
      serverId,
      webAppId,
      domainId,
    }: {
      serverId: number;
      webAppId: number;
      domainId: number;
    }): Promise<DomainName> => {
      const { data } = await this.client.get(
        `/servers/${serverId}/webapps/${webAppId}/domains/${domainId}`
      );
      return data;
    },

    deleteDomain: async ({
      serverId,
      webAppId,
      domainId,
    }: {
      serverId: number;
      webAppId: number;
      domainId: number;
    }): Promise<DomainName> => {
      const { data } = await this.client.delete(
        `/servers/${serverId}/webapps/${webAppId}/domains/${domainId}`
      );
      return data;
    },
  };
}
