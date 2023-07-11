module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-console":"error",
        "camelcase": ["error", {properties:"never"}],
        semi: ["error", "always"],
        "indent": ["error", 4],
    },
}
