/*
*
*/
import React         from  'react' ;
//
export class TestChatbotWidget extends React.Component {
    constructor(props){
        super(props) ;
    } ;
    //
    componentDidMount(){
        try {
            console.log('....TestChatbot:: props: ',this.props,';') ;
            console.log('........window.initChatbotWidget: ',window.initChatbotWidget,';') ;
            window.initChatbotWidget({
                idAgent: this.props.idAgent,
                defaultStyle:{
                    fontSize:'22px'
                }
            }) ;
        } catch(errDM){
            console.dir(errDM) ;
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