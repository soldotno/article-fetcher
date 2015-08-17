var should = require('chai').should();
var fs = require('fs');
var haf = require('../lib');
var path = require('path');

describe('process()', function() {
    var mockResponseDb = fs.readFileSync(path.resolve(__dirname, 'mocks/db.html'));
    var mockResponseNrk = fs.readFileSync(path.resolve(__dirname, 'mocks/nrk.html'));
    var mockArticleNrk = fs.readFileSync(path.resolve(__dirname, 'mocks/nrk.txt'), 'utf8');
    var mockArticleDb = fs.readFileSync(path.resolve(__dirname, 'mocks/db.txt'), 'utf8');

    var badNodes = [
        // Tags
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'noscript', 'style', 'img',
        'figure', 'aside', 'meta', 'iframe', 'amedia-embed',
        // Classes
        '.adLabel', '.cxense-article', '.share', '.tags', '.comments', '.fb-share',
        '.dropzoneContainer', '.objectType-bildedb', '.authorAndTime', '.dinside_introlink',
        '.art-tags', '.art-share', '.am-articleTagList-subtitle', '.am-articleTagList',
        '.am-article-actions', '.byline', '.reg-tools', '.reg-grid-footer', '.belowBodyText',
        '.sc-inviter-content', '.fb-like', '.emneord-artikkel', '.share-buttons',
        // IDs
        '#byline', '#dzGroupTop', '#dzBottom'
    ];

    var badWords = [
        'les også:', 'les mer:', 'foto:'
    ];

    var nrkSelector = '.article-body';
    var dbSelector = '#editableBodyText';

    it('Article 1 should have the right length', function(done) {
        haf.process(mockResponseDb, {
            selector: dbSelector,
            badNodes: badNodes,
            badWords: badWords
        }, function(err, res) {
            try {
                res.should.have.length(4302);
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });

    it('Article 2 should have the right length', function(done) {
        haf.process(mockResponseNrk, {
            selector: nrkSelector,
            badNodes: badNodes,
            badWords: badWords
        }, function(err, res) {
            try {
                res.should.have.length(1771);
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });

    it('Article 1 should contain expected text', function(done) {
        haf.process(mockResponseDb, {
            selector: dbSelector,
            badNodes: badNodes,
            badWords: badWords
        }, function(err, res) {
            try {
                res.should.equal(mockArticleDb);
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });

    it('Article 2 should contain expected text', function(done) {
        haf.process(mockResponseNrk, {
            selector: nrkSelector,
            badNodes: badNodes,
            badWords: badWords
        }, function(err, res) {
            try {
                res.should.equal(mockArticleNrk);
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });

});
