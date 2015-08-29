import $ from 'jquery';
import logFunc from  'Modules/loggingForm.js';
import info from 'Modules/loadUserInfo.js';
import factoryPlayer from 'Libraries/player.js';

let storage = window.localStorage;

/*last login data-id is stored in window.localStorage. if last time is logged out
localStore should be empty and login form must appear, else show data from last logged user*/

if (storage.getItem('loggedUser') !== null) {
    /*load module2 - shop*/
    let player = factoryPlayer.getPlayer().createPlayer('PeshoBirata89', 'PEepi89YYY', 1, 1, 250, new Date(2013, 3, 23), []);
    info.showLoggedUserInfo(player);
    /**
     * let idOfLoggedUser = storage.getItem('loggedUser');
     * let user = getRequestFromDBByID(idOfLoggedUser);*/
} else {
    logFunc.log();
}

export default function init() {

}


/*$('<h1 />')
 .text('Loaded!')
 .appendTo('body');*/
