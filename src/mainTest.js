/*
*
*/
import React                               from "react"      ;
import ReactDOM                            from "react-dom"  ;
import { BrowserRouter as Router, Route }  from 'react-router-dom'   ;
import { Layout  }                         from 'antd';
//
import { CuerpoTrain  }                    from "./js/componentes/cuerpoPagina/CuerpoTrain"  ;
//
import { languageLocale }                  from "./js/utils/utiles" ;
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
    } ;
    console.log('.....APP:: constructor ') ;
  }
  //
  componentDidMount(){
    try {
      window.addEventListener("resize",function(argEventSCR){
        this.setState({isMobile: (window.innerWidth<797)});
      }.bind(this)) ;
      //
      console.log('.....APP:: componentDidMount') ;
      //
    } catch(errCDM){
      console.dir(errCDM) ;
    }
  }
  //
  render() {
    //
    configApp.isMobile = this.state.isMobile ;
    console.log('.....APP:: Render ') ;
    //
    return (
      <Layout style={{ background: '#fff',padding: '0' }}>
          <Router>
            <Content style={{ minHeight: '90vh', background: '#fff',padding: '0' }}>
              <Route exact path="/test"               component={(argMach) => <CuerpoTrain    translate={{...languageLocale()}} configuracion={configApp} {...argMach} />}  />
            </Content>
          </Router>
      </Layout>
    )
  }
  //
};
//
ReactDOM.render( <App />, document.getElementById("app") );
//