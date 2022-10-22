export function removeUnit(myString, unitlength){ 
    return myString.slice(0, myString.length-unitlength);
}

export const opacity = {
    opacity0: $(":root").css('--opacity0'),
    opacity1: $(":root").css('--opacity1'),
    opacity2: $(":root").css('--opacity2'),
    opacity3: $(":root").css('--opacity3'),
}
