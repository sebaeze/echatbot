/*
*
*/
import React, { Component       } from 'react' ;
//
class EncabezadoLinkConLista extends Component {
  constructor(props) {
    super(props);
    this.onClickRef = this.onClickRef.bind(this) ;
    this.state      = {flagCurrentPath:( String(window.location.pathname).toUpperCase()==String(this.props.link).toUpperCase() )} ;
  }
  //
  componentDidMount(){}
  //
  onClickRef(argEventLink){
    try {
      if ( this.state.flagCurrentPath==true ){
        argEventLink.preventDefault() ;
      }
    } catch(errClick){
      console.dir(errClick) ;
mobile-nav    }
  }
  //
  render() {
    //
    let arrayHijos = this.props.itemsMenu.sort((a,b)=>{ return b.cantidad-a.cantidad ; }) ;
    //
    return (
        <li className="menu-has-children"><span>{this.props.mensaje}</span>
            <ul className="sub-menu">
                {
                    arrayHijos.map((elemHijo)=>{
                        let nombre     = String(elemHijo.id).substr(0,1).toUpperCase() + String(elemHijo.id).substr(1).toLocaleLowerCase() ;
                        nombre         = nombre.trim() ;
                        if ( this.props.flagPlural==true ){
                          if ( nombre.substr((nombre.length-1),1)!="s" ){ nombre = nombre+"s" ;}
                        }
                        return (<li key={elemHijo.id}><a href={elemHijo.url}>{nombre}</a></li>) ;
                    })
                }
            </ul>
        </li>
        ) ;
      //
    }
  }
/* */
export default EncabezadoLinkConLista ;
/* */