import { getMouseClickMenu, getMouseMove, getMouseOverMenu, getMouseOverContact} from "./menuStyle.js";
import { getPageSetups, getMouseHover, getPageInputChange, getMouseClickPage } from "./mainStyle.js";
import {getSetupPageList} from "./pageHelper.js"

/* setup for UI */
$(document).ready(function(){
    getSetupPageList();

    getMouseHover();
    getPageSetups();
    getPageInputChange();

    getMouseClickMenu();
    getMouseMove();
    getMouseOverMenu();
    getMouseOverContact();

    getMouseClickPage();
    

    
    $("#about0_button").click();
    updateTime();
    // initPagetrigger();
});

function updateTime() {    
    $("#eye_input").change();
    $("#bio_input").change();
    
    setTimeout(updateTime,200);
}

