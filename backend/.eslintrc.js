module.exports = {
    "root": true,
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "tsconfigRootDir": "./"
    },
    "plugins": [
        "@typescript-eslint",
        "jest"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "ignoreRestSiblings": true
            }
        ],
        "sort-imports": 2
    },
    "overrides": [
        {
            "files": [
                "*.spec.ts"
            ],
            "env": {
                "jest/globals": true
            }
        }
    ]
}