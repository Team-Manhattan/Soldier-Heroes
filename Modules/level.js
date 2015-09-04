var level = (function(){
	var level = Object.create({});
	
	Object.defineProperty(level, "checkLevelUp", {
		value: function(user){
			if(user.get("exp") > user.get("level") * 100){
				user.set("level", user.get("level") + 1);
				user.set("exp", 1);
				var armyReward = reward.awardWithArmy(user);
				
				alert("Congratulations! You leveled up.\nYou get a reward: " + armyReward.length + " soldiers");
				
				armyReward = armyReward.concat(user.get("army"));
				user.set("army", armyReward);
				
				user.save()
					.then(function(){
						updateUserInfo(user);
						loadArmy(user.get("army"), '#player-army');
					}, function(err){
						console.log(JSON.stringify(err))
					});
			}
			
		}
	});
	
	return level;
})();