A Powerball Lottery api wrapper with added functionality.

## Installation
'get-lottery' is an npm module, and as such, can be installed using the `install` command.

	$ npm install get-lottery
## Usage
```javascript
	let getLottery = require('get-lottery');
    
    //set api key (optional)
    getLottery.setKey('bjp8KrRvAPtuf809u1UXnI0Z8');
    
    //generate potential lottery numbers based on data
    getLottery.generateNumbers().then(result => {
    	//returns array of numbers
    });
```
## Documentation
### setKey
An api key is not required, but will allow you to make more requests per second.
```javascript
    getLottery.setKey('bjp8KrRvAPtuf809u1UXnI0Z8');
```
### getAll
Get all Powerball data since 2010, including date, multiplier, and of course, winning numbers.
```javascript
    getLottery.getAll().then(result => {
    	//returns array of objects
    });
```
### getWinningNumbers
Get only winning number data.
```javascript
	//get winning numbers only
    getLottery.getWinningNumbers().then(result => {
    	//returns array of strings
    });
    
    //get winning numbers, counted
    getLottery.getWinningNumbers(true).then(result => {
    	//returns array of objects
        //id = number;
        //count = how many times the number appears in the data
    });
```
### generateNumbers
Based on probability, return an array of numbers consituting future lottery numbers.
```javascript
    getLottery.generateNumbers().then(result => {
    	//returns array of numbers
    });
```

## License
This module is under the MIT License. Feel free to use it to your liking.