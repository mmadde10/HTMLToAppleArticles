'use strict';
import * as cheerio from 'cheerio';
import * as pretty from 'html';
import * as htmlDocument from './htmlDocument';

const heads = new htmlDocument.Head();
const bodies = new htmlDocument.Body();
const style = new htmlDocument.Style();

class AMP {
    constructor(content){
        this.content = content;
    }
    getHTML(content){
        const documents = new htmlDocument.HTML();
        let $ = documents.loadDocument(content);
        return $;
    }

    fixTags($){
        let styleTag = $('style').each(function(index, element) {
            let oldStyle = element;
            let css = $(oldStyle).html();
            let newStyle = `<style amp-custom>${css}</ style>`;
            $(this).replaceWith(newStyle);
            return newStyle;
            });
        return styleTag;
        }

    buildHead($,style){
        let iframeScript = '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>';
        let boilerplate = "<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>";
        let meta1 = '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">';
        let meta2 = '<meta charset="utf-8">';
        let cononical = '<link rel="canonical" href="file.amp.html">';
        let script = '<script async src="https://cdn.ampproject.org/v0.js"></script>';
        let newHead = `<head>${meta2}${meta1}${script}${iframeScript}<style amp-custom>${style}</style>${boilerplate}${cononical}</ head>`; 
        return newHead;
    }
    fixImgIframeTags($){
        $('body').find('img').each(function() {
            let imgAttr = {stringSRC:String($(this).attr('src')), width: 16, height: 9, layout:"responsive"};
            let ampIMG = `<amp-img src = ${imgAttr.stringSRC}  width = ${imgAttr.width}  height = ${imgAttr.height} layout= ${imgAttr.layout}>` + $(this).html() + `</amp-img>`;
            $(this).replaceWith(ampIMG);
                return $.html();
            });
            $('iframe').each(function(index, element) {
                let iframe = element.attribs;
                let ampiframe = `<amp-iframe width="16" height="9" sandbox="allow-scripts allow-same-origin" layout="responsive" title=${iframe.title} id=${iframe.id} src=${iframe.src}></amp-iframe>`;
                $(this).replaceWith(ampiframe);
                return $.html();
            });
            return $('body').html();
    }

}

module.exports = {AMP};