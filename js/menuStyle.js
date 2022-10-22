import {removeUnit, opacity} from "./helper.js"

export function getMouseClickMenu(){
    $(".select_button").on("click", mouseClickMenu);
}
export function getMouseMove(){
    $(window).on("mousemove", mouseMove);
    $("#eye_input").on("change", mouseWatch);
}
export function getMouseOverMenu(){
    $(".select_button").on("mouseover", mouseOverMenu);
    $(".select_button").on("mouseleave", mouseLeaveMenu);    
}
export let onPage;



/*set up for menu*/
//<mouse dynamic>
let dy_mode = 'swing';
let eyeX = $("#lead_canvas").offset().left;
let eyeY;
let eyeCountX = 0;
let eyeCountY = 0;
let eyeHeight = removeUnit($(".select_button").css("height"), 2);
let eyeClosePer = 0.1;

//<mouse click>
var moveSection = moveObject(15, 0, 0, 0);
var moveButton = moveObject(5, 5, 0, 0);


function moveObject (x0, x1, y0, y1) {
    return {
        right: x0+"pt",
        left: x1+"pt",
        bottom: y0+"pt",
        top: y1+"pt"
    }
}
function mouseClickMenu(){
   
    var clickItem = $(this);
    var id = clickItem.attr("id");
    var parent = clickItem.parent();

    // this will trigger the main !!!
    onPage = id;
    $("#page_input").attr("value", onPage);
    $("#page_input").change();

    /* parent section_div */
    $(".menu_container_div").each((index, element) => {
        if(element['id'] != parent[0]['id']){
            $(element).animate({
                "padding-left": moveSection.right,
                opacity: opacity.opacity1
            }, 50, dy_mode);
        }else{
            $(element).animate({
                "padding-left": moveSection.left, 
                opacity: opacity.opacity3
            }, 50, dy_mode);
        }
    });

    /* parent select_button */
    $(".select_button").each((index, element) => {
        if(element['id'] != id){
            $(element).animate({ "padding-left": moveButton.right, 
            opacity: moveButton.opacity1 }, 30, dy_mode)
        }else{
            $(element).animate({ "padding-left": moveButton.left, 
            opacity: moveButton.opacity3 }, 30, dy_mode)
        }
    });

    eyeY = clickItem.offset().top+eyeHeight*0.5*0.5;
    $(window).off('mousemove');
    eyeMove();
    eyeBlink();
    $(window).on("mousemove", mouseMove);
}

// mouse move on menu
function mouseOverMenu(){
    var id = $(this).attr("id");
    $("#"+id).animate({opacity: opacity.opacity3
    }, 10, dy_mode);
}
function mouseLeaveMenu(){
    var id = $(this).attr("id");
    $("#"+id).animate({opacity: opacity.opacity2
    }, 10, dy_mode);
}

//mouse move on window
let mouseX0;
let mouseY0;
let mouseX1;
let mouseY1;
function mouseMove(){
    mouseX0 = event.clientX;
    mouseY0 = event.clientY;
}
function mouseWatch(){
    if(mouseX0==mouseX1 && mouseY0==mouseY1){
        //mouse not moving
        eyeNotWatch();
    }else{
        //mouse move
        eyeWatch();

        mouseX1 = mouseX0;
        mouseY1 = mouseY0;
    }
}


// private eye motions
function eyeMove(){
    $("#eye_canvas").animate({"top": eyeY}, 60, dy_mode);
    $("#side_canvas").animate({"top": eyeY}, 60, dy_mode);
}
function eyeBlink(){
    $("#lead_canvas").animate({"top": eyeY-eyeHeight*eyeClosePer}, 200, dy_mode);
    $("#lead_canvas").animate({"top": eyeY-eyeHeight*(1-eyeClosePer)}, 200, dy_mode);
    $("#lead_canvas").animate({"top": eyeY-eyeHeight*eyeClosePer}, 200, dy_mode);
    $("#lead_canvas").animate({"top": eyeY-eyeHeight*(1-eyeClosePer)}, 200, dy_mode);
    $("#lead_canvas").animate({"top": eyeY-eyeHeight*1}, 1, dy_mode);
}

function eyeWatch(){
    
    let eyeWatchDistanceMax = 5;
    let eyeMoveDistanceUnit = 1;
    let watchX;
    let watchY;

    if(mouseX1-eyeX>0){
        eyeCountX = eyeCountX+1; 
    }else if(mouseX1-eyeX==0){
        eyeCountX = 0;
    }else{
        eyeCountX = eyeCountX-1; 
    }
    if(eyeCountX*eyeMoveDistanceUnit>eyeWatchDistanceMax){
        watchX=eyeWatchDistanceMax
    }else if(eyeCountX*eyeMoveDistanceUnit < -1*eyeWatchDistanceMax){
        watchX = -1*eyeWatchDistanceMax
    }else{
        watchX = eyeCountX*eyeMoveDistanceUnit
    }

    if(mouseY1-eyeY>0){
        eyeCountY = eyeCountY+1; 
    }else if(mouseY1-eyeY==0){
        eyeCountY = 0;
    }else{
        eyeCountY = eyeCountY-1; 
    }
    if(eyeCountY*eyeMoveDistanceUnit>eyeWatchDistanceMax){
        watchY=eyeWatchDistanceMax
    }else if(eyeCountY*eyeMoveDistanceUnit < -1*eyeWatchDistanceMax){
        watchY = -1*eyeWatchDistanceMax
    }else{
        watchY = eyeCountY*eyeMoveDistanceUnit
    }

    $("#eye_canvas").animate({"left": watchX+eyeX}, 0.001, dy_mode);
    $("#eye_canvas").animate({"top": watchY+eyeY}, 0.001, dy_mode);  
}
function eyeNotWatch(){
    let eyeWatchDistanceMax = 5;
    let eyeMoveDistanceUnit = 1;
    let watchX;
    let watchY;

    if(eyeCountX>0){
        eyeCountX = eyeCountX-1; 
    }else if(eyeCountX==0){
        eyeCountX = 0;
    }else{
        eyeCountX = eyeCountX+1; 
    }
    if(eyeCountX*eyeMoveDistanceUnit>eyeWatchDistanceMax){
        watchX=eyeWatchDistanceMax
    }else if(eyeCountX*eyeMoveDistanceUnit < -1*eyeWatchDistanceMax){
        watchX = -1*eyeWatchDistanceMax
    }else{
        watchX = eyeCountX*eyeMoveDistanceUnit
    }

    if(eyeCountY>0){
        eyeCountY = eyeCountY-1; 
    }else if(eyeCountY==0){
        eyeCountY = 0;
    }else{
        eyeCountY = eyeCountY+1; 
    }
    if(eyeCountY*eyeMoveDistanceUnit>eyeWatchDistanceMax){
        watchY=eyeWatchDistanceMax
    }else if(eyeCountY*eyeMoveDistanceUnit < -1*eyeWatchDistanceMax){
        watchY = -1*eyeWatchDistanceMax
    }else{
        watchY = eyeCountY*eyeMoveDistanceUnit
    }
    
    $("#eye_canvas").animate({"left": watchX+eyeX}, 0.001, dy_mode);
    $("#eye_canvas").animate({"top": watchY+eyeY}, 0.001, dy_mode); 
}



