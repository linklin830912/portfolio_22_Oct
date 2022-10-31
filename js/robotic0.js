mouseOnVideoAnimation();

function mouseOnVideoAnimation(){
    $(".robotic_video").on("mouseenter", mouseEnterVideo);
    $(".robotic_video").on("mouseleave", mouseLeaveVideo);
}
function mouseEnterVideo(){
    let id = $(this).attr("id");
    let element = $("#"+id)[0];
    
    element.currentTime = 0;
    element.play();
}
function mouseLeaveVideo(){
    let id = $(this).attr("id");
    let element = $("#"+id)[0];
    
    element.pause();
}