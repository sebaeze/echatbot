/*
*
*/
import React, { Component }    from 'react'    ;
import TextyAnim               from 'rc-texty' ;
import 'rc-texty/assets/index.css' ;
//
export class AnimacionTexto extends Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        return(
            <TextyAnim mode="random">
                {this.props.texto}
            </TextyAnim>
        )
    }
    //
} ;
//