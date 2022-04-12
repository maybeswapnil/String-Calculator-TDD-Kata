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

});

function StringCalculator(){
  
}

StringCalculator.prototype.add = function(stringNumbers) {

    if(stringNumbers.length===0) return 0;

};
