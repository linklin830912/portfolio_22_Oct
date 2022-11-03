var dy_mode = "swing";
var moveIndex = -1;
var rect;
var rect0;
var rect1;

mouseOnVideoAnimation();
mouseOnCanvasAnimation();

function mouseOnVideoAnimation(){
    $(".robotic_video").on("mouseenter", mouseEnterVideo);
    $(".robotic_video").on("mouseleave", mouseLeaveVideo);
}
function mouseEnterVideo(){
    let id = $(this).attr("id");
    $("#"+id).css("filter", "grayscale(0%)");

    let element = $("#"+id)[0];    
    
    element.currentTime = 0;
    element.play();
}
function mouseLeaveVideo(){
    let id = $(this).attr("id");
    $("#"+id).css("filter", "grayscale(80%)");

    let element = $("#"+id)[0];

    element.pause();
}

function mouseOnCanvasAnimation(){
    rect0 = $("#ui0_canvas")[0].getBoundingClientRect();
    rect1 = $("#ui1_canvas")[0].getBoundingClientRect();

    $(".ui_img").on("mouseenter", miniMouseEnter);
    $(".ui_img").on("mousemove", miniMouseMove);
}
function miniMouseEnter(){
    let id = $(this).attr("id");
    if(id.includes("0")){
        rect = {
            "left": rect0.left-10,
            "top": rect0.top-60
        };
    }else if(id.includes("1")){
        rect = {
            "left": rect1.left+20,
            "top": rect1.top-180
        };
    }
}

function miniMouseMove(){
    let id = $(this).attr("id");
    let canvasId = id.replace("img", "canvas");
    let canvas = $("#"+canvasId);
     
    canvas.css("left", event.clientX-rect.left);
    canvas.css("top", event.clientY-rect.top);
    
}
function updateTimer(){
    setInterval(() => {
        
    }, interval);
}
