const chai = require('chai')
var expect = chai.expect;

describe("String Calculator",  function(){
    //1st
    var calculator;

    beforeEach(function() {
      calculator = new StringCalculator();
    });

    it("should return zero when '' is passed", function(){
        expect(calculator.add('')).equal(0);
    });
    //2nd
    it("should return the sum of an unknown amount of numbers", function(){
        // creates a random array of input numbers
        randomArray = (length, max) => [...new Array(length)]
        .map(() => Math.round(Math.random() * max));
        // creates a random number between 1 & 100
        rand = Math.floor((Math.random() * 100) + 1);
        res = randomArray(rand,rand);
        sum = res.reduce((pv, cv) => pv+cv, 0);
        // converts the array to a string
        arg = res.join();
        expect(calculator.add(arg)).equal(sum);
    });
    //3rd
    it("should allow \\n in between the input number string", function(){
        expect(calculator.add("1\n2\n3")).equal(6);
    });
    //4th
    it("should allow //[*][%]\\n1*2%3%9 in between the input number string", function(){
        expect(calculator.add("//[*][%]\n1*2%3%9")).equal(15);
    });
    //5th
    it("should not allow negative numbers", function(){
        expect( function(){ calculator.add("-1,2,3"); } ).throw("negatives not allowed");
    });
    //6th
    it("should return the number itself when a single number is passed", function(){
        expect(calculator.add('1')).equal(1);
    });
  
    it("should return the sum of the numbers if two are given", function(){
        expect(calculator.add('1,2')).equal(3);
    });

});

function StringCalculator(){
  
}

StringCalculator.prototype.add = function(stringNumbers) {
    //1st: if nothing is passed as an argument
    if(stringNumbers.length===0) return 0;
    //4th I: deal with delimitter, create reference array
    const numbers = stringNumbers
    .replace(/(\r\n|\n|\r)/gm, ',') // Normalize delimiter
    .split(',')                     // Split values
    .map(n => parseInt(n, 10))      // Convert to integers
    //4th II: replace and remove delimitter and delimitter string respectively
    if(stringNumbers.slice(0, 2) == '//') {
        let delimitter = RegExp(numbers[2], "g") //delimitter: /(?:)/g
        stringNumbers = stringNumbers.replace(stringNumbers.slice(0, 3), "") //remove starting delimitter string
        stringNumbers = stringNumbers.replace(delimitter, ",") //replace delimitter values between the string
    }
    //3rd: for converting '\n' into ','
    if(stringNumbers.indexOf("\n") !== -1) stringNumbers = stringNumbers.replace(/\n/g, ",")
    //5th: check for negetive numbers
    if(numbers.some(n => n < 0)) throw new Error('negatives not allowed')
    //2nd: for unknown number of arguments seperated by ','
    if(stringNumbers.indexOf(',') !== -1) return parseInt(stringNumbers.split(',').filter(i => parseInt(i)<1000).reduce((a, b) => parseInt(a) + parseInt(b))); //changes in 4th commit: added filter\
    //6th: if only one value is passed and above cases are not met
    return parseInt(stringNumbers)
};
