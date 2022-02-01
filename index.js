let log;
let defaults;
let REQUIRED_NO_DEFAULT = "REQUIRED_NO_DEFAULT";

/**
 * Set all of the default public env:s that does not already have a value set.
 * If any of the defaults are already set when the set() function is called
 * that process.env will be used. So if you start your service with LOG_LEVEL=debug
 * LOG_LEVEL: "info" will be ignored.
 *
 * @param {*} defaultKeyValues is an object wit key value pairs.
 * example:
 * {
 *  LOG_LEVEL: "info",
 *  PORT: 80,
 *  APPINSIGHTS_INSTRUMENTATIONKEY: "",
 * }
 * @param {*} logger Something like console that implements info(str) and debug(str).
 * If passed, every value that is set or unset in proces.env will be logged.
 */
const set = (defaultKeyValues, logger) => {
  log = logger;
  defaults = defaultKeyValues; // store for use in unset()

  Object.keys(defaults).forEach(function (key) {
    if (!process.env[key]) {
      if (defaults[key] === REQUIRED_NO_DEFAULT) {
        if (log) {
          log.warn(
            `'${key}' is required to have the env value set before running defaultEnv.set(), no default value is available.`
          );
        }
        throw `Required env '${key}' does not exist.`;
      }

      if (log) {
        log.info(
          ` - Env '${key}' is not set, defaulting to '${defaults[key]}'.`
        );
      }
      process.env[key] = defaults[key];
    }
  });
};

/**
 * Remove all process.envs that are found in DEFAULTS.
 */
const unset = () => {
  Object.keys(defaults).forEach(function (key) {
    if (log) {
      log.debug(
        `Removing '${key}' with value '${process.env[key]}' from process.env.`
      );
    }
    delete process.env[key];
  });
};

/**
 * Module exports
 */
module.exports = {
  set: set,
  unset: unset,
  REQUIRED_NO_DEFAULT: REQUIRED_NO_DEFAULT,
};
