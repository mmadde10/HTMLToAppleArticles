'use strict';
import moment from 'moment';
import * as htmlDocument from '../src/htmlDocument';

const heads = new htmlDocument.Head();
const bodies = new htmlDocument.Body();
const documents = new htmlDocument.HTML();
const style = new htmlDocument.Style();



class FBDocument {
    constructor(contents){
        this.contents = contents;
    }
    createHead($){
        let meta = heads.getMetaData($);
        let head = `<head>
            <meta charset="utf-8">
            <link rel="canonical" href="${meta.canonical}">
            <title>${meta.title}</title>
            <meta property="fb:article_style" content="Default">
        </head>`;
        return head;
    }
    createArticleHeader($){
        let articleData = bodies.getArticleData($);
        let media = bodies.getMedia($);
        let figure; 
        let coverMedia;
        let articleHeader;    

        if(media.img != null){
            coverMedia = media.img;
            figure = `<figure data-mode=aspect-fit><img src="${coverMedia}" /></figure>`
        }
        if(media.video != null ){
            coverMedia = media.video;
            figure = `<figure data-mode=aspect-fit><video><source src="${coverMedia}" type="video/mov" /></video></figure>`;  
        }

        articleHeader = `<header>
            ${figure}
                <h1>${articleData.articleTitle}<h1>
                <h3 class="op-kicker"></h3>
                <address>
                ${articleData.articleAuthor}
                </address>
                <time class="op-published" dateTime="${articleData.articleDate}">${articleData.formatedTime}</time>
            </header>`;

        return articleHeader;
    }

    createArticleBody($){
        let articleBody;    
        let articleContent = bodies.getArticleContent($);
        articleBody = `${articleContent}`;
        return articleBody;
    }

    buildEntireArticle($){
        const fbDocument = new FBDocument();
        let articleHead = fbDocument.createArticleHeader($);
        let articleBody = fbDocument.createArticleBody($);
        let article = `<article> ${articleHead} ${articleBody} < /article>`;

        return article;
    }

    buildFbDocument($){
        const fbDocument = new FBDocument();
        let languange = documents.getLanguage($);
        let article =  fbDocument.buildEntireArticle($);
        let head = fbDocument.createHead($);
        let footer = bodies.getFooter($);
        if(footer == null){
            let Document = `<!doctype html> <html lang="${languange}">
            ${head}
            ${article}
        < /html>`;
        }
        let Document = `<!doctype html> <html lang="${languange}">
            ${head}
            ${article}
            ${footer}
        < /html>`;

        return Document;
    }

}
module.exports = {FBDocument};