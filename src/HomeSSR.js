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
import { languageLocale }                 from "./js/utils/utiles" ;
import configApp                          from "./config/configApp.json" ;
//
const  { Content }   = Layout ;
//
import 'antd/dist/antd.css' ;
import './css/estilos.css' ;
import './css/estilosContacto.css' ;
import './css/estilosAnimaciones.css' ;
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
      <Layout id="waiboc-main-node"  style={{ background: '#fff',padding: '0' }}>
          <Router>
            <Encabezado translate={this.translate} />
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <div></div>
            </Content>
            <PiePagina translate={this.translate} configuracion={configApp} />
          </Router>
      </Layout>
    )
  }
  //
};
//
ReactDOM.render( <App />, document.getElementById("appHome") );
//