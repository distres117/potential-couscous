export const dataType = (type) =>{
    switch(type){
        case 'SDE TABLE':
            return 3;
        case 'SDE Raster':
            return 2;
        default:
            return 1;
    }
}

export const dataTypeString = (type)=>{
    switch(type){
        case 'table' || 3:
            return 'SDE Table';
        case 'raster' || 2:
            return 'SDE Raster Dataset';
        default:
            return 'SDE Feature Class';
    }
}
export const dataTypeSimple = (type)=>{
    switch(type){
        case 3:
            return 'table';
        case 2:
            return 'raster';
        default:
            return 'feature';
    }
}

export const errorRes = (msg)=>{
    return {
        error:true,
        message: msg
    }
}
