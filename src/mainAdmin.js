/*
*
*/
import React, { Suspense }                 from "react"      ;
import ReactDOM                            from "react-dom"  ;
import { BrowserRouter as Router, Route }  from 'react-router-dom'   ;
import { Layout, Skeleton }                from 'antd';
//
// import { Encabezado }                      from "./js/componentes/Encabezado" ;
import PiePagina                           from "./js/componentes/PiePagina"  ;
import { NoEncontrado404 }                 from "./js/componentes/cuerpoPagina/NoEncontrado404"  ;
import { CuerpoLogin   }                   from "./js/componentes/cuerpoPagina/CuerpoLogin"  ;
import { CuerpoCuenta  }                   from "./js/componentes/cuerpoPagina/CuerpoCuenta" ;
import { CuerpoTrain   }                   from "./js/componentes/cuerpoPagina/CuerpoTrain" ;
import { CuerpoEditBot }                   from "./js/componentes/cuerpoPagina/CuerpoEditBot" ;
import { CuerpoReset }                     from "./js/componentes/cuerpoPagina/CuerpoReset"   ;
//
import { languageLocale }                  from "./js/utils/utiles" ;
import configApp                           from "./config/configApp.json" ;
//
import 'antd/dist/antd.css' ;
import './css/estilos.css'  ;
import './css/estilosContacto.css' ;
import './css/estilosAnimaciones.css' ;
//
const  { Content }   = Layout ;
const getComponent   = Component => props => (
  <Suspense fallback={ <Skeleton active  paragraph={{ rows: 1 }}  /> }>
      <Component {...props} />
  </Suspense>
);
const EncabezadoLazy = getComponent( React.lazy( ()=> import('./js/componentes/Encabezado'))       ) ;
//
export class App extends React.Component {
  constructor(props){
    super(props) ;
    this.state = {
      isMobile: (window.innerWidth<797)
    } ;
    this.translate = languageLocale() ;
  }
  //
  render() {
    //
    configApp.isMobile = this.state.isMobile ;
    return (
      <Layout id="waiboc-main-node" style={{ background: '#fff',padding: '0' }}>
          <Router>
            <EncabezadoLazy translate={{...this.translate}} />
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <Route exact path="/account"                      component={(argMach) => <CuerpoCuenta  translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/account/:seccion"             component={(argMach) => <CuerpoCuenta  translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/account/reset/:email/:token"  component={
                                                                  (matchProps) =>
                                                                    <CuerpoReset {...matchProps}
                                                                      translate={{...this.translate}}
                                                                      configuracion={configApp}
                                                                      flagLoginAlone={true}
                                                                    /> }
                                                                />
              <Route exact path="/bots"                        component={(argMach) => <CuerpoCuenta  translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/login"                       component={(argMach) => <CuerpoLogin   translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/users"                       component={(argMach) => <CuerpoCuenta  translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/train/:idChatbot"            component={(argMach) => <CuerpoTrain   translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/edit/:idChatbot"             component={(argMach) => <CuerpoEditBot translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/404"                         component={(argMach) => <NoEncontrado404  translate={{...this.translate}} configuracion={configApp} {...argMach} />}  />
            </Content>
            <PiePagina translate={{...this.translate}} configuracion={configApp} />
          </Router>
      </Layout>
    )
  }
  //
};
//
ReactDOM.render( <App />, document.getElementById("app") );
//