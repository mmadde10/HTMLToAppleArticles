import * as cheerio from 'cheerio';
import * as htmlDocument from './htmlDocument';
import * as fb from './fbArticle';
import * as amp from './amp';

function Notitia (articleType,contents,ampFlag){


    if(contents != null || contents != undefined){
        const heads = new htmlDocument.Head();
        const bodies = new htmlDocument.Body();
        const documents = new htmlDocument.HTML(contents);
        const style = new htmlDocument.Style();

        //Flag For FB instant Article
        if(articleType == 1){
            const fbDocument = new fb.FBDocument(contents);
            let $ = documents.loadDocument(contents);
            let articleHeader = fbDocument.createArticleHeader($);
            let articleBody = fbDocument.createArticleBody($);
            let article = `<body><article>${articleHeader}${articleBody}</article></body>`;
            let languange = documents.getLanguage($);
            let head = fbDocument.createHead($);
            let footer = bodies.getFooter($);
            let instantArticle = null;

                if(footer == null || footer == undefined){
                    instantArticle = `<!doctype html> <html lang="${languange}">${head}${article}</html>`;
                }

                if(footer != null || footer != undefined){
                    instantArticle = `<!doctype html> <html lang="${languange}">${head}${article}${footer}</html>`;
                }

            return instantArticle;
        }
        //Flag For AMP Page
        if(articleType == 2){

            const amps = new amp.AMP(contents);
            let $ = amps.getHTML(contents);
            let cssTags = amps.fixTags($);
            let ampHead = amps.buildHead($,cssTags);
            let ampBody = amps.fixImgIframeTags($);
            let ampHTML = `<!DOCTYPE html><html ⚡ lang="en">${ampHead}${ampBody}</html>`;

            if(ampFlag == null || ampFlag == undefined){
                return ampHTML
            }
            else{
                return ampBody;
            }
        }

        /*
        TODO Add Apple Articles
        if(articleType == 3){

        }
        */

        else{
            return null;
        }
    }

    //No Content Found
    else{
        console.log("No Content Found ");
        return null;
    }
};
module.exports = {Notitia};