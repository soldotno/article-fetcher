const request = require('superagent');

module.exports = function(url, options, callback) {
    if (!url) {
        return callback('You must specify a URL.')
    }

    request
        .get(url)
        .end((err, res) => {
            if (err) {
                return callback(err);
            }

            this.process(res.text, options, callback);
        });
}
