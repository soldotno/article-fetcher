const request = require('superagent');

module.exports = function(url, options, callback) {
    if (!url) {
        return callback('You must specify a URL.')
    }

    const timeout = options.timeout ? options.timeout : 5000;

    request
        .get(url)
        .timeout(timeout)
        .end((err, res) => {
            if (err) {
                return callback(err);
            }

            this.process(res.text, options, callback);
        });
}
