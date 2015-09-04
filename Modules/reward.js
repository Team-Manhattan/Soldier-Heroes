var reward = (function(){
	var reward = Object.create({});
	
	Object.defineProperty(reward, "awardWithArmy", {
		value: function(user){
			var armyLength = utils.generateNumberBetween(10, (user.get("level") + 1) * 10),
				currentArmy = [];
			
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
	
	Object.defineProperty(reward, "awardWithGold", {
		value: function(user){
			
						
			return currentArmy;
		}
	});
	
	
	
	return reward;
})();