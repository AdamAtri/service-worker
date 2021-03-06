module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true,
        "jquery": true,
        "serviceworker": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [ "error", "unix" ],
        "semi": [ "error", "always" ],
        "no-console":0,
        "no-unused-vars": 1
    }
};
