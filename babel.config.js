const plugins = [];

if (process.env.NODE_ENV !== "production" && process.env.SERVE !== undefined) {
    plugins.push("react-refresh/babel");
}

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins,
};
