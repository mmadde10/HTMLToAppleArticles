'use strict';
import * as cheerio from 'cheerio';
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
            let style = $('style').html();
            let newStyle = style;
            return newStyle;
        }

    buildHead($,style){
        let iframeScript = '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>';
        let boilerplate = "<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>";
        let meta1 = '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">';
        let meta2 = '<meta charset="utf-8">';
        let cononical = '<link rel="canonical" href="file.amp.html">';
        let script = '<script async src="https://cdn.ampproject.org/v0.js"></script>';
        let sideBar =  `<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>`;
        let social = `    <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>`;
        let mustache = `<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>`;
        let list = `<script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>`;
        
        let newHead = `<head>${meta2}${meta1}${script}${iframeScript}${mustache}${sideBar}${social}${list}<style amp-custom>${style}</style>${boilerplate}${cononical}</head>\n`; 
        return newHead;
    }
    fixAndRemoveTags($){
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
            $('script[type="text/template"]').each(function(){
                $(this).remove();
                return $.html();
            });
            $('script[type="application/template"]').each(function(){
                $(this).remove();
                return $.html();
            });
            $('p').each(function() {
                $(this).removeAttr('style');
                return $.html();
            });
            $('style:not([amp-boilerplate])').each(function(){
                    let oldStyle = $(this).html();
                    let newStyle = `<style amp-custom>${oldStyle}</style>`
                    $(this).replaceWith(newStyle);

            });
            
       return $('body').html();
    }
    
    replaceSocialMedia($){
        let fb = $('a[data-social-type="facebook"]').attr('href');
        let twitter = $('a[data-social-type="twitter"]').attr('href');
        let linkedin = $('a[data-social-type="linkedin"]').attr('href');
        let newFB = `<amp-social-share type="facebook" width="30" height="22" data-attribution="254325784911610" data-param-url='${fb}'></amp-social-share>`;
        let newTwitter = `<amp-social-share type="twitter" width="30" height="22" data-param-url='${twitter}'></amp-social-share>`;
        let newLinkedIn = `<amp-social-share type="linkedin" width="30" height="22" data-param-url='${linkedin}'></amp-social-share>`;
        let newSocial = `<div class="m1">${newFB}${newTwitter}${newLinkedIn}</div>`;
        $('aside').replaceWith(newSocial);
        $('div[class="top socialLinks"]').remove();
        
        return $('article').html();
    }
    getFooter($){
        let footer;
        footer = $('footer').html();

        return `<footer class="footer-content-container" itemtype="http://schema.org/WPFooter">${footer}</footer>`;
    }
}

module.exports = {AMP};