# default-envs

 Process env:s that are not configured on start up, but accessed  * as envs in the application are added with there default values.

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
