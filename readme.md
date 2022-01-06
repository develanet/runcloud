### Unofficial Javascript & Typescript client for the Runcloud.io REST API

Mapped exactly to Runcloud's REST API

View their official [documentation here.](https://runcloud.io/docs/api)

#### Installing

`npm install runcloudjs`

#### Configure API Settings on Runcloud

Be sure to enable the API in your Runcloud dashboard and generate API keys:
[Manage API Settings](https://new.runcloud.io/settings/apikey)

#### Node.js Example

```
const { Runcloud } = require('runcloudjs');

const client = new Runcloud({
  api_key: 'YOUR_RUNCLOUD_API_KEY',
  api_secret: 'YOUR_RUNCLOUD_API_SECRET',
});

##### async/await
const list = await client.servers.list()

##### promises
client.servers.list().then((serverList) => console.log(serverList))

```

#### Typescript / ES6

```
import { Runcloud } from 'runcloudjs';

const client = new Runcloud({
  api_key: 'YOUR_RUNCLOUD_API_KEY',
  api_secret: 'YOUR_RUNCLOUD_API_SECRET',
});
```

I hope to release the rest of the methods along with more documention soon. Pull requests are welcome. Enjoy!
