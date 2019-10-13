/*
*
*/
const router          = require('express').Router()   ;
const sm              = require('sitemap') ;
//
const sitemapArray = (argObjetoCategoriasMarcas) => {
    let arraySitemap = [] ;
    try {
        //
        let timestampLastMod = String(new Date().toISOString()).substr(0,19)+"+00:00" ;
        arraySitemap = [
            { url: '/'             ,  changefreq: 'weekly' , priority: 0.3 },
            { url: '/productos/'   ,  changefreq: 'daily'  , priority: 0.5 },
            { url: '/sindoh/'      ,  changefreq: 'monthly', priority: 0.7 },
            { url: '/sitemapHtml/' ,  changefreq: 'weekly' , priority: 0.7 },
            { url: '/#contact'     ,  changefreq: 'monthly', priority: 0.7 },
            { url: '/#dondeEstamos',  changefreq: 'monthly', priority: 0.7 }
        ] ;
        //
        let arrayCategorias = Object.values(argObjetoCategoriasMarcas.categorias) ;
        for(let posUrl=0;posUrl<arrayCategorias.length;posUrl++){
            let objUrl = arrayCategorias[posUrl] ;
            arraySitemap.push({
                url: objUrl.url,  changefreq: 'daily'  , priority: 0.8, mobile: true, lastmodISO: timestampLastMod
            }) ;
        }
        //
        let arrayMarcas = Object.values(argObjetoCategoriasMarcas.marcas) ;
        for(let posUrl=0;posUrl<arrayMarcas.length;posUrl++){
            let objUrl = arrayMarcas[posUrl] ;
            arraySitemap.push({
                url: objUrl.url,  changefreq: 'daily'  , priority: 0.8, mobile: true, lastmodISO: timestampLastMod
            }) ;
        }
        //
    } catch(errSit){ console.dir(errSit); }
    return arraySitemap ;
}
//
module.exports = (argObjCatalogoMarcas,argConfiguracion) => {
    const defaultMetatags   = {...argConfiguracion.metaTags.default} ;
    const sitemapArrayObj   = sitemapArray(argObjCatalogoMarcas)     ;
    //
    defaultMetatags.globalTituloPagina = '' ;
    defaultMetatags.globalSitemap = JSON.stringify(sitemapArrayObj) ;
    // defaultMetatags.urlMapping = function(){ return this.url  ; } ;
    //
    const sitemapXml = sm.createSitemap({
        hostname: argConfiguracion.urlEmpresa ,
        cacheTime: 600000,        // 600 sec - cache purge period
        urls: sitemapArrayObj
    }) ;
    //
    router.all('/sitemap', function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        //
        sitemapXml.toXML( function (err, xml) {
            if (err) { return res.status(500).end(); }
            res.header('Content-Type', 'application/xml');
            res.send( xml );
        });
        //
    }) ;
    //
    router.all('/sitemapHtml', function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        //
        res.render( 'app.html', {...defaultMetatags} ) ;
        //
    }) ;
    //
    router.get('/catalogoUrl', function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        //
        res.json( argObjCatalogoMarcas ) ;
        //
    }) ;
    //
    return router ;
    //
} ;