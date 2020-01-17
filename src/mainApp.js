/*
*
*/
import React                               from "react"      ;
import ReactDOM                            from "react-dom"  ;
import { BrowserRouter as Router, Route }  from 'react-router-dom'   ;
import { Layout  }                         from 'antd';
//
import { Encabezado }                     from "./js/componentes/Encabezado" ;
import PiePagina                          from "./js/componentes/PiePagina"  ;
import {NoEncontrado404}                  from "./js/componentes/cuerpoPagina/NoEncontrado404"  ;
import SitemapCuerpo                      from "./js/componentes/cuerpoPagina/SitemapCuerpo"    ;
import { CuerpoInicio }                   from "./js/componentes/cuerpoPagina/CuerpoInicio"  ;
import { CuerpoAbout  }                   from "./js/componentes/cuerpoPagina/CuerpoAbout"   ;
import { CuerpoPrices }                   from "./js/componentes/cuerpoPagina/CuerpoPrices"  ;
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
        // this.setState({isMobile: (window.innerWidth<797)});   <---- Esto genera re-render sarpado
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
      <Layout id="waiboc-main-node"  style={{ background: '#fff',padding: '0' }}>
          <Encabezado translate={{...languageLocale()}} />
          <Router>
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <Route exact path="/"                      component={() =>        <CuerpoInicio  translate={{...languageLocale()}} configuracion={configApp}   />}  />
              <Route exact path="/about"                 component={(argMach) => <CuerpoAbout   translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/contact"               component={(argMach) => <FormContacto  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/error"                 component={(argMach) => <CuerpoAbout   translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/services"              component={(argMach) => <CuerpoAbout   translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/prices"                component={(argMach) => <CuerpoPrices  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/404"                   component={(argMach) => <NoEncontrado404  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
            </Content>
          </Router>
          <PiePagina translate={{...languageLocale()}} configuracion={configApp} />
      </Layout>
    )
  }
  //
};
//
ReactDOM.render( <App />, document.getElementById("app") );
//