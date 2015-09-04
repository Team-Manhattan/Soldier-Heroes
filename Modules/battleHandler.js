var battleHandler = (function(){
	var battleHandler = Object.create({});
	
	Object.defineProperty(battleHandler, "attackWithUserPistols", {
		value: function(userArmy, enemyArmy){
			userArmy.forEach(function(soldier){
				if(soldier._type == constants.pistol && enemyArmy.length > 0){
					var randomNumber = utils.generateNumberBetween(0, enemyArmy.length - 1),
						enemySoldier = enemyArmy[randomNumber],
						dmgDone = soldier.damage - (soldier.accuracy / 10) - enemySoldier.defence;
					enemySoldier.hitPoints -= dmgDone > 0 ? dmgDone : 3;
				}
			}
		)
	}});
	
	Object.defineProperty(battleHandler, "attackWithUserSnipers", {
		value: function(userArmy, enemyArmy){
			userArmy.forEach(function(soldier){
				if(soldier._type == constants.sniper && enemyArmy.length > 0){
					var randomNumber = utils.generateNumberBetween(0, enemyArmy.length - 1),
						enemySoldier = enemyArmy[randomNumber],
						dmgDone = soldier.damage - (soldier.accuracy / 10) - enemySoldier.defence;
					enemySoldier.hitPoints -= dmgDone > 0 ? dmgDone : 5;
				}
			}
		)
	}});
	
	Object.defineProperty(battleHandler, "attackWithUserAssaultRifles", {
		value: function(userArmy, enemyArmy){
			userArmy.forEach(function(soldier){
				if(soldier._type == constants.assaultRifle && enemyArmy.length > 0){
					var randomNumber = utils.generateNumberBetween(0, enemyArmy.length - 1),
						enemySoldier = enemyArmy[randomNumber],
						dmgDone = soldier.damage - (soldier.accuracy / 10) - enemySoldier.defence;
					enemySoldier.hitPoints -= dmgDone > 0 ? dmgDone : 3;
				}
			}
		)
	}});
	
	Object.defineProperty(battleHandler, "healWithUserMedics", {
		value: function(userArmy){
			userArmy.forEach(function(soldier){
				if(soldier._type == constants.medic){
					userArmy.forEach(function(soldierToHeal){
						soldierToHeal.hitPoints += 0.5;
					})
				}
			}
		)
	}});
	
	Object.defineProperty(battleHandler, "removeDeadSoldiers", {
		value: function(army){
			for(var i = 0 ; i < army.length; i+=1){
				if(army[i].hitPoints <= 0){
					army.splice(i, 1);
					i -= 1;
				}
			}
			
			return army;
		}
	});
	
	Object.defineProperty(battleHandler, "awardUser", {
		value: function(user){
			var award = {
				exp: Math.floor(user.get("level") * utils.generateNumberBetween(1, user.get("level")+4) * 5),
				money: Math.floor(user.get("level") * utils.generateNumberBetween(5,50))
			}
			
			user.set("exp", user.get("exp") + award.exp);
			user.set("money", user.get("money") + award.money);
			user.save();
			
			return award;
		}
	});
	
	Object.defineProperty(battleHandler, "punishUser", {
		value: function(user){
			var award = {
				exp: Math.floor(user.get("level") * utils.generateNumberBetween(1, user.get("level"))),
				money: Math.floor(user.get("level") * 2)
			}
			
			user.set("exp", user.get("exp") - award.exp);
			user.set("money", user.get("money") - award.money);
			user.save();
			
			return award;
		}
	});
	
	return battleHandler;
})();