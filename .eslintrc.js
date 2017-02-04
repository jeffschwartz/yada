module.exports = {
    "extends": ["standard"],
    "plugins": [
        "standard",
        "promise",
        "json"
    ],
    "env": {
        "browser": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 5,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "settings": {
        // "react": {
        //     "pragma": "React",  // Pragma to use, default to "React"
        //     "version": "15.0" // React version, default to the latest React stable release
        // }
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "indent": ["error", 4],
        "no-unused-vars": 1,
        "eol-last": 0,
        "no-class-assign": 0
    }
};
