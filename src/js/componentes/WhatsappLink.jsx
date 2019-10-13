/*
*
*/
import React           from 'react' ;
import { Icon }        from 'antd'  ;
//
export class WhatsappLink extends React.Component {
    constructor(props){
        super(props) ;
        this.onClickWhatsapp = this.onClickWhatsapp.bind(this) ;
    }
    //
    onClickWhatsapp(argEventClick){
        try {
            argEventClick.preventDefault() ;
            //
            let plataforma     = String(window.navigator.platform).toUpperCase() ;
            let urlWhatsapp    = '' ;
            let whatsappText   = '"Hola, busco información de Sindoh"' ;
            //
            if ( plataforma.indexOf('WIN')!=-1 || plataforma.indexOf('MAC')!=-1 ) {
                urlWhatsapp = "https://web.whatsapp.com/send?phone="+this.props.configuracion.empresa.whatsapp ;
            } else {
                urlWhatsapp = "https://api.whatsapp.com/send?phone="+this.props.configuracion.empresa.whatsapp ;
            }
            var win = window.open( urlWhatsapp+'&text='+whatsappText, '_blank');
            if ( win ){ win.focus(); }
            //
        } catch(errCW){
            console.dir(errCW) ;
        }
    }
    //
    render(){
        //
        //<img src="/img/whatsapp-icono.png"   />
        //
        return(
            <div className="whatsapp-icon" onClick={this.onClickWhatsapp} >
                <Icon type="wechat" />
            </div>
        ) ;
        //
    }
    //
} ;
//