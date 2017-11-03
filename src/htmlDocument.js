import * as cheerio from 'cheerio';
import moment from 'moment';

class HTML {
    constructor(contents){
        this.contents=contents;
    }
    
    loadDocument(contents){
        const $ = cheerio.load(contents);
        return $;
    }

    getElement($){
        if($.root().length != 0){
            let root = $.root().html();
            return root;
        }
    }
    getLanguage($){
        if($.root().length != 0){
            let languange = $('html').attr('lang');
            return languange;
        }
    }
}
    class Head extends HTML {
        constructor(){
            super();
        }

        getElement($){
            if($('head').length != 0){
                let head = $('head').html();
                return head;
            }
            
        }

       getMetaData($){
            let head = this.getElement($);
            let metaData = {};
            if(head == null){
                console.log('No head Found');
                return null;
            }
            //geting Article meta
            let title = $('title').html();
            metaData.title = title;
            let canonical = $('link[rel="canonical"]').attr('href');
            metaData.canonical = canonical;
            let author = $('meta[name=author]').attr('content');
            metaData.author=author; 
            let description = $('meta[name=description]').attr('content');
            metaData.description = description;
            let coverPhoto = $('link[itemprop=image]').attr('href');
            metaData.coverPhoto = coverPhoto;

            return metaData;
       }


    }

    class Body extends HTML{
        constructor(){
            super();
        }
        getElement($){
            if($('body').length != 0){
                let body = $('body').html();
                return body;
            }
        }
        getArticleData($){
            let articleData = {};
            let body = this.getElement($);
            if(body == null){
                return null;
            }
            //Getting Article Data
            if($('article').length != 0){
                let articleTitle = $('article').children('h1').html();
                let articleAuthor = $('div[class="author articleLabel"]').text();
                
                let articleDate = moment(articleAuthor, 'MM/DD/YYYY').format('MM/DD/YYYY');
                articleAuthor = articleAuthor.slice(3, -12);
                articleData.articleAuthor = articleAuthor ;
                articleData.articleTitle = articleTitle;
                articleData.articleDate = articleDate;
                return articleData;
            }
            //looks for an aside with social links and grabs their URL
            if($('aside[class="socialLinks"]').length !=0){
                //TODO Fix THis
                let socialLinks = [];
                let social = $('aside').html();
                
                //console.log('social foinud',social);
            }  
            
        }
        getArticleContent($){
            if($('article').length != 0){
                let articleContent = $('article').find('p').text();
                return articleContent;
            }
        }
    }
    class style extends HTML{
        constructor(){
            super();
        }
        getElement($){
            if($('style').length != 0){
                let style = $('style').html();
                return style;
            }
        }

    }

    module.exports = {HTML,Head,Body,style};