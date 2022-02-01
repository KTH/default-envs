/* eslint-env mocha */
"use strict";

// Testing libraries
const expect = require("chai").expect;
const defaultEnvs = require("../../index");

describe("Default Envs \n", function () {
  it("Throw an error if a required env is missing. Set via variable", function () {
    expect(() => {
      defaultEnvs.set({
        USERNAME: "admin",
        PASSWORD: defaultEnvs.ENV_REQUIRED,
      });
    }).to.throw("Required env 'PASSWORD' does not exist.");
    defaultEnvs.unset();
  });

  it("Throw an error if a required env is missing. Set via string", function () {
    expect(() => {
      defaultEnvs.set({
        USERNAME: "admin",
        PASSWORD: "ENV_REQUIRED",
      });
    }).to.throw("Required env 'PASSWORD' does not exist.");
    defaultEnvs.unset();
  });

  it("If a default value is set you can access it wia process.env.", function () {
    defaultEnvs.set({ LOG_LEVEL: "superhigh" });
    expect(process.env.LOG_LEVEL).to.equal("superhigh");
    defaultEnvs.unset();
  });

  it("If a env is already set prior to running set(defaults), process.env will return it.", function () {
    process.env.LOG_LEVEL = "info";
    defaultEnvs.set({ LOG_LEVEL: "superhigh" });
    expect(process.env.LOG_LEVEL).to.equal("info");
    delete process.env.LOG_LEVEL;
    defaultEnvs.unset();
  });

  it("After runnign unset() all defaults values are removed from process.env array.", function () {
    defaultEnvs.set({ LOG_LEVEL: "low", DB_USER: "admin" });
    expect(process.env.LOG_LEVEL).to.equal("low");
    expect(process.env.DB_USER).to.equal("admin");
    defaultEnvs.unset();
    expect(process.env.LOG_LEVEL).to.be.undefined;
    expect(process.env.DB_USER).to.be.undefined;
  });

  it("After runnign unset() all emvs set on startup are still availible.", function () {
    process.env["DB_PWD"] = "some secret not in defaults";
    defaultEnvs.set({ LOG_LEVEL: "low", DB_USER: "admin" });
    expect(process.env.LOG_LEVEL).to.equal("low");
    expect(process.env.DB_USER).to.equal("admin");
    defaultEnvs.unset();
    expect(process.env.LOG_LEVEL).to.equal(undefined);
    expect(process.env.DB_USER).to.equal(undefined);
    expect(process.env.DB_PWD).to.equal("some secret not in defaults");
  });

  it("If a logger is passed to the set({}, logger), use it to log.", function () {
    expect(() => {
      defaultEnvs.set({ LOG_LEVEL: "low", DB_USER: "admin" }, {});
    }).to.throw("log.info is not a function");
    expect(() => {
      defaultEnvs.unset();
    }).to.throw("log.debug is not a function");
  });
});
