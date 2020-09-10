# default-envs

 Process env:s that are not configured on start up, but accessed via process.env.*ENV_NAME* in the application are added with there default values, as specified as a key-value object.

```javascript
const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS);

console.log(process.env.LOG_LEVEL); // 80

```

If an env is set on startup it will be used not the default.

```bash
APPINSIGHTS_INSTRUMENTATIONKEY="abc-123" node app.js
```

```javascript
const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS);

console.log(process.env.APPINSIGHTS_INSTRUMENTATIONKEY); // abc-123

```

## Log what defaults are used

If you pass a logger like `console` or any other that implements logger functions *debug* and *info* you will get information about what defaults are used when invoking `defaultEnvs.set(DEFAULTS);``

```javascript
const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS);
```

```log
08:57:00.808Z  INFO my-app:  - 'LOG_LEVEL' is not set, defaulting to 'info'.
08:57:00.811Z  INFO ny-app:  - 'PORT' is not set, defaulting to '80'.
```