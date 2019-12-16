/*
*
*/
import React                               from "react"      ;
import ReactDOM                            from "react-dom"  ;
import { BrowserRouter as Router, Route }  from 'react-router-dom'   ;
import { Layout  }                         from 'antd';
//
import Encabezado                          from "./js/componentes/Encabezado" ;
import PiePagina                           from "./js/componentes/PiePagina"  ;
import { CuerpoLogin   }                   from "./js/componentes/cuerpoPagina/CuerpoLogin"  ;
import { CuerpoCuenta  }                   from "./js/componentes/cuerpoPagina/CuerpoCuenta" ;
import { CuerpoTrain   }                   from "./js/componentes/cuerpoPagina/CuerpoTrain" ;
import { CuerpoEditBot }                   from "./js/componentes/cuerpoPagina/CuerpoEditBot" ;
//
import { languageLocale }                  from "./js/utils/utiles" ;
//
import configApp                           from "./config/configApp.json" ;
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
      <Layout id="waiboc-id-app" style={{ background: '#fff',padding: '0' }}>
          <Encabezado translate={{...languageLocale()}} />
          <Router>
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <Route exact path="/account"               component={(argMach) => <CuerpoCuenta  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/account/:seccion"      component={(argMach) => <CuerpoCuenta  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/bots"                  component={(argMach) => <CuerpoCuenta  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/login"                 component={(argMach) => <CuerpoLogin   translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/users"                 component={(argMach) => <CuerpoCuenta  translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/train/:idChatbot"      component={(argMach) => <CuerpoTrain   translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
              <Route exact path="/edit/:idChatbot"       component={(argMach) => <CuerpoEditBot translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
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