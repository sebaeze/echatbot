/*
*
*/
import React, { Component }      from 'react' ;
//
export class LogoEmpresa extends Component {
    constructor(props){
        super(props)   ;
        this.state  = { isMobile: (window.innerWidth<797) } ;
    }
    //
    componentDidMount(){
        try {
            window.addEventListener("resize", function(argEv){
                this.setState({isMobile: (window.innerWidth<797)});
            }.bind(this));
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    render(){
        //
        // <img src={ this.state.isMobile==true ? "/img/logo.echatai.transparent.png" : "/img/logo.echatai.transparent.png" }
        //
        return(
            <a href="/" className="logo a-no-hover" style={{margin:'0',padding:'0'}}>
                <img src={ "/img/logo.waiboc.transparent.png" }
                    style={ this.state.isMobile==true ? {width:'150px',height:'auto',marginLeft:'40px',marginTop:'30px'} : {width:'200px',height:'auto',marginLeft:'40px'} }
                    alt="logo"
                />
            </a>
        ) ;
    }
    //
} ;
//