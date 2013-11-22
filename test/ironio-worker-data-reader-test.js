/*jshint node: true, expr:true */
/*global describe, beforeEach, it, require */

require('must'); // https://github.com/moll/js-must/blob/master/doc/API.md#Must
var rewire = require('rewire');


describe("Reader", function () {
    "use strict";

    var mod;

    function stub() {
    }

    function notExpected() {
        throw "NOT EXPECTED";
    }

    function exists(val) {
        (!!val).must.be.true;
    }

    function notExists(val) {
        (!val).must.be.true;
    }

    function setMock(hash) {
        mod.__set__(hash);
    }

    function getFunc(name) {
        return mod.__get__(name);
    }

    // NOTE: Use create-module.js script to complete
    beforeEach(function (done) {
        mod = rewire("../lib/ironio-worker-data-reader");
        done();
    });


    it("shouild get indexes", function () {
        setMock({
            process: {
                argv: ["a", "b"]
            }
        });

        getFunc("getIndexes")().must.eql({
            a: 1,
            b: 2
        });
    });


    describe("reading should", function () {
        var readElseDefault;
        beforeEach(function (done) {
            readElseDefault = getFunc("readElseDefault");
            done();
        });


        it("get file from param", function () {
            setMock({
                process: {
                    argv: [null, "FILEPATH"]
                },
                fs: {
                    existsSync: function (filePath) {
                        filePath.must.eql("FILEPATH");
                        return true;
                    },
                    readFileSync: function (filePath, encoding) {
                        filePath.must.eql("FILEPATH");
                        encoding.must.eql("ascii");
                        return "DATA";
                    }
                }
            });

            readElseDefault(1, "DEVFILEPATH").must.be.true;
        });


        it("not get file from param", function () {
            setMock({
                process: {
                    argv: [null, "FILEPATH"]
                },
                fs: {
                    existsSync: function (filePath) {
                        filePath.must.eql("FILEPATH");
                        return false;
                    },
                    readFileSync: notExpected
                }
            });

            notExists(readElseDefault(1));
        });


        it("get default dev file", function () {
            setMock({
                process: {
                    argv: [null, null]
                },
                fs: {
                    existsSync: function (filePath) {
                        filePath.must.eql("DEVFILEPATH");
                        return true;
                    },
                    readFileSync: function (filePath, encoding) {
                        filePath.must.eql("DEVFILEPATH");
                        encoding.must.eql("ascii");
                        return "DATA";
                    }
                }
            });

            readElseDefault(null, "DEVFILEPATH").must.be.true;
        });


        it("not find default dev file", function () {
            setMock({
                process: {
                    argv: [null, null]
                },
                fs: {
                    existsSync: function (filePath) {
                        filePath.must.eql("DEVFILEPATH");
                        return false;
                    },
                    readFileSync: notExpected
                }
            });

            notExists(readElseDefault(null, "DEVFILEPATH"));
        });
    });


    it("should read", function () {
        setMock({
            indexes: {
                "PARAMNAME": 9
            },
            readElseDefault: function (index, devFilePath) {
                index.must.eql(9);
                return "DATA";
            }
        });

        mod.read("PARAMNAME", "DEVRELATIVEFILEPATH").must.eql("DATA");
    });


    it("should read json", function () {
        setMock({
            read: function (paramName, devRelativeFilePath) {
                paramName.must.eql("PARAMNAME");
                devRelativeFilePath.must.eql("DEVRELATIVEFILEPATH");
                return JSON.stringify({data: "DATA"});
            }
        });

        mod.readJson("PARAMNAME", "DEVRELATIVEFILEPATH").must.eql({data: "DATA"});
    });


    it("should read raw config", function () {
        setMock({
            read: function (param, devRelativeFilePath) {
                param.must.eql("-config");
                devRelativeFilePath.must.eql("DEVRELATIVEFILEPATH");
                return "DATA";
            }
        });

        mod.readConfig("DEVRELATIVEFILEPATH").must.eql("DATA");
    });


    it("should read config json", function () {
        setMock({
            readJson: function (param, devRelativeFilePath) {
                param.must.eql("-config");
                devRelativeFilePath.must.eql("DEVRELATIVEFILEPATH");
                return "DATA";
            }
        });

        mod.readConfigJson("DEVRELATIVEFILEPATH").must.eql("DATA");
    });


    it("should read raw payload", function () {
        setMock({
            read: function (param, devRelativeFilePath) {
                param.must.eql("-payload");
                devRelativeFilePath.must.eql("DEVRELATIVEFILEPATH");
                return "DATA";
            }
        });

        mod.readPayload("DEVRELATIVEFILEPATH").must.eql("DATA");
    });


    it("should read payload json", function () {
        setMock({
            readJson: function (param, devRelativeFilePath) {
                param.must.eql("-payload");
                devRelativeFilePath.must.eql("DEVRELATIVEFILEPATH");
                return "DATA";
            }
        });

        mod.readPayloadJson("DEVRELATIVEFILEPATH").must.eql("DATA");
    });
});