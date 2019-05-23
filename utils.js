function readKeepAliveTimeout() {
    let iKeepAlive = process.argv.indexOf('--keepAliveTimeout');
    if (iKeepAlive !== -1) {
        // workaround: set the keepAliveTimeout property
        return parseInt(process.argv[iKeepAlive + 1]);
    }
    return 5000;
}

function isKeepAliveDisabled() {
    return process.argv.indexOf('--keepAliveDisabled') !== -1;
}

module.exports = {
    readKeepAliveTimeout,
    isKeepAliveDisabled
};
