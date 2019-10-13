/*
*
*/
import React                               from "react"      ;
import ReactDOM                            from "react-dom"  ;
import { BrowserRouter as Router, Route }  from 'react-router-dom'   ;
import { Layout  }                         from 'antd';
//
import Encabezado                         from "./js/componentes/Encabezado" ;
import PiePagina                          from "./js/componentes/PiePagina"  ;
import {WhatsappLink}                     from "./js/componentes/WhatsappLink"  ;
import NoEncontrado404                    from "./js/componentes/NoEncontrado404"  ;
import SitemapCuerpo                      from "./js/componentes/SitemapCuerpo"    ;
import CuerpoInicio                       from "./js/componentes/CuerpoInicio" ;
import { CuerpoAbout }                    from "./js/componentes/CuerpoAbout"  ;
import {CuerpoDistribuidores}             from "./js/componentes/CuerpoDistribuidores"     ;
import FormContacto                       from "./js/componentes/formularios/FormContacto" ;
//
import { languageLocale }                 from "./js/utils/utiles" ;
//
import configJson                         from "./config/configApp.json" ;
//
const  { Content }   = Layout ;
//
import 'antd/dist/antd.css' ;
import './css/estilos.css' ;
//
export const App = () =>{
  return (
    <Layout style={{ background: '#fff',padding: '0' }}>
        <Encabezado translate={{...languageLocale()}} />
        <Router>
          <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
            <Route exact path="/"                      component={() =>        <CuerpoInicio translate={{...languageLocale()}} configuracion={configJson}   />}  />
            <Route exact path="/contacto"              component={(argMach) => <FormContacto translate={{...languageLocale()}} configuracion={configJson} {...argMach} />}  />
            <Route exact path="/nosotros"              component={(argMach) => <CuerpoAbout  translate={{...languageLocale()}} configuracion={configJson} {...argMach} />}  />
          </Content>
        </Router>
        <WhatsappLink configuracion={configJson} />
        <PiePagina translate={{...languageLocale()}} />
    </Layout>
  )
};
//
ReactDOM.render( <App className="container-fluid" />, document.getElementById("app") );
//