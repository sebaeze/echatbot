/*
*
*/
import React         from  'react' ;
//
export class TestChatbotWidget extends React.Component {
    constructor(props){
        super(props) ;
        this.state   = {
            idAgent: this.props.idAgent
        }
    } ;
    //
    componentDidMount(){
        try {
            console.log('....TestChatbot:: props: ',this.props,';') ;
            console.log('........window.initChatbotWidget: ',window.initChatbotWidget,';') ;
            window.initChatbotWidget({
                idAgent: this.props.idAgent,
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
      console.log('...TestChatbotWidget:: getDerivedStateFromProps:: ',newProps,';') ;
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