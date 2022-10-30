export function getButterfly(){
    

}


function createButterfly(width, height){

}
function createOctPoint(width, height){
    let centerX = width / 2;
    let centerY = height / 2;

    let pts = []
    for(i=0; i<8; i++){
        var pt = movePtByVecAndAngle(centerX, centerY , i*45, 20)
        pts.push(pt);
    }

    return pts;
}
function movePtByVecAndAngle(x, y, angle, length){
    angle = Math.PI * angle/180;
    let point = {
        x: x + Math.cos(angle)*length,
        y: y + Math.sin(angle)*length
    }
    return point;
}