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

});

function StringCalculator(){
  
}

StringCalculator.prototype.add = function(stringNumbers) {
    //1st: if nothing is passed as an argument
    if(stringNumbers.length===0) return 0;
    //3rd: for converting '\n' into ','
    if(stringNumbers.indexOf("\n") !== -1) stringNumbers = stringNumbers.replace(/\n/g, ",")
    //2nd: for unknown number of arguments seperated by ','
    if(stringNumbers.indexOf(',') !== -1) return parseInt(stringNumbers.split(',').reduce((a, b) => parseInt(a) + parseInt(b)));

};
