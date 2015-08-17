'use strict';

const cheerio = require('cheerio');
const S = require('string');

function removeUnwantedDOMNodes($, article, badNodes, badWords) {
    // Remove nodes based on tags/classes/ids.
    badNodes.map(function(node) {
        $(article).find(node.toLowerCase()).remove();
    });

    // Remove nodes based on content.
    $(article).children().each(function() {
        const text = $(this).text().toLowerCase();
        let remove = false;

        badWords.map(function(word) {
            if (text.indexOf(word.toLowerCase()) > -1) {
                remove = true;
            }
        });

        if (remove) {
            $(this).remove();
        }
    });

    return article;
}

function removeUnwantedChars(sentence) {
    return sentence.replace(/([«»'*])/g, '');
}

function removeEmptySentences(sentence) {
    return sentence ? true : false;
}

function handleOtherPunctuationMarks(sentence) {
    return sentence.replace(/([!?):;])/g, '$1 ');
}

function trimSentence(sentence) {
    return S(sentence).collapseWhitespace().s;
}

function decodeHTMLEntities(sentence) {
    return S(sentence).decodeHTMLEntities().s;
}

function sentencePrettifier(sentences) {
    return sentences
            .filter(removeEmptySentences)
            .map(decodeHTMLEntities)
            .map(handleOtherPunctuationMarks)
            .map(removeUnwantedChars)
            .map(trimSentence);
}

exports = module.exports = function(content, options, callback) {
    if (!content) {
        return callback('No content provided to processor.');
    }

    const $ = cheerio.load(content, {
        normalizeWhitespace: true,
        lowerCaseTags: true
    });
    const selector = options.selector ? options.selector : 'body';
    const badNodes = options.badNodes instanceof Array ? options.badNodes : [];
    const badWords = options.badWords instanceof Array ? options.badWords : [];
    let article = $(selector);
    let sentences;

    article = removeUnwantedDOMNodes($, article, badNodes, badWords);
    article = article.text();
    sentences = article.split('.');

    callback(null, sentencePrettifier(sentences).join('. '));
}
