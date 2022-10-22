initPage();


var dy_mode = "swing";

function initPage(){
    $("#portrait_img8").css("top", "-1000pt");
    $("#portrait_img6").css("top", "-1000pt");
    $("#portrait_img5").css("opacity", 0);
    $("#portrait_img4").css("transform", "scale(10)"); 
    // $("#portrait_img4").css("transform-origin:", "-100% -100%");


    $("#portrait_img8").animate({"top": "150pt"}, 500, dy_mode);    
    $("#portrait_img6").animate({"top": "0pt"}, 500, dy_mode).promise().then(
        function(){
            $("#portrait_img5").animate({"opacity": 1}, 500, dy_mode);
            $("#portrait_img5").animate({"opacity": 0}, 500, dy_mode);
        }
    );

    $("#portrait_img4").animate({ deg: 90 }, {
        step: function(now,fx) {
            $(this).css('transform','rotate('+now+'deg)');            
        },
        duration: 10
    },dy_mode);
    $("#portrait_img4").animate({ deg: 0 }, {
        step: function(now,fx) {
          $(this).css('transform','rotate('+now+'deg)');
        },
        duration: 1000
    },dy_mode);

    $(".quote_div").animate({"left" : "30pt"}, 500, dy_mode); 
}