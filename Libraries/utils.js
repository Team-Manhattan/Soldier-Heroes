var utils = (function(){
	return {
		generateNumberBetween: function(min,max){
			if(min == null || max == null){
				throw new Error("Parameters shouldn't be null");
			}
			
			if(arguments.length < 2){
				throw new Error("Need 2 numbers ");
			}
			
			var num = Math.floor(Math.random()*(max-min+1)+min);
			if(num == -1){
				return 0;
			}
			else {
				return num;
			}
		}
	}
})();