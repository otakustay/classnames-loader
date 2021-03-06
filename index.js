var loaderUtils = require("loader-utils");

module.exports = function(source, map) {
    this.callback(null, source, map);
};

module.exports.pitch = function(remainingRequest) {
    this.cacheable();
    return `
        // classnames-loader: automatically bind css-modules to classnames
        function interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }
        var classNames = require(${loaderUtils.stringifyRequest(this, '!' + require.resolve('classnames/bind'))});
        var locals = interopRequireDefault(require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})).default;
        var css = classNames.bind(locals);
        for (var style in locals) {
            if (!locals.hasOwnProperty(style)) {
                continue;
            }
            if (typeof Object.defineProperty === 'function') {
                Object.defineProperty(css, style, {value: locals[style]});
            }
            else {
                css[style] = locals[style];
            }
        }
        module.exports = css;
    `;
};
