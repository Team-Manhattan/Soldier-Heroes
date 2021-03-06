var AI = (function(){
	var AI = Object.create({});
	
	Object.defineProperty(AI, "generateEnemyArmy", {
		value: function(currentUser){
			var currentArmy = [],
				armyLength = currentUser.get("level") * currentUser.get("level") * 5;
				
			for(var i = 0; i < armyLength; i+=1) {
				var randomNumber = utils.generateNumberBetween(1, 4);
				if(randomNumber%(i+1) == 0){
					currentArmy.push(createSoldierByType(constants.medic));
				}
				else if(randomNumber%(i+1) == 1) {
					currentArmy.push(createSoldierByType(constants.pistol));
				}
				else if(randomNumber%(i+1) == 2) {
					currentArmy.push(createSoldierByType(constants.assaultRifle));
				}
				else if(randomNumber%(i+1) == 3) {
					currentArmy.push(createSoldierByType(constants.sniper));
				}
			}
			
			return currentArmy;
		}
	});
	
	return AI;
})();