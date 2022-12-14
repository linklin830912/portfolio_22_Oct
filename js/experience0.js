
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
var background_color0 = $(":root").css("--backgroud_color0");

var unitRadias = 42;

drawIndicateCanvas();
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
    let collectskillData = collectSkillData();
    let form_skill_div = $(".form_skill_div");

    form_skill_div.each((index, element) => {

        let id = $(element).attr("id");
        let value = $(element).attr("value");
        let skilllist = "#form_skilllist"+index+"_div";
        createSkillListhtml(skilllist, value);

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
            ctx.arc(centerX, centerY, unitRadias*3, 0, Math.PI * 2, true);
            ctx.fillStyle = main_color1
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX, centerY, unitRadias*2, 0, Math.PI * 2, true);
            ctx.fillStyle = main_color1
            ctx.fill();
            ctx.beginPath();
            ctx.arc(centerX, centerY, unitRadias*1, 0, Math.PI * 2, true);            
            ctx.fillStyle = main_color1
            ctx.fill();

            //geo
            //new skill
            let selectskillData = selectSkillData(index);
            let pts = getAllPoints(collectskillData, selectskillData);

            ctx.beginPath();
            pts.forEach((pt) => {
                ctx.moveTo(centerX+pt.x, centerY-pt.y);
                ctx.arc(centerX+pt.x, centerY-pt.y, 4, 0, Math.PI * 2, true);
                ctx.fillStyle = main_color0;
                ctx.fill();
                ctx.moveTo(centerX+pt.x, centerY-pt.y);
                ctx.lineTo(centerX, centerY);
                ctx.strokeStyle = main_color0;
                ctx.stroke();
            });
            //old skill
            selectskillData = selectSkillData(index+1);
            pts = getAllPoints(collectskillData, selectskillData);

            ctx.beginPath();
            pts.forEach((pt) => {
                ctx.moveTo(centerX+pt.x, centerY-pt.y);
                ctx.arc(centerX+pt.x, centerY-pt.y, 4, 0, Math.PI * 2, true);
                ctx.fillStyle = background_color0;
                ctx.fill();
                ctx.moveTo(centerX+pt.x, centerY-pt.y);
                ctx.lineTo(centerX, centerY);
                ctx.strokeStyle = background_color0;
                ctx.stroke();
            });

            //text 
            ctx.save();
            let pt = [15, centerY+5]      
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-1*pt[0], -1*pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillStyle = main_color0
            ctx.fillText('design', pt[0], pt[1]);
            ctx.restore();

            ctx.save();   
            pt = [centerX+maxRadias+15, centerY+5]          
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillStyle = main_color0
            ctx.fillText('tech', pt[0], pt[1]);
            ctx.restore();

            ctx.save();    
            pt = [centerX-10, marginY+10]         
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillStyle = main_color0
            ctx.fillText('hard', pt[0], pt[1]);
            ctx.restore();

            ctx.save();   
            pt = [centerX+10, centerY+maxRadias+5]         
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillStyle = main_color0
            ctx.fillText('soft', pt[0], pt[1]);
            ctx.restore();

            ctx.save();   
            pt = [centerX+18, centerY+maxRadias+25]         
            ctx.translate(pt[0], pt[1]);
            ctx.rotate((Math.PI / 180) * -65);
            ctx.translate(-pt[0], -pt[1]);
            ctx.font = "12pt " +  $(":root").css("--font_family0");
            ctx.fillStyle = main_color0
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
function collectSkillData(){
    let names = [];
    let counts = [];
    let locations = [];

    $(".form_skill_div").each((index, element) => {
        let value = $(element).attr("value");
        let data = value.split(",");
        data.forEach(item => {
            let result = item.split("/");
            let name = result[0];
            let location = result[1];
            if(names.includes(name)){
                counts[names.indexOf(name)]++;
            }else{
                
                names.push(name);
                counts.push(1);
                locations.push(parseInt(location));
            }
        });
    });

    let angle0 = Math.PI*0.5/(locations.filter(x => x === 0).length+1);
    let angle1 = Math.PI*0.5/(locations.filter(x => x === 1).length+1);
    let angle2 = Math.PI*0.5/(locations.filter(x => x === 2).length+1);
    let angle3 = Math.PI*0.5/(locations.filter(x => x === 3).length+1);
    let angleType = [angle0, angle1, angle2, angle3];
    
    let angles = [];
    
    for(let i = 0; i < locations.length; i++){
        
        let name = names[i];
        let location = locations[i];
        let count = counts[i];

        let samelocations = locations.slice(0, i).filter(x => x === location).length;
        let angle = Math.PI*0.5*location+(samelocations+1)*angleType[location];
        angles.push(angle);
    }

    return {
        names: names,
        counts: counts,
        locations: locations,
        angles: angles
    };

}
function selectSkillData(divIndex){
    let names = [];
    let counts = [];

    $(".form_skill_div").each((index, element) => {
        if(index >= divIndex){
            let value = $(element).attr("value");
            let data = value.split(",");
            data.forEach(item => {
                let result = item.split("/");
                let name = result[0];
                if(names.includes(name)){
                    counts[names.indexOf(name)]++;
                }else{
                    
                    names.push(name);
                    counts.push(1);
                }
            });
        }        
    });

    return {
        names: names,
        counts: counts
    };
}
function getAllPoints(collectResult, selectResult){

    let pts = [];
    
    for(let i = 0; i < selectResult.names.length; i++){
        
        let index = collectResult.names.indexOf(selectResult.names[i]);
        let count = selectResult.counts[i];      
        let angle = collectResult.angles[index]
        
        pt = {
            x: Math.cos(angle)*unitRadias*count,
            y: Math.sin(angle)*unitRadias*count
        }
        
        pts.push(pt);
    }

    return pts;
}
function createSkillListhtml(skilllst, val){
    let data = val.split(",");
    data = new Set(data);

    data.forEach(item => {
        let result = item.split('/');
        $(skilllst).append("<div>"+result[0]+"</div>");
    });
}

function drawIndicateCanvas(){
    //point to button robot
    $(".indicate_div").html('');
    $(".indicate_div").html('<canvas class="indicate_canvas" width="500" height="1000"></canvas>');

    let canvas = $(".indicate_canvas")[0];
    let ctx = canvas.getContext('2d');    

    let targetButton = $("#portfolio0_button");
    let page = $("#page0_button");
    
    let targetButtonWidth = targetButton.outerWidth(true);
    let targetButtonPosition =targetButton.offset();
    let targetButtonTop = targetButtonPosition.top;
    let targetButtonLeft = targetButtonPosition.left;

    let targetPagePosition = page.offset();
    let targetPageTop = targetPagePosition.top;
    let targetPageLeft = targetPagePosition.left;
    
    let stPt = [targetButtonLeft+targetButtonWidth*0.9,targetButtonTop+30];
    let pt0 = [stPt[0]+70,stPt[1]-50];      
    let endPt = [targetPageLeft-10,targetPageTop+200];
    let pt1 = [endPt[0]-120,endPt[1]+50];

    let vec0 = createVector(20, 25);
    let vec1 = createVector(70, 50);
    let vec2 = createVector(150, 50);
    let vec3 = createVector(160, 50);

    ctx.moveTo(stPt[0],stPt[1]);
    ctx.bezierCurveTo(stPt[0]+vec0.x,stPt[1]+vec0.y,pt0[0]-vec1.x, pt0[1]-vec1.y, pt0[0], pt0[1]);
    ctx.bezierCurveTo(pt0[0]+vec1.x, pt0[1]+vec1.y, pt1[0]-vec2.x, pt1[1]-vec2.y, pt1[0], pt1[1]);
    ctx.bezierCurveTo(pt1[0]+vec2.x, pt1[1]+vec2.y, endPt[0]+vec3.x,endPt[1]+vec3.y, endPt[0], endPt[1]);

    let vec4 = createVector(45, 30);
    let vec5 = createVector(340, 30);


    ctx.moveTo(stPt[0], stPt[1]);
    ctx.lineTo(stPt[0]+vec4.x, stPt[1]+vec4.y);
    ctx.moveTo(stPt[0], stPt[1]);
    ctx.lineTo(stPt[0]+vec5.x, stPt[1]+vec5.y);

    ctx.setLineDash([8, 3]);
    ctx.lineWidth = 0.5;
    ctx.lineCap = "round";
    ctx.stroke();

    //text 
    ctx.save();
    ctx.moveTo(pt1[0],pt1[1]);
    ctx.translate(pt1[0],pt1[1]);
    ctx.rotate((Math.PI/180)*(160+180));
    ctx.translate(-pt1[0],-pt1[1]);
    ctx.font = "16pt " +  $(":root").css("--font_family0");
    ctx.fillStyle = main_color0
    ctx.fillText('click', pt1[0]+30, pt1[1]-35);
    ctx.restore();

    $(".indicate_canvas").animate({
        "opacity": 1,
        "z-index":10000
    }, 10 , dy_mode);

    $(".indicate_canvas").animate({
        "opacity": 1,
        "z-index":10000
    }, 2000 , dy_mode);
    $(".indicate_canvas").animate({
        "opacity": 0,
        "z-index":-10000
    }, 100 , dy_mode);
}
function replaceUnit(value){
    return parseInt(value.replace('px',''));
}
function createVector(angle, length){
    return {
        x: Math.cos(angle*Math.PI/180)*length,
        y: -Math.sin(angle*Math.PI/180)*length
    }
}