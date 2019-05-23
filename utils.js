function readKeepAliveTimeout() {
    let iKeepAlive = process.argv.indexOf('--keepAliveTimeout');
    if (iKeepAlive !== -1) {
        // workaround: set the keepAliveTimeout property
        return parseInt(process.argv[iKeepAlive + 1]);
    }
    return 5000;
}

module.exports = {
    readKeepAliveTimeout
};
