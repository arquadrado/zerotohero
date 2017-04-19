const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

    context: __dirname,

    entry: [
        './resources/assets/js/main',
        './resources/assets/sass/main.scss'
    ],

    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "es2015",
                        "es2016",
                        "stage-2"
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            }

        ]
    },

    plugins: [
        new ExtractTextPlugin('main.css')
    ]
}

//"./resources/assets/js/main.js",


