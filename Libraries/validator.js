import errorMessages from './errorMessages.js';
import constants from './constants.js';

let patternSpaces = new RegExp('/\s+/', 'g');
let patternDigits = new RegExp('[0-9]', 'g');
let patternLettersLowercase = new RegExp('[a-z]', 'g');
let patternDigitsUpperCase = new RegExp('[A-Z]', 'g');

export default {
    validateCorrectStringName: function (value) {
        "use strict";
        if (!value) {
            throw new Error(errorMessages.undefined);
        }

        if (patternSpaces.test(value)) {
            throw new Error(`${errorMessages.spaces} in name.`);
        }

        if (value.length < constants.MIN_NAME_LENGTH || constants.MAX_NAME_LENGTH < value.length) {
            throw new Error(errorMessages.lengthOfName);
        }
    },

    validateCorrectPassword: function (value) {
        "use strict";
        if (patternSpaces.test(value)) {
            throw new Error(`${errorMessages.spaces} in password!`);
        }

        if (value.length < constants.MIN_PASSWORD_LENGTH || constants.MAX_PASSWORD_LENGTH < value.length) {
            throw new Error(errorMessages.lengthOfPassword);
        }

        let isCorrectPassword =
            patternDigits.test(value) &&
            patternLettersLowercase.test(value) &&
            patternDigitsUpperCase.test(value);

        if (!isCorrectPassword) {
            throw new Error(errorMessages.passWordConstraints);
        }
    },

    correctID: function (value) {
        "use strict";
        if (value.length !== constants.LENGTH_OF_ID) {
            throw new Error(errorMessages.lengthOfID);
        }
    },

    isAllDigits: function (value) {
        "use strict";
        for (let i = 0, len = value.length; i < len; i += 1) {
            if (isNaN(value[i])) {
                throw new Error(errorMessages.notANumber);
            }

            /*if (!(patternDigits.test(value[i]))) {
                OMG false, true, false, true... JS
                throw new Error(errorMessages.notANumber);
            }*/
        }
    },

    positiveNumber: function (value) {
        "use strict";
        /*value - 0 = Number, not a string!*/
        if ((value - 0) <= 0) {
            throw new Error(errorMessages.zeroLevel);
        }
    },

    correctArray: function (value) {
        "use strict";
        if (!Array.isArray(value)) {
            throw new Error();
        }
    }

};
