/*
*
*/
import React                 from 'react' ;
import { Widget, addResponseMessage, renderCustomComponent, toggleMsgLoader }     from 'react-chat-widget'  ;
//
export class ChatWidget extends React.Component {
    constructor(props){
        super(props) ;
        this.handleNewUserMessage  = this.handleNewUserMessage.bind(this) ;
        this.onClickOpcion         = this.onClickOpcion.bind(this) ;
        this.chatOpenedHandler     = this.chatOpenedHandler.bind(this) ;
        this.chatClosedHandler     = this.chatClosedHandler.bind(this) ;
        this.state = {
            botStatus: '',
            botSubtitle: '',
            senderPlaceholder: '',
        } ;
    } ;
    //
    chatOpenedHandler(){
        console.log("opened") ;
        if ( this.state.chatOpen!=true ){
        this.setState({chatOpen: true, pendientes: 0}) ;
        }
    }
    //
    chatClosedHandler(){
        console.log("clossed") ;
        if ( this.state.chatOpen!=false ){
        this.setState({chatOpen: false}) ;
        }
    }
    //
    onClickOpcion(argEvent){
        try {
        argEvent.preventDefault() ;
        let valueSelected = argEvent.target.getAttribute('valueselected') || false ;
        console.dir(valueSelected) ;
        //
        if ( valueSelected ){
            /*
            api.chatbotMessage( valueSelected, this.props.idAgente )
                .then((respBotParsed)=>{
                renderCustomComponent( CustomReply.bind(this) , {tipo:'tabla',datos: respBotParsed, onClickOpcion:this.onClickOpcion.bind(this) }, false ) ;
                })
                .catch((errBot)=>{
                console.dir(errBot) ;
                }) ;
                */
        }
        //
        } catch(errOCO){
        console.dir(errOCO) ;
        }
    }
    //
    handleNewUserMessage(newMessage){
        //
        toggleMsgLoader();
        fetchChatbot({idAgente: this.props.configuration.idAgent,input:{text:newMessage} })
            .then((respBot)=>{
                renderCustomComponent( CustomReply.bind(this) ,
                            {
                            datos: respBot, onClickOpcion:this.onClickOpcion.bind(this) ,
                            windowStyle: this.props.configuration.windowStyle,
                            addMsg:addResponseMessage.bind(this) ,
                            onOpen: this.chatOpenedHandler ,
                            onClose: this.chatClosedHandler
                            }, false ) ;
                toggleMsgLoader();
            })
            .catch((errBot)=>{
                console.log('....errBot: ') ;
                console.dir(errBot) ;
                toggleMsgLoader();
            }) ;
        //
    }
    //
    render(){
        return(
            <div>
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    title={this.state.botStatus}
                    subtitle={this.state.botSubtitle}
                    senderPlaceHolder={this.state.senderPlaceholder}
                    showCloseButton={true}
                    badge={this.state.pendientes}
                />
            </div>
        )
    }
    //
} ;
//