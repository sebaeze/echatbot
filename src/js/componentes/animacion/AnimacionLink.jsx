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
        return(
            <Link to={this.props.siguienteDiv}
                  offsetTop={this.props.offset ? this.props.offset : 90}
                  ref={(c) => { this.dom = ReactDOM.findDOMNode(c); }}
                  style={this.props.styleCss ? this.props.styleCss : {} }
            >
                {this.props.texto}
            </Link>
        ) ;
    }
    //
} ;
//