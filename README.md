# Default-envs ![Continous Integration](https://github.com/KTH/default-envs/actions/workflows/main.yml/badge.svg)

`@kth/default-envs`

## Usage

### Basic behaviour
Process env:s that are not configured on start up, but accessed via process.env._ENV_NAME_ in the application are added with there default values, as specified as a key-value object.

```javascript
const defaultEnvs = require("@kth/default-envs");

const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS);

console.log(process.env.PORT); // 80
```

### Override default values
If an env is set on startup it will be used, not the default.

```bash
APPINSIGHTS_INSTRUMENTATIONKEY="abc-123" node app.js
```

```javascript
const defaultEnvs = require("@kth/default-envs");

const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS);

console.log(process.env.APPINSIGHTS_INSTRUMENTATIONKEY); // abc-123
```

### Required values without any defaults
Some envs do not have defaults and must exist before starting your service. 
defaultEnvs.required([], console) will print information about if a logger is passed, and if the env is missing when invoking `required` throw an error _Required env 'PASSWORD' does not exist._ .

```bash
node app.js
```

```javascript
const defaultEnvs = require("@kth/default-envs");

const DEFAULTS = {
  USER: "admin",
  URI: 'example.com'
};

defaultEnvs.set(DEFAULTS); 
defaultEnvs.required(['PASSWORD']); // Exception:Required env 'PASSWORD' does not exist.
```

```bash
PASSWORD='s3cret' node app.js
```

```javascript
const defaultEnvs = require("@kth/default-envs");

const DEFAULTS = {
  USER: "admin",
  URI: 'example.com'
};

defaultEnvs.set(DEFAULTS); 
defaultEnvs.required(['PASSWORD']);
console.log(process.env.PASSWORD); // s3cret

```

## Log the defaults used

If you pass a logger like `console` or any other that implements logger functions _debug_, _info_ or _warn_ you will get information about what defaults are used when invoking `defaultEnvs.set({}, logger);`

```bash
TOKEN="xxxx-yyyy" PORT=3000 node app.js
```

```javascript
const defaultEnvs = require("@kth/default-envs");

const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS, console);
defaultEnvs.required(['TOKEN', 'PASSWORD']); 
```

```log
08:57:00.808Z  INFO my-app:  - Env 'LOG_LEVEL' is not set, defaulting to 'info'.
08:57:00.811Z  INFO my-app:  - Env 'APPINSIGHTS_INSTRUMENTATIONKEY' is not set, defaulting to ''.
08:57:00.811Z  INFO my-app:  - ✅ Found required env 'TOKEN'
08:57:00.811Z  INFO my-app:  - 🚨 Missing required env 'PASSWORD'
08:57:00.811Z  WARN my-app:  Required env 'PASSWORD' does not exist.

  Exception: Required env 'PASSWORD' does not exist.

```

## Tests

`npm install`
`npm test`

```log

  Default Envs 

    ✔ Throw an error if a required env is missing.
    ✔ Do not throw an error if a required env exists.
    ✔ If a default value is set you can access it wia process.env.
    ✔ If a env is already set prior to running set(defaults), process.env will return it.
    ✔ After runnign unset() all defaults values are removed from process.env array.
    ✔ After runnign unset() all emvs set on startup are still availible.
    ✔ If a logger is passed to the set({}, logger), use it to log.

  7 passing (10ms)
  
```

## Demo

1. Go to the directory https://github.com/KTH/default-envs/tree/master/demo
2. `npm install`
3. `npm run ok`
```log
> default-envs-demo@0.0.1 ok
> PASSWORD='s3cret' TOKEN='xxxx-1111' APPLICATION_NAME='Super default-envs-demo 🚀' node demo.js

 - Env 'LOG_LEVEL' is not set, defaulting to 'info'.
 - Env 'PORT' is not set, defaulting to '3000'.
 - Env 'API_HOST' is not set, defaulting to 'https://api.kth.se'.
 - Env 'APPINSIGHTS_INSTRUMENTATIONKEY' is not set, defaulting to ''.
 - ✅ Found required env 'PASSWORD'
 - ✅ Found required env 'TOKEN'

Application name: Super default-envs-demo 🚀
```
4. `npm run fail`
```log
> default-envs-demo@0.0.1 fail
> TOKEN='xxxx-1111' node demo.js

 - Env 'APPLICATION_NAME' is not set, defaulting to 'Demo-app'.
 - Env 'LOG_LEVEL' is not set, defaulting to 'info'.
 - Env 'PORT' is not set, defaulting to '3000'.
 - Env 'API_HOST' is not set, defaulting to 'https://api.kth.se'.
 - Env 'APPINSIGHTS_INSTRUMENTATIONKEY' is not set, defaulting to ''.
 - 🚨 Missing required env 'PASSWORD'
 - ✅ Found required env 'TOKEN'
Required env 'PASSWORD' does not exist.

/Users/patricjansson/dev/kth/gita.sys.kth.se/default-envs/demo/node_modules/@kth/default-envs/index.js:69
      throw message;
      ^
Required env 'PASSWORD' does not exist.
(Use `node --trace-uncaught ...` to show where the exception was thrown)
```

