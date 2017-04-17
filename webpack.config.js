module.exports = {
    context: __dirname,
    entry: "./resources/assets/js/main.js",
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
            }
        ]
    }
}