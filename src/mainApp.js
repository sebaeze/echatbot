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
import configApp                         from "./config/configApp.json" ;
//
const  { Content }   = Layout ;
//
import 'antd/dist/antd.css' ;
import './css/estilos.css' ;
//
export class App extends React.Component {
  constructor(props){
    super(props) ;
    this.state = {
      isMobile: (window.innerWidth<797)
    }
  }
  //
  componentDidMount(){
    try {
      window.addEventListener("resize",function(argEventSCR){
        this.setState({isMobile: (window.innerWidth<797)});
      }.bind(this)) ;
    } catch(errCDM){
      console.dir(errCDM) ;
    }
  }
  //
  render() {
    //
    configApp.isMobile = this.state.isMobile ;
    //
    return (
      <Layout style={{ background: '#fff',padding: '0' }}>
          <Encabezado translate={{...languageLocale()}} />
          <Router>
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <Route exact path="/"                      component={() =>        <CuerpoInicio translate={{...languageLocale()}} configuracion={configApp}   />}  />
              <Route exact path="/contacto"              component={(argMach) => <FormContacto translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/nosotros"              component={(argMach) => <CuerpoAbout  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
            </Content>
          </Router>
          <WhatsappLink configuracion={configApp} />
          <PiePagina translate={{...languageLocale()}} />
      </Layout>
    )
  }
  //
};
//
ReactDOM.render( <App />, document.getElementById("app") );
//