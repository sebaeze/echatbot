/*
*
*/
import React, {Component}    from 'react' ;
import '../../css/estilosSitemap.css'   ;
//
class SitemapCuerpo extends Component {
    constructor(props){
        super(props);
        this.urlMapping = [] ;
    }
    //
    componentDidMount(){}
    //
    render(){
        let objSecciones = {} ;
        return(
            //
            <main id="main">
                <section id="galeria">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="header-bg" ></div>
                            <h1 className="title w-100 text-center mt-3 font-weight-bold"><u></u></h1>
                        </div>
                        <div className="row">
                        <ul className="ul-con-bullet">
                        {
                            GLOBAL_SITEMAP.map((elemUrlObj)=>{
                                let elemUrl      = elemUrlObj.url ;
                                if ( elemUrl=="/" ){ elemUrl="/Inicio"; }
                                let tempArrayUrl = elemUrl.split("/") ;
                                if ( tempArrayUrl[(tempArrayUrl.length-1)].length==0 ){ tempArrayUrl.splice(-1,1); }
                                let tempName     = tempArrayUrl[(tempArrayUrl.length-1)].replace("#","") ;
                                tempName         = tempName.substr(0,1).toUpperCase() + tempName.substr(1).toLowerCase() ;
                                if ( tempArrayUrl.length>2 ){
                                    if ( !objSecciones[tempArrayUrl[1]] ){
                                        objSecciones[tempArrayUrl[1]] = true ;
                                        return <div key={elemUrl}><li className="text-weight-bold"><u>{tempArrayUrl[1]}</u></li><br/><a  className="ml-5" href={elemUrl}>{tempName}</a><br/></div> ;
                                    } else {
                                        return <div key={elemUrl}><a  className="ml-5" href={elemUrl}>{tempName}</a><br/></div> ;
                                    }
                                } else {
                                    return <li key={elemUrl}><a href={elemUrl}>{tempName}</a></li> ;
                                }
                            })
                        }
                        </ul>
                        </div>
                    </div>
                </section>
            </main>
            //
        ) ;
    }
    //
}
//
export default SitemapCuerpo ;
//