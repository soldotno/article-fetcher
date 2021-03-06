# article-fetcher
Fetches clean full text articles.

## Content
* [Install](https://github.com/soldotno/article-fetcher#install)
* [Dependencies](https://github.com/soldotno/article-fetcher#dependencies)
* [Usage](https://github.com/soldotno/article-fetcher#usage)
* [API](https://github.com/soldotno/article-fetcher#api)
* [Options](https://github.com/soldotno/article-fetcher#options)
* [Bad nodes and words suggestions](https://github.com/soldotno/article-fetcher#bad-nodes-and-words-suggestions)
* [Full example](https://github.com/soldotno/article-fetcher#full-example)

## Install

    npm install article-fetcher

## Dependencies
* [cheerio](https://github.com/cheeriojs/cheerio)
* [string.js](https://github.com/jprichardson/string.js)
* [superagent](https://github.com/visionmedia/superagent)

## Usage
```js
const af = require('article-fetcher');
```

## API

### getArticle(url, options, callback) 
Fetches an article from an URL and then processes it. Available [options](https://github.com/soldotno/article-fetcher#options).

```js
af.getArticle(url, options, callback);
```

### process(url, options, callback)
If you already have the HTML to process available, you can simply call this function to process the article. Available [options](https://github.com/soldotno/article-fetcher#options).

```js
af.process(content, options, callback);
```

## Options
* `selector` - Article selector. Default: 'body'
* `badNodes` - Nodes to exclude based on classes, ids or tags. Default: []
* `badWords` - Nodes to exclude based on content. Default: []
* `timeout` - Request timeout in ms. See [superagent documentation](http://visionmedia.github.io/superagent/#request-timeouts) for details. Default: 5000

Example:
```js
const options = {
    selector: '.article-body',
    badNodes: ['h1', 'h2', 'figure', '.share-buttons', '#byline'],
    badWords: ['read more:']
}
```
    
## Full example

Code:

```js
const af = require('article-fetcher');

const url = 'http://www.sol.no/nyheter/2015_08_11_55852_isfjellet-dukket-opp-300-meter-fra-huset.html';
const selector = '.entry-content';
    
const badNodes = [
    // Tags
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'noscript', 'style', 'img',
    'figure', 'aside', 'meta', 'iframe', 'amedia-embed',
    // Classes
    '.adLabel', '.cxense-article', '.share', '.tags', '.comments', '.fb-share',
    '.dropzoneContainer', '.objectType-bildedb', '.authorAndTime', '.dinside_introlink',
    '.art-tags', '.art-share', '.am-articleTagList-subtitle', '.am-articleTagList',
    '.am-article-actions', '.byline', '.reg-tools', '.reg-grid-footer', '.belowBodyText',
    '.sc-inviter-content', '.fb-like', '.emneord-artikkel', '.share-buttons', '.hmedia',
    // IDs
    '#byline', '#dzGroupTop', '#dzBottom'
];

const badWords = [
    'les også:', 'les mer:', 'foto:', 'se også:', 'levert av'
];
    
const options = {
    selector: selector,
    badNodes: badNodes,
    badWords: badWords,
    timeout: 10000
};
    
af.getArticle(url, options, (err, res) => {
    if (err) {
         return console.log(err);
    }
      
    console.log(res);
});
```

Output:

```
Det var litt av et syn som møtte Jason Griffiths da han tittet ut stuevinduet hjemme i Newfoundland i Canada. Et 
enormt isfjell fløt forbi huset og Jason var rask med å plukke opp mobilen for å filme det majestetiske synet. Ikke
lenge etter at han startet å filme, skjedde det noe spesielt. I en video, som nå går sin seiersgang på YouTube, kan
man høre et enormt smell fra isfjellet før det raser sammen. – Kom dere bort fra stranden, kan man høre Jason 
skrike til sin kone som oppholdt seg på en strand like ved der hun luftet deres to hunder. Ingen personer ble 
skadet i hendelsen som fant sted tirsdag i forrige uke.
```
