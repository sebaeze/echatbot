/*
*
*/
import React                               from 'react' ;
import { CustomReply, WaibocReactWidget }  from 'waiboc-widget-react' ;
/// import { CustomReply, WaibocReactWidget }  from '../../../../../waiboc-widget-react/lib/index'  ;// 'waiboc-widget-react' ;
//
export class TestChatbotWidget extends React.Component {
    constructor(props){
        super(props) ;
        this.onWindowOpen  = this.onWindowOpen.bind(this) ;
        this.onWindowClose = this.onWindowClose.bind(this) ;
        this.state   = {
            idAgent: this.props.idAgent,
            flagVisible: false,
            chatbotConfig: this.props.chatbotConfig
        }
    } ;
    //
    static getDerivedStateFromProps(newProps,state){
        if ( JSON.stringify(newProps.chatbotConfig)!=JSON.stringify(state.chatbotConfig) ){
            return {chatbotConfig: newProps.chatbotConfig} ;
        } else {
            return false ;
        }
    } ;
    //
    onWindowOpen(){
        if ( this.props.onWindowOpen && typeof this.props.onWindowOpen=='function' ){
            this.props.onWindowOpen() ;
        }
    }
    //
    onWindowClose(){
        if ( this.props.onWindowClose && typeof this.props.onWindowClose=='function' ){
            //window.waiboc.widgetVisible(false) ;
            this.props.onWindowClose() ;
        }
    }
    //
    componentDidMount(){
        try {
            this.setState({
                flagVisible: true
            }) ;
            /*
            window.waiboc.initChatbotWidget({
                idAgent: this.props.idAgent,
                onWindowOpen: this.onWindowOpen,
                onWindowClose: this.onWindowClose,
                training: true,
                defaultStyle:{
                    fontSize:'22px'
                }
            }) ;
            */
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    static getDerivedStateFromProps(newProps, state) {
      if ( newProps.idAgent != state.idAgent ){
        return { idAgent: newProps.idAgent } ;
      } else {
        return false ;
      }
    }
    //
    render(){
        //
        return(
            <WaibocReactWidget
                idAgent={this.state.chatbotConfig._id}
                backEndServer={ __URL_WIDGET__ }
                options={{...this.state.chatbotConfig.options}}
            />
        )
    }
    //
} ;
//