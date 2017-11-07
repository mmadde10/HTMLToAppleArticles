  #                                               Notitia

### Convert Regular HTML article Pages into AMP Pages, Facebook Instant Artciles or Apple Articles


```javascript
let ampPage = Notitia(2,contents,1);
let prettyArticle = pretty.prettyPrint(ampPage, {indent_size: 2}); 
  console.log("finish AMP\n",prettyArticle);
//Returns AMP Complient HTML
```
```javascript
let ampPage = Notitia(1,contents,1);
let prettyArticle = pretty.prettyPrint(ampPage, {indent_size: 2}); 
  console.log("finish FB\n",prettyArticle);
//Returns FaceBook Instant Article HTML
```
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
