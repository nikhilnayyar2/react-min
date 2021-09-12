module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "react-hooks" // https://reactjs.org/docs/hooks-rules.html
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended",
    ],
    env: {
        "browser": true,
        "es2021": true,
        "node": true,
        "worker": true
    },
    parserOptions: {
        "sourceType": "module",
        "requireConfigFile": false
    },
    rules: {
        "@typescript-eslint/no-use-before-define": [
            "error",
            {
                "functions": false
            }
        ],
        "react/react-in-jsx-scope": "off",    // suppress errors for missing 'import React' in files
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    },
    globals: {
        "process": "readonly"
    },
    settings: {
        "react": {
            "version": "detect"
        }
    },
    ignorePatterns: [
        "node_modules", // don't ever lint node_modules
        "dist",  // don't lint build output
        "coverage", // don't lint nyc coverage output
    ]
}