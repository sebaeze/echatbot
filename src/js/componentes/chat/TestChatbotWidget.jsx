/*
*
*/
import React         from  'react' ;
//
export class TestChatbotWidget extends React.Component {
    constructor(props){
        super(props) ;
        this.onWindowOpen  = this.onWindowOpen.bind(this) ;
        this.onWindowClose = this.onWindowClose.bind(this) ;
        this.state   = {
            idAgent: this.props.idAgent
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
            this.props.onWindowClose() ;
        }
    }
    //
    componentDidMount(){
        try {
            window.waiboc.initChatbotWidget({
                idAgent: this.props.idAgent,
                onWindowOpen: this.onWindowOpen,
                onWindowClose: this.onWindowClose,
                training: true,
                defaultStyle:{
                    fontSize:'22px'
                }
            }) ;
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
        return(
            <div></div>
        )
    }
    //
} ;
//