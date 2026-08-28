'use strict';

// Pulls the latest Medium posts into src/data/writing.json so the Writing
// section stays current without anyone editing the site.
//
// Runs in CI before the build. If Medium is unreachable the committed JSON is
// left untouched and the build carries on — a blog outage must never fail a
// deploy.

const https = require('https');
const fs = require('fs');
const path = require('path');

const FEED = 'https://medium.com/feed/@andreglegg';
const OUT = path.join(__dirname, '..', 'src', 'data', 'writing.json');
const MAX_POSTS = 3;

function get(url, redirectsLeft = 5) {
    return new Promise((resolve, reject) => {
        https
            .get(url, { headers: { 'User-Agent': 'andreglegg.no build' } }, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    if (!redirectsLeft) {
                        reject(new Error('Too many redirects'));
                        return;
                    }
                    res.resume();
                    resolve(get(res.headers.location, redirectsLeft - 1));
                    return;
                }
                if (res.statusCode !== 200) {
                    res.resume();
                    reject(new Error('HTTP ' + res.statusCode));
                    return;
                }
                let body = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => { body += chunk; });
                res.on('end', () => resolve(body));
            })
            .on('error', reject);
    });
}

function unwrap(value) {
    if (!value) return '';
    const cdata = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
    return (cdata ? cdata[1] : value).trim();
}

function tagValue(block, tag) {
    const match = block.match(new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + tag + '>'));
    return match ? unwrap(match[1]) : '';
}

function decode(html) {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&apos;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

// Medium puts the standfirst in the opening heading. Prefer it — it is the
// line the author wrote to sell the piece. Fall back to the first sentence of
// the body for posts that have no subtitle.
function summarise(block) {
    const encoded = tagValue(block, 'content:encoded');

    const heading = encoded.match(/<h[34](?:\s[^>]*)?>([\s\S]*?)<\/h[34]>/);
    if (heading) {
        const standfirst = decode(heading[1]);
        if (standfirst.length > 20) {
            return standfirst.length > 190 ? standfirst.slice(0, 187).trimEnd() + '…' : standfirst;
        }
    }

    const text = encoded
        .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
        .replace(/<h[34][\s\S]*?<\/h[34]>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&apos;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();

    if (!text) return '';
    const sentence = text.split(/(?<=[.!?])\s/)[0];
    const summary = sentence.length > 30 ? sentence : text.slice(0, 160);
    return summary.length > 190 ? summary.slice(0, 187).trimEnd() + '…' : summary;
}

function parse(xml) {
    const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    return blocks.slice(0, MAX_POSTS).map((block) => {
        const published = tagValue(block, 'pubDate');
        const date = new Date(published);
        const categories = (block.match(/<category>[\s\S]*?<\/category>/g) || [])
            .map((c) => unwrap(c.replace(/<\/?category>/g, '')))
            .slice(0, 3);

        return {
            title: tagValue(block, 'title'),
            url: tagValue(block, 'link').split('?')[0],
            published: date.toISOString().slice(0, 10),
            label: date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
            tags: categories,
            summary: summarise(block)
        };
    });
}

get(FEED)
    .then((xml) => {
        const posts = parse(xml);
        if (!posts.length) throw new Error('Feed contained no posts');

        fs.writeFileSync(OUT, JSON.stringify({ posts }, null, 4) + '\n');
        console.log('Writing: pulled ' + posts.length + ' posts from Medium.');
    })
    .catch((error) => {
        console.log('Writing: keeping committed posts (' + error.message + ').');
    });
