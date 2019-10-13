/*
*
*/
import React, { Component }           from 'react' ;
import ReactDOM                       from "react-dom"    ;
import ScrollAnim                     from 'rc-scroll-anim' ;
//
const ScrollOverPack = ScrollAnim.OverPack;
const Link           = ScrollAnim.Link ;
//
export class AnimacionLink extends Component {
    constructor(props){
        super(props) ;
    }
    //
    componentWillMount(){}
    //
    render(){
        //
        // showHeightActive={['10%', '60%']} toShowHeight
        //
        return(
            <Link to={this.props.siguienteDiv} offsetTop={100}
                ref={(c) => {
                this.dom = ReactDOM.findDOMNode(c);
                }}
            >
                {this.props.texto}
            </Link>
        ) ;
    }
    //
} ;
//