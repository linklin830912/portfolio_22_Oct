var dy_mode = "swing";

var isImgGradiant;
initPage();

function initPage(){
    isImgGradiant = true;
    animateH();
    animateImgGradiant();
}
function animateH(){
    let moveX0 = "30pt";

    $(".general_h1").animate({"margin-left": moveX0}, 1000, dy_mode);    
    $(".general_h2").animate({"margin-left": moveX0}, 1000, dy_mode);


}
function animateImgGradiant(){
    let img1_opacity = 0;
    let img2_opacity = 0;
    
    $(window).on("mousemove", function(){
        if(img1_opacity<1){
            img1_opacity = img1_opacity+0.01;
            $("#portrait_img1").css({"opacity": img1_opacity});  
        }else if(img2_opacity<1){
            img2_opacity = img2_opacity+0.01;
            $("#portrait_img2").css({"opacity": img2_opacity});  
        }else{
            isImgGradiant = false;
        }
    });
} 