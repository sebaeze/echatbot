/*
*
*/
import React                 from 'react' ;
//
export const ChatbotScreen = (props) => {
    try {
        let headerStyle = ( props.data.cssStyle && props.data.cssStyle.header ) ? props.data.cssStyle.header : null ;
        return(
            <div className="waiboc-screen-demo" >
                <div className="rcw-widget-container  rcw-opened">
                    <div className="rcw-conversation-container">
                        <div className="rcw-header" style={headerStyle} >
                            <h4 className="rcw-title">{props.data.nameToDisplay}</h4>
                            <span>{props.data.botSubtitle}</span>
                        </div>
                        <div id="messages" className="rcw-messages-container">
                        <div className="loader false">
                            <div className="loader-container">
                                <span className="loader-dots"></span>
                                <span className="loader-dots"></span>
                                <span className="loader-dots"></span>
                            </div>
                            </div></div>
                            <form className="rcw-sender">
                                <input  type="text" className="rcw-new-message" disabled name="message"
                                        placeholder={props.data.senderPlaceholder} autoComplete="off"
                                />
                            </form>
                        </div>
                </div>
            </div>
        )
    } catch(errCS){
        console.log('...errCS: ',errCS) ;
        throw errCS ;
    }
} ;
//