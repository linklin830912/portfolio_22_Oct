var dy_mode = "swing";
mouseOnVideoAnimation();

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
