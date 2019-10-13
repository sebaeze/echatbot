/*
*
*/
import React, { Component }           from 'react' ;
import PropTypes                      from 'prop-types'   ;
import TweenOne                       from 'rc-tween-one' ;
import BezierPlugin                   from 'rc-tween-one/lib/plugin/BezierPlugin' ;
//
import '../../../css/estilosAnimaciones.css' ;
//
TweenOne.plugins.push(BezierPlugin);
//
class AnimacionInicial extends Component {
    constructor(props){
        super(props) ;
        this.ubicaciones = [
            { x: 0  , y: 0 },
            { x: 0  , y: 150 },
            { x: 0  , y: 300 },
            { x: 150 ,y: 300 },
            { x: 300 ,y: 300 },
            { x: 600 ,y: 300 },
            { x: 600 ,y: 150 },
            { x: 600 ,y: 0 }
        ] ;
        this.animation = {
            bezier: {
              type: 'soft',
              autoRotate: true,
              vars: [...this.ubicaciones],
                /*
                [
                { x: 150, y: 150 },
                { x: 300, y: 0 },
                { x: 450, y: 150 },
                { x: 600, y: 0 }
                ]
                */
            },
            repeat: -1,
            yoyo: true,
            duration: 5000,
          };
    }
    //
    render(){
        return(
        <div style={{ position: 'relative', height: 200, width: 650, margin: 'auto' }}>
            <TweenOne
                animation={this.animation}
                style={{ margin: 0 }}
                className="code-box-shape"
                paused={this.props.paused}
            />
            <span className="demo-bezier-shape"></span>
            {
                this.ubicaciones.map((eleUbi,eleInd)=>{
                    return(
                        <span key={eleInd} style={{ transform: 'translate('+eleUbi.x+'px,'+eleUbi.y+'px)' }} className="demo-bezier-shape"></span>
                    ) ;
                })
            }
        </div>
        ) ;
    } ;
    //
} ;
//
AnimacionInicial.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    paused: PropTypes.bool,
  };
//
export default AnimacionInicial ;
//