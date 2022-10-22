
var date = new Date();
var currentMonth = date.getMonth()+1;
var currentYear = date.getFullYear();
var startWorkmYear = 2020;
var startFromWorkMonth = 9;
var chartTotalSpan = calculateDate(startWorkmYear, startFromWorkMonth, currentYear, currentMonth);
var chartElements = $(".chart_element_div");
var rowCount = chartElements.length + 1;

var displayChartIndex = 0;

var displaywidth = 800;
var displayend = -3200;


var canvasWidth = replaceUnit($(".form_skill_canvas").attr("width"));
var canvasheight = replaceUnit($(".form_skill_canvas").attr("height"));
var lineWidth0 = 1;
var lineWidth1 = 0.5;
var lineWidth2 = 0.3;
var main_color0 = $(":root").css("--main_color0");
var main_color1 = $(":root").css("--main_color1");
var main_color2 = $(":root").css("--main_color2");


createChart();
mouseMoveBlockChange();
createSkillGraph();

function createChart(){

    let occupyList = [];
    
    
    chartElements.each((index, element) => {

        let id = $(element).attr('id');
        let val = $("#" + id + " .chart_block_div").text();

        let result = readChartDateValue(val);
        let columnValue = result.start +" / span  "+ result.span;

        let rowValueCaption = rowCount+occupyList.filter(x => x === result.start).length ;
        let rowValueBlock = index + 1 ;
        let rowSpan = rowValueCaption-rowValueBlock;
        let rowValue = rowValueBlock + " / span  " + rowSpan;

        $(element).css({            
            "grid-column": columnValue,
            "grid-row": rowValue
        });

        occupyList.push(result.start);

    });

}
function readChartDateValue(rawdata){
    let data = rawdata.split("-");
    let end = data[0].split(".");
    if(end == "current"){
        end = (currentMonth+"."+currentYear).split(".");
    }
    let start = data[1].split(".");

    let endmonth = end[0];
    let endyear = end[1];
    let startmonth = start[0];
    let startyear = start[1];

    let st = calculateDate(startWorkmYear, startFromWorkMonth, startyear, startmonth);
    let sp = calculateDate(startyear, startmonth, endyear, endmonth);
    // remeber to reverse
    let result = {
        start: chartTotalSpan-(sp+st)+1,
        span: sp
    }

    return result
}
function calculateDate(startY, startM, endY, endM){
    return (12*parseInt(endY)+parseInt(endM))-(12*parseInt(startY)+parseInt(startM));
}

function mouseMoveBlockChange(){
    
    chartElements.each((index, element) => {
        var chart_element_div = $(element);

        chart_element_div.on('mouseenter', mouseEnterEvent);
        chart_element_div.on('mouseleave', mouseLeaveEvent);
      
    });


}
        

function mouseEnterEvent(){
    var id = $(this).attr("id");
    
    var index = id.split('_')[1];
    index = index.replace("element", "");
    index = parseInt(index);
    displayChartIndex  = index;
    var chart_block_div = $("#" + id + " .chart_block_div");
    var chart_guideline_div = $("#" + id + " .chart_guideline_div");
    var chart_point_div = $("#" + id + " .chart_point_div");
    var chart_caption_div = $("#" + id + " .chart_caption_div");
    
    mouseEnterAnimate(chart_block_div, chart_guideline_div, chart_point_div, chart_caption_div);
}
function mouseEnterAnimate(block, guideline, point, caption){

    $(block).css("opacity", 1);

    let secSlow = 100;
    let secfast = 50;

    $(block).animate({
        "top": "2pt"
    }, secfast , dy_mode);
    
    $(guideline).animate({
        "opacity": 1,
        "height": "105%"
    }, secSlow, dy_mode);
    $(point).animate({
        "opacity": 1,
        "top": "105%"
    }, secSlow, dy_mode);
    $(caption).animate({
        "opacity": 1,
        "top": "105%"
    }, secSlow, dy_mode);
    
    $(guideline).animate({
        "opacity": 1,
        "height": "85%"
    }, secSlow, dy_mode);
    $(point).animate({
        "opacity": 1,
        "top": "85%"
    }, secSlow, dy_mode);
    $(caption).animate({
        "opacity": 1,
        "top": "85%"
    }, secSlow, dy_mode);

    var moveTo = -displayChartIndex*900
    $(".form_element_div").animate({"left": moveTo+"pt"}, 500, dy_mode);
}


