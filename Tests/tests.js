describe("Utils", function(){
	it("Expect generateNumberBetween(1,10) to return number equal or bigger than 1 and less than or equal to 10", function(){
		var randomNumber = utils.generateNumberBetween(1,10),
			isGraterOrEqualTo1 = randomNumber >= 1,
			isLessThanOrEqualTo10 = randomNumber <= 10;
			
		var isCorrectNumber = isGraterOrEqualTo1 && isLessThanOrEqualTo10;
		
		expect(isCorrectNumber).to.be.true;
	});
	it("Expect generateNumberBetween(null, 5) to throw", function(){
		var incorrectNumber = function(){
			utils.generateNumberBetween(null,5);
		}
		expect(incorrectNumber).to.throw();
	});
	it("Expect generateNumberBetween(20) to throw", function(){
		var incorrectNumber = function(){
			utils.generateNumberBetween(10)
		};
		
		expect(incorrectNumber).to.throw();
	});
});