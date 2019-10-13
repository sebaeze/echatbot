/*
*
*/
const fs               = require('fs')    ;
const di               = require('image-downloader') ;
const path             = require('path')  ;
const sharp            = require('sharp') ;
//
const imgDownloadResize = ( argImgObj ) => {
    return new Promise(function(respOk,respRech){
        try {
            di.image( argImgObj )
                .then((respDowndl)=>{
                    return sharp( argImgObj.dest )
                        .resize( {width:1080} )
                        .toFile( argImgObj.destResize )
                })
                .then((respResize)=>{
                    respOk(respResize) ;
                })
                .catch((errDownl)=>{
                    respRech(errDownl) ;
                }) ;
        } catch(errid){
            respRech(errid) ;
        }
    }) ;
}
//
let arrayUrlImg = [
    {
      "dest": "A400-Front.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A400-Front.jpg"
    },
    {
      "dest": "A400-Front2.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A400-Front2.jpg"
    },
    {
      "dest": "A400%20Side2.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A400%20Side2.jpg"
    },
    {
      "dest": "A610(1).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A610(1).jpg"
    },
    {
      "dest": "A610(2).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A610(2).jpg"
    },
    {
      "dest": "A611%20Front%20Picture.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A611%20Front%20Picture.jpg"
    },
    {
      "dest": "A611_2.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/A611_2.jpg"
    },
    {
      "dest": "D202%20OP%20Panel(Korean).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20OP%20Panel(Korean).jpg"
    },
    {
      "dest": "D202%20OP%20Panel_side(Korean).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20OP%20Panel_side(Korean).jpg"
    },
    {
      "dest": "D202%20front(Chinese).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20front(Chinese).jpg"
    },
    {
      "dest": "D202%20front(Korean).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20front(Korean).jpg"
    },
    {
      "dest": "D202%20front_without%20ADF(Korean).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20front_without%20ADF(Korean).jpg"
    },
    {
      "dest": "D202%20%20overlook(Korean).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20%20overlook(Korean).jpg"
    },
    {
      "dest": "D202%20right%20side(Chinese).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20right%20side(Chinese).jpg"
    },
    {
      "dest": "D202%20right%20side(Korean).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/D202%20right%20side(Korean).jpg"
    },
    {
      "dest": "M400(Left%20side).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M400(Left%20side).jpg"
    },
    {
      "dest": "M401(Right%20side).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M401(Right%20side).jpg"
    },
    {
      "dest": "M401%20picture.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M401%20picture.jpg"
    },
    {
      "dest": "M403_front.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M403_front.jpg"
    },
    {
      "dest": "M403_side.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M403_side.jpg"
    },
    {
      "dest": "M611(1).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M611(1).jpg"
    },
    {
      "dest": "M611(2).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M611(2).jpg"
    },
    {
      "dest": "M612_front.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/M612_front.jpg"
    },
    {
      "dest": "N701%20702%20LCD%20Image.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/N701%20702%20LCD%20Image.jpg"
    },
    {
      "dest": "N701%20702%20Rear%20side.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/N701%20702%20Rear%20side.jpg"
    },
    {
      "dest": "N701%20702%20front(basic).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/N701%20702%20front(basic).jpg"
    },
    {
      "dest": "N701%20702%20front%20tray(basic).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/N701%20702%20front%20tray(basic).jpg"
    },
    {
      "dest": "N701%20702%20option%20trays.jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/N701%20702%20option%20trays.jpg"
    },
    {
      "dest": "N701%20702%20side(Basic).jpg",
      "url": "http://sindohmiddleeast.com/Sindoh-Documents/Pictures/N701%20702%20side(Basic).jpg"
    }
  ] ;
//
// let arrayUrlImg  = new Array( arrayUrlImgAll[0] ) ;
let arrayPromises = [] ;
let arrayCarousel = [] ;
for(let i=0;i<arrayUrlImg.length;i++){
    let imgOption = arrayUrlImg[i] ;
    let strUrl           = imgOption.dest.substr(0,4)+'_'+i+'.jpg' ; // (imgOption.dest.substr(4,1)=="_" ? imgOption.dest.substr(4,)) ;
    let strDesc          = imgOption.dest.substr(0,4)+'_'+i ;
    imgOption.dest       = path.join(__dirname,'./imagenes/no_resize_'+strUrl) ;
    imgOption.destResize = path.join(__dirname,'./imagenes/resize_1080_'+strUrl) ;
    //
    arrayCarousel.push({
        img:'/img/carousel/'+strUrl,
        titulo: strDesc,
        descripcion: strDesc
    }) ;
    /*
    imgOption.img          = '/img/carousel/'+strUrl ;
    imgOption.titulo       = imgOption.dest.substr(0,4)+'_'+i ;
    imgOption.descripcion  = imgOption.dest.substr(0,4)+'_'+i ;
    */
    //
    console.log('....i: '+i+' dest: '+imgOption.dest+';') ;
    /*
    arrayPromises.push(
        // di.image( imgOption )
        imgDownloadResize( imgOption )
    ) ;
    */
}
console.dir(arrayCarousel) ;
//
Promise.all( arrayPromises )
    .then((respAll)=>{
        console.log('....finnn ') ;
        console.dir(arrayCarousel) ;
    })
    .catch((errAll)=>{
        console.dir(errAll) ;
        console.log('....ERROR: en promise all ') ;
    }) ;
//