  #                                               Notitia

### Convert Regular HTML article Pages into AMP Pages or Facebook Instant Articles



##                                                Information
Notitia (Latin for Knowledge) is a node module. Notitia converts basic HTML based articles into either AMP (Accelerated Mobile Pages) markup or into Facebook Instant Article Markup. Notitia automates the process of converting plain html code into these two article formats, eliminating the need to create multiple copies of the same article. 

* [AMP's Documentation](https://www.ampproject.org/)
* [Facebook Instant Articles Documentation](https://developers.facebook.com/docs/instant-articles/)



##                                                 Installation

* Install using NPM

```
npm install notitia
```

* Import to your Project
```javascript
import * as notitia from 'notitia';
```


##                                                 Methods

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

__Note:__
CreateAMPBody Method will only return the body of the AMP HTML Page. 
This will not pass the AMP Validator. 
For More info visit [AMP's Documentation](https://www.ampproject.org/docs/getting-started/)



##                                                 Testing
Jest is used to run tests on Notitia
```
npm run test
```
##                                                 Dependencies
* [Cheeriojs](https://github.com/cheeriojs/cheerio)
* [babel-register](https://github.com/Cap32/babel-register-cli)
* [Pretty](https://github.com/jonschlinkert/pretty)
* [moment](https://momentjs.com/)

##                                                 License
MIT
