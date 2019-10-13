/*
*
*/
/*
const util             = require('../util').util ;
const apiProductos     = require('./apiProductos').productos ;
*/
import {util}                         from '../util' ;
import {productos as apiProductos}   from './apiProductos' ;
//
export const widgetProductos = ()  => {
    //
    const getlistaProductos = () => {
      return new Promise(function(respProducs,respRej){
          try {
            console.log(new Date().toISOString()+'....(G) ') ;
              apiProductos.get()
                  .then(function(respProdML){
                    console.log(new Date().toISOString()+'....(H) ') ;
                      respProducs( respProdML ) ;
                  })
                  .catch(function(errRech){
                      respRej(errRech) ;
                  }) ;
          } catch(errProd){
              respRej(errProd) ;
          }
      }.bind(this)) ;
    }
    //
    const generaCarouselSlick = (argIdNodo) => {
        //
        return new Promise(function(respGen,respRej){
          //
          console.log(new Date().toISOString()+'....(I) ') ;
          let nodoWidget = document.getElementById(argIdNodo) ;
          if( !nodoWidget ){ throw new Error("nodo: "+nodoWidget+' no existe'); }
          //
          getlistaProductos()
              .then(respDatos => {
                console.log(new Date().toISOString()+'....(J) ') ;
                  return respDatos ;
              })
              .then(function(argThen2){
                console.log(new Date().toISOString()+'....(K) ') ;
                return generaVistaProductos( nodoWidget, argThen2 ) ;
              }.bind(this))
              .then(function(argThen3){
                console.log(new Date().toISOString()+'....(L) ') ;
                return activarCarouselProductos( "portfolio-wrapper" ) ;
              }.bind(this))
              .then(function(argSlickFn){
                console.log(new Date().toISOString()+'....(Ñ) ') ;
                  $("#portfolio-flters li").click(function () {
                    $("#portfolio-flters li").removeClass('filter-active');
                    $(this).addClass('filter-active');
                    var selectedFilter = $(this).data("filter");
                    $("#portfolio-wrapper").fadeTo(100, 0);
                    $(".portfolio-item").fadeOut() ;
                    setTimeout(function () {
                      $('#portfolio-wrapper').slick('slickUnfilter');
                      $('#portfolio-wrapper').slick('slickFilter',selectedFilter);
                      let slickIndice = $(selectedFilter).first().attr('data-slick-index') ;
                      if ( !isNaN(slickIndice) ){
                        $('#portfolio-wrapper').slick('slickGoTo',+slickIndice);
                      }
                      $(selectedFilter).fadeIn(100) ;
                     /*
                      $(selectedFilter).fadeIn(100,function(){
                        $('#portfolio-wrapper').slick('slickGoTo',+slickIndice).fadeIn(100) ;
                      }) ;
                      */
                      $("#portfolio-wrapper").fadeTo(300, 1);
                    }, 300);
                });
                respGen( 'ok' ) ;
                //
              }.bind(this))
              .catch(errGenVista => {
                  console.dir(errGenVista) ;
                  respRej( errGenVista ) ;
              }) ;
              //
        }.bind(this) ) ;
    }
    //
    const generaSlides = (argIdNodo) => {
      return new Promise(function(respGen,respRej){
        //
        console.log(new Date().toISOString()+'....(I) ') ;
        let nodoWidget = document.getElementById(argIdNodo) ;
        if( !nodoWidget ){ throw new Error("nodo: "+nodoWidget+' no existe'); }
        //
        getlistaProductos()
            .then(respDatos => {
              console.log(new Date().toISOString()+'....(J) ') ;
              return respDatos ;
            })
            .then(function(argThen2){
              console.log(new Date().toISOString()+'....(K) ') ;
              return generaVistaProductos( nodoWidget, argThen2, 'lista' ) ;
            }.bind(this))
            .then(function(argThen3){
              console.log(new Date().toISOString()+'....(L) ') ;
              return activarSlidesresponsive( argIdNodo ) ;
            }.bind(this))
            .then(function(argSlickFn){
              console.log(new Date().toISOString()+'....(Ñ) ') ;
                $("#portfolio-flters li").click(function () {
                  $("#portfolio-flters li").removeClass('filter-active');
                  $(this).addClass('filter-active');
                  var selectedFilter = $(this).data("filter");
                  $("#portfolio-wrapper").fadeTo(100, 0);
                  $(".portfolio-item").fadeOut() ;
                  setTimeout(function () {
                    $('#portfolio-wrapper').slick('slickUnfilter');
                    $('#portfolio-wrapper').slick('slickFilter',selectedFilter);
                    let slickIndice = $(selectedFilter).first().attr('data-slick-index') ;
                    if ( !isNaN(slickIndice) ){
                      $('#portfolio-wrapper').slick('slickGoTo',+slickIndice);
                    }
                    $(selectedFilter).fadeIn(100) ;
                   /*
                    $(selectedFilter).fadeIn(100,function(){
                      $('#portfolio-wrapper').slick('slickGoTo',+slickIndice).fadeIn(100) ;
                    }) ;
                    */
                    $("#portfolio-wrapper").fadeTo(300, 1);
                  }, 300);
              });
              respGen( 'ok' ) ;
              //
            }.bind(this))
            .catch(errGenVista => {
                console.dir(errGenVista) ;
                respRej( errGenVista ) ;
            }) ;
            //
      }.bind(this) ) ;
  }
    //
    const generaVistaProductos = (argNodo,objProdCat,argTipoVista='div') => {
      try {
        //
        // Solo para la vista en lista
        let listaUl = document.createElement('ul') ;
        listaUl.id  = (argNodo.id+'_lista').replace('#','').trim() ;
        //
        for( let keyCategoria in objProdCat ){
          //
          let arrayProductos = Object.values(objProdCat[keyCategoria]) ;
          let classCat       = 'filter-'+keyCategoria ;
          //
          arrayProductos.forEach(element => {
              //
              let aEleme   = document.createElement('a') ;
              aEleme.href   = element.urlExterna
              aEleme.target = '_blank' ;
              aEleme.setAttribute('mercadolibreId',element.id) ;
              aEleme.setAttribute('mercadolibretitulo',element.nombre) ;
              aEleme.classList.add('link-producto-widget') ;
              let urlImagen = (element.imagenes && element.imagenes.length>0) ? ( element.imagenes[0].secure_url || element.imagenes[0].url) : element.thumbnail ;
              aEleme.innerHTML = '<img src="'+urlImagen+'" alt="'+element.nombre+'"><div class="details">'/*+ '<h4>'+keyCategoria+'</h4> */
                              +'<span>'+element.nombre+'</span></div>' ;
              //
              let itemElement ;
              switch(argTipoVista){
                case 'div':
                    itemElement = document.createElement('div') ;
                    itemElement.classList.add('col-lg-3','col-md-6','portfolio-item',classCat) ;
                    $(itemElement).append( aEleme ) ;
                    $(argNodo).append( itemElement ) ;
                break ;
                case 'lista':
                    itemElement = document.createElement('li') ;
                    $(itemElement).append( aEleme ) ;
                    $(listaUl).append( itemElement ) ;
                break ;
                default:
              }
              //
          });
          //
        }
        //
        if ( $(listaUl).find('li').length>0 ){
          $(argNodo).append(listaUl) ;
        }
        //
      } catch(errGenVProd){
        throw errGenVProd ;
      }
    }
    //
    const activarCarouselProductos = (argIdNodo) => {
      let outFn = {} ;
      try {
        // Mejora performance Hidden previo al load ???
        $("#"+argIdNodo).css({visibility: 'hidden'}) ;  
        //
      /* Eventos Carousel */
       $("#"+argIdNodo).on('init',function(argEve, slick){
         // Mover Botones de Previo / Siguiente, al final del contenedor
         $("#"+argIdNodo).css({visibility: 'visible'}) ;
         //
         console.log(new Date().toISOString()+'....(Ñ) 222222 ') ;
         $('#'+argIdNodo).append( $('#'+argIdNodo).find('i.slick-arrow') ) ;
         //
          $("#"+argIdNodo+' a[mercadolibretitulo]').click((argEventClick)=>{
            let nodoA = argEventClick.currentTarget ;
            util.enviarEstadisticas('productoVisto',{_id:nodoA.getAttribute('mercadolibreid')||'',titulo:nodoA.getAttribute('mercadolibretitulo')})
              .then(respOk=>{ /* No hago nada */})
              .catch(respErr => {
                console.dir(respErr) ;
                throw respErr ;
              }) ;
          }) ;
          //
        }) ;
        //
        outFn = $("#"+argIdNodo).slick({
          lazyLoad: 'ondemand',
          arrows: true,
          centerMode: true,
          autoplay: true,
          autoplaySpeed: 2500,
          dots: true, // Siempre en 'true' y se elimina por CSS con display: none. Sino se duplican los slides
          rows: 1, slidesToShow: 3,slidesToScroll: 1,slidesPerRow: 3,
          prevArrow: '<i class="slick-prev2 slick-arrow2">Previo</i>',
          nextArrow: '<i class="slick-next2 slick-arrow2">Siguiente</i>',
          infinite: false,
          cssEase: 'linear',
          responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,slidesToScroll: 1
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        }) ;
        //
      } catch(errCarousel){
        throw errCarousel ;
      }
      return outFn ;
    }
    //
    const activarSlidesresponsive = (argIdNodo) => {
      let outFn = {} ;
      try {
        //
        if ( argIdNodo.indexOf('#')==-1 ){ argIdNodo='#'+argIdNodo; }
        let nodoSlide = $(argIdNodo) ;
        console.log('.....tagname: '+$(nodoSlide).prop("tagName")+';') ;
        if ( $(nodoSlide).prop("tagName")!="ul" ){
          nodoSlide = $(nodoSlide).find('ul') ;
        }
        console.log('.......(B) tagname: '+$(nodoSlide).prop("tagName")+';') ;
        //
        outFn = $(nodoSlide).responsiveSlides({
          maxwidth: 800,
          speed: 25000,
          // manualControls: '#slider3-pager',
          pager: true,           // Boolean: Show pager, true or false
          nav: true,             // Boolean: Show navigation, true or false
          random: false,          // Boolean: Randomize the order of the slides, true or false
          pause: false,           // Boolean: Pause on hover, true or false
          pauseControls: true,    // Boolean: Pause when hovering controls, true or false
          prevText: "Previous",   // String: Text for the "previous" button
          nextText: "Next",       // String: Text for the "next" button
          maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
          navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
          manualControls: "",     // Selector: Declare custom pager navigation
          namespace: "rslides",   // String: Change the default namespace used
          before: function(){},   // Function: Before callback
          after: function(){}     // Function: After callback
        });
        //
      } catch(errCarousel){
        throw errCarousel ;
      }
      return outFn ;
    }
    //
    const generaVistaGaleria = (argIdGaleria,argTipoProductos) => {
      return new Promise(function(respGen,respRej){
        //
        console.log(new Date().toISOString()+'....(I) argTipoProductos: '+argTipoProductos+';') ;
        let nodoWidget = $(document).find(argIdGaleria) ;
        if( !nodoWidget ){ throw new Error("Id Galeria: "+argIdGaleria+' No existe'); }
        //
        getlistaProductos()
            .then(respDatos => {
              console.log(new Date().toISOString()+'....(J) ') ;
              return respDatos ;
            })
            .then(function(datosProductos){
              console.log(new Date().toISOString()+'....(K) ') ;
              return cargaProductosGaleria( nodoWidget, datosProductos[argTipoProductos]||{} ) ;
            }.bind(this))
            .then(function(argSlickFn){ respGen( 'ok' ) ; }.bind(this))
            .catch(errGenVista => {
                console.dir(errGenVista) ;
                respRej( errGenVista ) ;
            }) ;
            //
      }.bind(this) ) ;
    }
    //
    const cargaProductosGaleria = (argNodo,argDatos)  => {
      try {
        //
        $(argNodo).empty() ;
        //
        let pagina   = 1 ;
        let contador = 0 ;
        let flagHide = false ;
        for( let keyProducto in argDatos ){
          contador++ ;
          if ( contador>10 ){
            contador = 0 ;
            let aSeguir   = document.createElement('a') ;
            $(aSeguir).attr('href','#') ;
            $(aSeguir).attr('pagina',String(pagina)) ;
            $(aSeguir).attr('siguientePagina',String((pagina+1))) ;
            if ( flagHide==true ){ $(aSeguir).hide(); }
            $(aSeguir).addClass('mas-productos col-12').append('<span>Más productos</span>') ;
            $(aSeguir).click((argEventClick)=>{
              let aTarget = argEventClick.target ;
              argEventClick.preventDefault() ;
              let filtroSig   = '[pagina='+ ($(aTarget).attr('siguientePagina')||$(aTarget).parent().attr('siguientePagina')) +']' ;
              let divAmostrar = $(argNodo).find(filtroSig) ;
              $(divAmostrar).fadeIn( 3000, function(){
                $(divAmostrar).show() ;
              });
              $(aTarget).hide() ;
            }) ;
            $(argNodo).append( aSeguir ) ;
            pagina++ ;
            if ( flagHide==false ){ flagHide=true; }
          }
          //
          let objProducto = argDatos[keyProducto] ;
          let estadoProd  = objProducto.atributos.find(elemAttr => { return elemAttr.id=='ITEM_CONDITION' ; }) || {value_name:'Nuevo'};
          let divProductoGaleria = htmlProductoGaleria( objProducto, estadoProd.value_name ) ;
          $(divProductoGaleria).attr('pagina',String(pagina)) ;
          if ( flagHide==true ){ $(divProductoGaleria).hide() ; }
          $(argNodo).fadeIn(3000, function(){
            $(argNodo).append( divProductoGaleria ) ;
          });
          //
        }
      } catch(errGenVProd){
        throw errGenVProd ;
      }
    }
    //
    const htmlProductoGaleria = (argProducto,estadoPRod) => {
      let outDiv ;
      try {
        outDiv = document.createElement('div') ;
        $(outDiv).addClass('col-md-3 col-sm-6 mb-3') ;
        let htmlIn = '<div class="product-grid"><div class="product-image"><a href="#">'
                +' <img class="pic-1" src="'+argProducto.imagenes[0].secure_url+'"> '
                +' <img class="pic-2" src="'+(argProducto.imagenes.length>1 ? argProducto.imagenes[1].secure_url : argProducto.imagenes[0].secure_url)+'"> '
                +' </a><ul class="social"><li> '
                +' <a href="'+argProducto.urlExterna+'" data-tip="Ampliar" target="_blank"> '
                +' <i class="fa fa-search"></i></a></li><li><a href="" data-tip="Me gusta"><i class="fa fa-shopping-bag"></i></a></li> '
                +' <li><a href="" data-tip="Agregar al carrito"><i class="fa fa-shopping-cart"></i></a></li> </ul> '
                +' <span class="product-new-label">'+estadoPRod+'</span> </div> '
                +' <ul class="rating"> <li class="fa fa-star"></li><li class="fa fa-star"></li><li class="fa fa-star"></li><li class="fa fa-star"></li><li class="fa fa-star disable"></li></ul> '
                +' <div class="product-content"> '
                +' <h3 class="title"><a href="#">'+argProducto.nombre+'</a></h3> '
                +' <div class="price">$'+argProducto.base_price+'</div><a class="add-to-cart" href="">+ Agregar a carrito</a></div></div>';
        $(outDiv).append( htmlIn ) ;
      } catch(htmlProd){ throw htmlProd; }
      return outDiv ;
    }
    //
    const initMasonry = (argSel1,argSel2) => {
      try {
        //
        console.log('...argSel1: '+argSel1+' 222: '+argSel2+';');
        $(argSel1).masonry({
          itemSelector: argSel2,
          columnWidth: 100
        });
        //
      } catch(iniMas){
        throw iniMas ;
      }
    }
    //
    return {
        generaSlides: generaSlides,
        generaCarouselSlick: generaCarouselSlick,
        generaVistaGaleria: generaVistaGaleria
    } ;
    //
}
//
//module.exports.widgetProductos = widgetProductos ;
//export default widgetProductos ;
//