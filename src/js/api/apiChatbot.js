/*
*
*/
const listarChatbots = () => {
    return new Promise(function(respOk,respRech){
        try {
            respOk({}) ;
        } catch(errLC){
            console.dir(errLC) ;
            respRech(errLC) ;
        }
    }) ;
}
//
export const chatbot = {
    list: listarChatbots
} ;
//