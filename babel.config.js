// babel.config.js
module.exports = api => {
    const isTest = api.env('test')

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                }
            ],
            "@babel/preset-react"
        ],
        "plugins": [
            [
                "@babel/plugin-proposal-decorators",
                {
                    "legacy": true
                }
            ],
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ],
            [
                "@babel/plugin-transform-runtime",
                {
                    corejs: isTest ? 2 : false
                }
            ],
            "@babel/plugin-proposal-object-rest-spread"
        ]
    }
}
