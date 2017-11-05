`use strict`;

var request = require('request');
var baseURL = "https://data.ny.gov/resource/8vkr-v8vh.json";
var key, url = baseURL;

module.exports = {
    setKey: function (key) {
        this.apiKey = key;
        key = this.apiKey;
        url = key ? `${baseURL}?$$app_token=${key}` : baseURL;
    },
    requestLotto: function (callback) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (!error) {
                    if (callback) {
                        body = JSON.parse(body);
                        callback(resolve, body);
                    }
                } else {
                    return reject(error);
                }
            });
        });
    },
    requestWinning: function (body) {
        var winningNumbers = body.map(item => {
            return item.winning_numbers;
        });

        return winningNumbers;
    },
    splitWinning: function (winning) {
        var numbers = [];
        winning.forEach(value => {
            var valNumbers = value.split(' ');
            valNumbers.forEach(number => {
                numbers.push(number);
            });
        });

        return numbers;
    },
    getAll: function () {
        return this.requestLotto((resolve, body) => {
            return resolve(body);
        });
    },
    getWinningNumbers: function (count) {
        return this.requestLotto((resolve, body) => {
            var winningNumbers = this.requestWinning(body);

            if (count) {
                var counted = [];
                var numbers = this.splitWinning(winningNumbers);

                numbers.forEach(number => {
                    var results = counted.filter(item => {
                        return item.id == number;
                    });

                    if (results.length === 0) {
                        counted.push({
                            id: number,
                            count: 1
                        });
                    } else {
                        results[0].count++;
                    }
                });

                counted.sort((a, b) => {
                    return a.count - b.count;
                });

                return resolve(counted);
            } else {
                return resolve(winningNumbers);
            }
        });
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    generateNumbers: function () {
        return this.requestLotto((resolve, body) => {
            var winningNumbers = this.requestWinning(body);
            var arrayOfNumbers = this.splitWinning(winningNumbers);

            var generatedNumbers = [];

            for (var i = 0; i < 6; i++) {
                var int = this.getRandomInt(0, arrayOfNumbers.length);
                var number = arrayOfNumbers[int];
                while (generatedNumbers.indexOf(number) > -1) {
                    int = this.getRandomInt(0, arrayOfNumbers.length);
                    number = arrayOfNumbers[int];
                }
                generatedNumbers.push(Number(number));
            }

            return resolve(generatedNumbers);
        });
    }
}