/* eslint-env mocha */
"use strict";

// Testing libraries
const expect = require("chai").expect;
const defaultEnvs = require("../../index");

describe("Cluster specifics\n", function () {
  it("Read a default value.", function () {
    defaultEnvs.set({ LOG_LEVEL: "superhigh" });
    expect(process.env.LOG_LEVEL).to.equal("superhigh");
    defaultEnvs.unset();
  });

  it("Ignores key-value that already exists before setting defaults.", function () {
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

  it("If a logger is passed to the set({}, logger), use it to log.", function () {
    expect(() => {
      defaultEnvs.set({ LOG_LEVEL: "low", DB_USER: "admin" }, {});
    }).to.throw("log.info is not a function");
    expect(() => {
      defaultEnvs.unset();
    }).to.throw("log.debug is not a function");
  });
});
