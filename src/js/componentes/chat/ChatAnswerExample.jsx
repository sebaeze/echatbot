/*
ChatAnswerExample
*/
import React         from 'react' ;
//
export class ChatAnswerExample extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        //
        
        //
        return(
            <div style={{marginTop:'10px',backgroundColor: "rgb(224, 230, 229)", borderRadius: "10px", padding: "15px"}}>
                <p style={{marginBottom: "0px"}}>
                    <span>{this.props.text}</span>
                </p>
            </div>
        )
    }
    //
} ;
//