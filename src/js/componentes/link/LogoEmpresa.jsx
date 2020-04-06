/*
*
*/
import React                             from 'react' ;
import LinkRouter                        from '../link/LinkRouter' ;
//
export class LogoEmpresa extends React.Component {
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
        return(
            <LinkRouter  url={"/"} >
                <img src={ "/img/logo.waiboc.transparent.png" }
                    style={ this.state.isMobile==true ? {width:'150px',height:'auto',marginLeft:'40px',marginTop:'30px'} : {width:'200px',height:'auto',marginLeft:'40px',marginTop:'20px'} }
                    alt="logo"
                />
            </LinkRouter>
        ) ;
    }
    //
} ;
//