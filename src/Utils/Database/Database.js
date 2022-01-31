"use strict";
//fileSystem modülümüzü tanımlıyoeuz; tek modül tereli olucaktır
const fs = require("fs");

const Util = require("../Util").default


//__esModule : true
Util.prototyper(exports, "__esModule", { val: true });

class Database {
    constructor() { }

    /**
     * Database dosyamıza bir value yi belirttiğimiz key'e tanımlıyoeuz
     * 
     * @param {Sting} key 
     * @param {Object<Array>} value 
     * 
     * @returns {Boolean}
     */
    set(key, value) {
        var data = require((__dirname + '/' + "Databases.json"));
        data[key] = value;
        fs.writeFileSync((__dirname + '/' + "Databases.json"), `${JSON.stringify(data)}\r\n`, {
            encoding: "utf-8",
        });

        return true
    }

    /**
     * Database dosyamıza belirttiğimiz key'e karşılık gelen value yi çekiyoeuz
     * 
     * @param {Sting} key 
     * @return {Object}
     */
    get(key) {
        var data = require((__dirname + '/' + "Databases.json"));
        return data[key]
    }

    /**
     * Database dosyamıza belirttiğimiz key'e karşılık gelen value yi siliyoruz
     * 
     * @param {Sting} key 
     * @return {Boolean}
     */

    delete(key) {
        var data = require((__dirname + '/' + "Databases.json"));
        delete data[key];
        fs.writeFileSync((__dirname + '/' + "Databases.json"), `${JSON.stringify(data)}\r\n`, {
            encoding: "utf-8",
        });

        return true
    }
};

Util.prototyper(exports , "default" , { val : Database})
