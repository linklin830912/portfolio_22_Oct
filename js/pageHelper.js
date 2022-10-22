export function getSetupPageList(){
    setupPageList();
}
export function getAssignContent(id){
    return assignContent(id);
}
export function getSelectFileType(folder){
    return selectFileType(folder);
}
export function getDefaultPage(id){
    return defaultPage(id);
}
// export function getTriggerReload(initFnc, slideNm){
//     initFunction = initFnc;
//     slideName = slideNm;
//     $("#trigger_button").click(triggerReload);
// }

let allPageIds = [];
let allButtonToPage = {};
let defaultClickPage = {};

function setupPageList(){
    $("#about_div button").each((index, child) => {        
        let id = $(child).attr("id");
        let pageId = $(child).attr("value");
        if(pageId!=null){            
            decodePageId(id, pageId);
        }
    });
    $("#portfolio_div button").each((index, child) => {
        let id = $(child).attr("id");
        let pageId = $(child).attr("value");
        if(pageId!=null){            
            decodePageId(id, pageId);
        }
    });
}
function decodePageId(id, pageId){   
    let result = pageId.split("_");
    let folder = result[0];
    let prefix = result[1];
    let indexFrom = result[2];
    let indexTo = result[3];
    let fileType = selectFileType(folder);
    defaultClickPage["./"+folder+"/"+prefix+indexFrom+fileType] = id;
    for(let i=parseInt(indexFrom); i<parseInt(indexTo)+1; i++){
        allPageIds.push("./"+folder+"/"+prefix+i+fileType);
    }
}
function selectFileType(folder){
    let type = ".html";
    if(folder.includes("image")){
        type = ".jpg";
    }

    return type;
}

function assignContent(id){

    let formerIndex;
    let currentIndex = allPageIds.indexOf(id);
    let nextIndex;

    if(currentIndex>=0){
        if(currentIndex+1<=allPageIds.length-1){
            nextIndex = currentIndex+1;
        }

        if(currentIndex-1>=0){
            formerIndex = currentIndex-1;
        }
    };


    return {
        former_page: allPageIds[formerIndex],
        current_page: id,
        next_page: allPageIds[nextIndex]
    }
}
function defaultPage(id){
    if(defaultClickPage[id]!=null){
        return defaultClickPage[id];
    }
}

