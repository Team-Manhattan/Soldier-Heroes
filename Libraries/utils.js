var utils = (function(){
	return {
		generateNumberBetween: function(min,max){
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