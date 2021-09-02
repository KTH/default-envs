# Default-envs ![Continous Integration](https://github.com/KTH/default-envs/actions/workflows/main.yml/badge.svg)

`@kth/default-envs`

Process env:s that are not configured on start up, but accessed via process.env._ENV_NAME_ in the application are added with there default values, as specified as a key-value object.

```javascript
const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS);

console.log(process.env.PORT); // 80
```

If an env is set on startup it will be used, not the default.

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

## Log the defaults used

If you pass a logger like `console` or any other that implements logger functions _debug_ and _info_ you will get information about what defaults are used when invoking `defaultEnvs.set({}, logger);`

```javascript
const DEFAULTS = {
  LOG_LEVEL: "info",
  PORT: 80,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

defaultEnvs.set(DEFAULTS, console);
```

```log
08:57:00.808Z  INFO my-app:  - 'LOG_LEVEL' is not set, defaulting to 'info'.
08:57:00.811Z  INFO ny-app:  - 'PORT' is not set, defaulting to '80'.
```

## Tests

`npm install`
`npm test`

```log

Default Envs

    ✓ If a default value is set you can access it wia process.env.
    ✓ If a env is already set prior to running set(defaults), process.env will return it.
    ✓ After runnign unset() all defaults values are removed from process.env array.
    ✓ After runnign unset() all emvs set on startup are still availible.
    ✓ If a logger is passed to the set({}, logger), use it to log.

```
