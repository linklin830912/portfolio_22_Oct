var dy_mode = 'swing';

imgAnimation();

function imgAnimation(){
    $("#uiux1_img").animate({opacity: 0}, 200, dy_mode);
    $("#uiux1_img").animate({opacity: 0.5}, 500, dy_mode);
    $("#uiux1_img").animate({opacity: 0.8}, 500, dy_mode);
    $("#uiux1_img").animate({opacity: 0}, 100, dy_mode);
}