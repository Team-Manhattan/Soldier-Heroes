var AI = (function(){
	var AI = Object.create({});
	
	Object.defineProperty(AI, "generateEnemyArmy", {
		value: function(currentUser){
			var currentArmy = [],
				armyLength = currentUser.get("level") * 10;
				
			for(var i = 0; i < armyLength; i+=1) {
				if(armyLength%(i+1) == 0){
					currentArmy.push(createSoldierByType(constants.medic));
				}
				else if(armyLength%(i+1) == 1) {
					currentArmy.push(createSoldierByType(constants.pistol));
				}
				else if(armyLength%(i+1) == 2) {
					currentArmy.push(createSoldierByType(constants.assaultRifle));
				}
				else if(armyLength%(i+1) == 3) {
					currentArmy.push(createSoldierByType(constants.sniper));
				}
			}
			
			return currentArmy;
		}
	});
	
	return AI;
})();