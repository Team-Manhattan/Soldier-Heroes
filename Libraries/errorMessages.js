var errorMessages = (function(){
    var nameLength = 'Length of name must be between' + constants.MIN_NAME_LENGTH + ' and ' + constants.MAX_NAME_LENGTH;
    
    return {
        undefined : 'Value cannot be undefined',
        spaces: 'Spaces are not allowed',
        lengthOfName: nameLength,
        lengthOfPassword: 'Length of password must be between' + constants.MIN_PASSWORD_LENGTH + 'and ' +constants.MAX_PASSWORD_LENGTH,
        lengthOfID: 'Length of ID must be' + constants.LENGTH_OF_ID ,
        passWordConstraints: `Password must contain letters of upper and lower case and digits!`,
        notANumber: `The value is not a digit!`,
        zeroLevel: `Level can't be zero!`,
        wrongMoney: `Money must be => 0!`
    }
})();
    