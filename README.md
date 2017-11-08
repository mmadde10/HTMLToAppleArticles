  #                                               Notitia

### Convert Regular HTML article Pages into AMP Pages, Facebook Instant Artciles or Apple Articles


#### Build Facebook Instant Article
```javascript
let Not = new Notitia(contents);
let instantArticle = Not.createFBInstantArticle(contents);
//Returns Facebook Instant Article Markup
```
#### Build AMP Page HTML
```javascript
let Not = new Notitia(contents);
let ampPage = Not.createAMPPage(contents);
//Returns AMP Complient HTML
```
#### Build AMP Page HTML (Body Only)
```javascript
let Not = new Notitia(contents);
let ampPageBody = Not.createAMPBody(contents);
//Returns AMP Complient HTML (Body Only)
```

__Note__
CreateAMPBody Method will only return the body of the AMP HTML Page. 
This will not pass the AMP Validator. 
For More info visit [AMP's Documentation](https://www.ampproject.org/docs/getting-started/)

##                                                 Installation

```
npm install notitia
```

##                                                 Information



##                                                 Testing
Jest is used to run tests on Notitia
```
npm run test
```
##                                                 Dependencies
* [Cheeriojs](https://github.com/cheeriojs/cheerio)
* [amphtml-validator](https://github.com/ampproject/amphtml/tree/master/validator/nodejs)
* [babel-register](https://github.com/Cap32/babel-register-cli)
* [Pretty](https://github.com/jonschlinkert/pretty)


##                                                 License
MIT
