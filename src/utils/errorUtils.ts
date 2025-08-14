export const getErrorMessage = (error: any) => {
    switch(error.name){
        case 'ValidationError':
            return Object.values(error.errors as object)[0].message;
        default:
            return error.message;
    }
}