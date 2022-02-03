const defaultEnvs = require("../index");

defaultEnvs.set(
  {
    APPLICATION_NAME: "Demo-app",
    LOG_LEVEL: "info",
    PORT: 3000,
    API_HOST: "https://api.kth.se",
    APPINSIGHTS_INSTRUMENTATIONKEY: "",
  },
  console
);
defaultEnvs.required(["PASSWORD", "TOKEN"], console);

console.log(`\nApplication name: ${process.env.APPLICATION_NAME}`);
