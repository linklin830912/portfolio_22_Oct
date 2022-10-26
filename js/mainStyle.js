import {getAssignContent, getSelectFileType, getDefaultPage } from "./pageHelper.js";

export function getPageSetups(){
    slicePage("./image/thesis8.jpg");    
}
export function getMouseHover(){
    $(".page_button").on("mouseover", mouseOverPage);
    $(".page_button").on("mouseleave", mouseLeavePage);
}
export function getPageInputChange(){
    $("#page_input").on("change", pageInputChange);
}
export function getMouseClickPage(){
    $(".page_button").on("click", mouseClickPage);
}

//dy_mode
export const dy_mode = 'swing';

//load page
let mainImgWidth;



//hover on page
function mouseOverPage(){
    let id = $(this).attr("id");
    let parent = $(this).parent();
    let parentId = parent.attr("id");

    $("#"+id).animate({opacity: 1}, 200, dy_mode);
    if(parentId.includes("0")){
        $("#"+parentId).animate({"padding-left": "10pt",
            width: "-=10pt"}, 200, dy_mode);
    }else{
        $("#"+parentId).animate({"padding-right": "10pt",
            width: "-=10pt"}, 200, dy_mode);
    }
    
}
function mouseLeavePage(){
    let id = $(this).attr("id");
    let parent = $(this).parent();
    let parentId = parent.attr("id");

    $("#"+id).animate({opacity: 0}, 200, dy_mode);
    if(parentId.includes("0")){
        $("#"+parentId).animate({"padding-left": "0pt",
            width: "+=10pt"}, 200, dy_mode);
    }else{
        $("#"+parentId).animate({"padding-right": "0pt",
            width: "+=10pt"}, 200, dy_mode);
    }
}

//mouse click page
let currentContent;

function pageInputChange(){
    //pageValue = select_button id
    let pageValue = $("#page_input").attr("value");    
    
    if(pageValue != null){
        swapContentDivHtml(pageValue);        
    }
    
}
function swapContentDivHtml(pageValue){
    let buttonValue = $("#"+pageValue).attr("value");
    let result = buttonValue.split("_");
    let slideOrContent = result[0];
    switch(slideOrContent){
        case "image":
            //contnet
            
            imageToContent(buttonValue);

            break;
        case "html":
            //slide
            
            htmlToSlide(buttonValue);

            break;
    }
    
}
function imageToContent(value){
        let result = value.split("_");
        let folder = result[0];
        let prefix = result[1];
        let indexFrom = result[2];
        let indexTo = result[3];
        let fileType = getSelectFileType(folder);
       
        let url = "./"+folder+"/"+prefix+indexFrom+fileType;
        // currentContent = url;
        slicePage(url);
}
function slicePage(url){
    if(url !=null){
        currentContent = url;
        $(".page_img").css("opacity", 1);
        $("#slide_div").css("opacity", 0);

        $('#page0_img').on('load', loadImageReady);
        $('#page0_img')[0].src = url;
        $('#page1_img')[0].src = url;
    }    
}
function loadImageReady(){
    mainImgWidth = $('#page0_img')[0].width*0.5;    
    $(".page_div").css("width", mainImgWidth);
}
function htmlToSlide(value){
    let result = value.split("_");
        let folder = result[0];
        let prefix = result[1];
        let indexFrom = result[2];
        let indexTo = result[3];
        let fileType = getSelectFileType(folder);
       
        let url = "./"+folder+"/"+prefix+indexFrom+fileType;
        // currentContent = url;

        loadSlide(url);
}
function loadSlide(url){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            $("#page2_div").html(this.responseText);      
        }
        currentContent = url;
        $(".page_img").css("opacity", 0);
        $("#slide_div").css("opacity", 1);

        let slideId = $(".include_div").attr("id");
        // getTriggerReload('initFunction', slideId);
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    
}

// click on page
function mouseClickPage(){
    let id = $(this).attr("id");
    let result = getAssignContent(currentContent);

    if(id.includes("1")){        
        // next page
        let defaultPage = getDefaultPage(result.next_page);
        if(defaultPage!=null){
            $("#"+defaultPage).click();
        }else{
            switch(decodeUrl(result.next_page)){
                case "image":
                    slicePage(result.next_page);
                    break;
                case "html":
                    loadSlide(result.next_page);
                    break;
            }
        }
    }else{
        //former page
        let defaultPage = getDefaultPage(result.former_page);
        if(defaultPage!=null){
            $("#"+defaultPage).click();
        }else{     
            switch(decodeUrl(result.former_page)){
                case "image":
                    slicePage(result.former_page);
                    break;
                case "html":
                    loadSlide(result.former_page);
                    break;
            }
        }
        
        
    }
}
function decodeUrl(url){
    if(url!=null){
        let result = url.split("/");
        let contentOrSlide = result[1];
        return contentOrSlide;
    }    
};