function mouseLeaveEvent(){
    var id = $(this).attr("id");
    
    var index = id.split('_')[1];
    index = index.replace("element", "");
    index = parseInt(index);
    displayChartIndex  = index;
    var chart_block_div = $("#" + id + " .chart_block_div");
    var chart_guideline_div = $("#" + id + " .chart_guideline_div");
    var chart_point_div = $("#" + id + " .chart_point_div");
    var chart_caption_div = $("#" + id + " .chart_caption_div");
    
    mouseLeaveAnimate(chart_block_div, chart_guideline_div, chart_point_div, chart_caption_div);
    
}
function mouseLeaveAnimate(block, guideline, point, caption){
    let secfast = 50;

    $(block).css("opacity", 0.8);
    $(block).animate({
        "top": 0
    }, secfast , dy_mode);

    $(guideline).animate({
        "opacity": 1,
        "height": "95%"
    }, secfast , dy_mode);
    $(point).animate({
        "opacity": 1,
        "top": "95%"
    }, secfast , dy_mode);
    $(caption).animate({
        "opacity": 1,
        "top": "95%"
    }, secfast , dy_mode);
}

function createSkillGraph(){

    let form_skill_div = $(".form_skill_div");

    form_skill_div.each((index, element) => {

        let value = $(element).attr("value");
        let id = $(element).attr("id");

        let canvas = $("#"+id+" .form_skill_canvas")[0];       
        var ctx = canvas.getContext('2d');

        if (canvas.getContext) {
            let marginY = 30;
            let marginX = (canvasWidth-canvasheight)*0.5+marginY;
            
            let centerX = canvasWidth*0.5;
            let centerY = canvasheight*0.5;
            let maxRadias = canvasheight*0.5-marginY;

            ctx.lineWidth = lineWidth1;
            // horizontal line
            
            ctx.moveTo(marginX, centerY);
            ctx.lineTo(marginX+maxRadias*2, centerY);
            drawSkillGraphArrow(ctx, marginX+maxRadias*2, centerY, marginX, centerY);
            // vertical line
            ctx.moveTo(centerX, marginY);
            ctx.lineTo(centerX, marginY+maxRadias*2);
            drawSkillGraphArrow(ctx, centerX, marginY, centerX, marginY+maxRadias*2);
            ctx.stroke();
            
            // circle
            ctx.moveTo(centerX, centerY);
            ctx.lineWidth = lineWidth2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadias*0.75, 0, Math.PI * 2, true);
            ctx.fillStyle = main_color2
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadias*0.5, 0, Math.PI * 2, true);
            ctx.fillStyle = main_color1
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadias*0.25, 0, Math.PI * 2, true);            
            ctx.fillStyle = main_color0
            ctx.fill();

            //text 
            ctx.save();
            let pt = [15, centerY+5]      
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-1*pt[0], -1*pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillText('design', pt[0], pt[1]);
            ctx.restore();

            ctx.save();   
            pt = [centerX+maxRadias+15, centerY+5]          
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillText('tech', pt[0], pt[1]);
            ctx.restore();

            ctx.save();    
            pt = [centerX-10, marginY+10]         
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillText('hard', pt[0], pt[1]);
            ctx.restore();

            ctx.save();   
            pt = [centerX+10, centerY+maxRadias+5]         
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillText('soft', pt[0], pt[1]);
            ctx.restore();

            ctx.save();   
            pt = [centerX+18, centerY+maxRadias+25]         
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillText('skill', pt[0], pt[1]);
            ctx.restore();
        }
    });
    
}

function drawSkillGraphArrow(cx, p0x, p0y, p1x, p1y){
    let lnth = Math.sqrt((p0x - p1x)*(p0x - p1x)+(p0y - p1y)*(p0y - p1y))*0.1;
    let vv = [(p0x - p1x)/lnth, (p0y - p1y)/lnth];
    let vh = [(p0y - p1y)/lnth, (p0x - p1x)/lnth];

    cx.moveTo(p0x, p0y);
    cx.lineTo(p0x-vv[0]+vh[0]*0.5, p0y-vv[1]+vh[1]*0.5);
    cx.moveTo(p0x, p0y);
    cx.lineTo(p0x-vv[0]-vh[0]*0.5, p0y-vv[1]-vh[1]*0.5);
    cx.moveTo(p0x, p0y);    
}

function replaceUnit(value){
    return parseInt(value.replace('px',''));
}