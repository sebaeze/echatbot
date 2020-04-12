/*
*
*/
import React                                      from 'react' ;
import { CuerpoEditBot  }                         from "./CuerpoEditBot" ;
//
export class CuerpoTrain extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            idChatbotEdit: this.props.match.params.idChatbot || false
        } ;
    }
    //
    render(){
        return(
            <div style={{paddingTop:'100px',minHeight:'110vh'}} >
                <CuerpoEditBot translate={this.props.translate}
                    idChatbot={this.state.idChatbotEdit}
                    onFinishEdit={()=>{this.setState({idChatbotEdit: false});}}
                    configuracion={this.props.configuracion}
                    {...this.props.argMach}
                />
            </div>
        )
    }
    //
} ;
//