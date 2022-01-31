
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * basit bir Error classımız
 */
class İnstagramError extends Error {
    constructor(ErrorMessage, ErrorName) {
        super();
        this.name = ErrorName ? ErrorName : 'İnstagramError';
        this.message = ErrorMessage;
        Error.captureStackTrace(this);
    }
}

exports.default = İnstagramError;
