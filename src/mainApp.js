/*
*
*/
import React, { Suspense }                 from "react"      ;
import ReactDOM                            from "react-dom"  ;
import { BrowserRouter as Router, Route }  from 'react-router-dom'   ;
import { Layout, Skeleton  }               from 'antd';
//
// import Encabezado                         from "./js/componentes/Encabezado" ;
import PiePagina                          from "./js/componentes/PiePagina"  ;
import {NoEncontrado404}                  from "./js/componentes/cuerpoPagina/NoEncontrado404"  ;
import SitemapCuerpo                      from "./js/componentes/cuerpoPagina/SitemapCuerpo"    ;
// import { CuerpoInicio }                   from "./js/componentes/cuerpoPagina/CuerpoInicio"  ;
import { CuerpoAbout  }                   from "./js/componentes/cuerpoPagina/CuerpoAbout"   ;
import { CuerpoPrices }                   from "./js/componentes/cuerpoPagina/CuerpoPrices"  ;
// import ChatbotHome                        from "./js/componentes/chat/ChatbotHome" ;
import FormContacto                       from "./js/componentes/formularios/FormContacto" ;
import { ErrorBoundary }                  from "./js/componentes/util/ErrorHandler" ;
//
import { languageLocale }                 from "./js/utils/utiles" ;
//
import configApp                         from "./config/configApp.json" ;
//
const  { Content }   = Layout ;
//
import 'antd/dist/antd.css' ;
import './css/estilos.css' ;
import './css/estilosContacto.css' ;
import './css/estilosAnimaciones.css' ;
//
//
const getComponent = Component => props => (
  <Suspense fallback={ <Skeleton active  paragraph={{ rows: 1 }}  /> }>
      <Component {...props} />
  </Suspense>
);
const EncabezadoLazy = getComponent( React.lazy( ()=> import('./js/componentes/Encabezado'))       ) ;
const ChatbotWindow  = getComponent( React.lazy( ()=> import('./js/componentes/chat/ChatbotHome')) ) ;
const HomePage       = getComponent( React.lazy( ()=> import('./js/componentes/cuerpoPagina/CuerpoInicio')) ) ;
//
export class App extends React.Component {
  constructor(props){
    super(props) ;
    this.state = {
      isMobile: (window.innerWidth<797) ,
      translate: languageLocale()
    } ;
    this.onchangeLanguage = this.onchangeLanguage.bind(this)
    // this.translate = languageLocale() ;
  }
  //
  onchangeLanguage(argNewLang){
    let newLangg = typeof argNewLang=="string" ? argNewLang : argNewLang.key ;
    this.setState({ translate: languageLocale(newLangg) }) ;
  }
  //
  render() {
    //
    configApp.isMobile = this.state.isMobile ;
    //
    return (
      <Layout id="waiboc-main-node"  style={{ background: '#fff',padding: '0' }}>
          <Router>
            <EncabezadoLazy translate={this.state.translate} onchangeLanguage={this.onchangeLanguage} />
            <ChatbotWindow />
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <Route exact path="/"                            component={() =>        <HomePage      translate={this.state.translate} configuracion={configApp}   />}  />
              <Route exact path="/about"                       component={(argMach) => <CuerpoAbout   translate={this.state.translate} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/contact"                     component={(argMach) => <FormContacto  translate={this.state.translate} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/error"                       component={(argMach) => <CuerpoAbout   translate={this.state.translate} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/services"                    component={(argMach) => <CuerpoAbout   translate={this.state.translate} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/prices"                      component={(argMach) => <CuerpoPrices  translate={this.state.translate} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/404"                         component={(argMach) => <NoEncontrado404  translate={this.state.translate} configuracion={configApp} {...argMach} />}  />
            </Content>
            <PiePagina translate={this.state.translate} configuracion={configApp} />
          </Router>
      </Layout>
    )
  }
  //
};
//
ReactDOM.render( <ErrorBoundary><App /></ErrorBoundary> , document.getElementById("app") );
//