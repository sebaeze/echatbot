/*
*
*/
import React, { Component }           from 'react'        ;
import ReactDOM                       from "react-dom"    ;
import { Typography }                 from 'antd'   ;
import PropTypes                      from 'prop-types'   ;
import TweenOne                       from 'rc-tween-one' ;
import {AnimacionTexto}               from './AnimacionTexto' ;
import {AnimacionLink }               from './AnimacionLink' ;
//
import ticker from 'rc-tween-one/lib/ticker';
import Radio  from 'antd/lib/radio';
//
import '../../../css/estilosAnimaciones.css' ;
//
const { Title } = Typography      ;
//
class AnimacionLogo extends Component {
    //
    constructor(props) {
      super(props) ;
      this.state        = { isMobile: (window.innerWidth<797),children:[] };
      this.interval     = null;
      this.gather       = true;
      this.intervalTime = 4000;
      this.gatherData   = this.gatherData.bind(this) ;
      this.onMouseEnter = this.onMouseEnter.bind(this) ;
      this.onMouseLeave = this.onMouseLeave.bind(this) ;
      this.disperseData = this.disperseData.bind(this) ;
      this.setDataToDom = this.setDataToDom.bind(this) ;
      this.updateTweenData = this.updateTweenData.bind(this) ;
      this.createPointData = this.createPointData.bind(this) ;
    }
    //
    componentDidMount() {
      window.addEventListener("resize",function(argEventSCR){
        this.setState({isMobile: (window.innerWidth<797)});
      }.bind(this)) ;
      this.dom = ReactDOM.findDOMNode(this);
      this.createPointData();
    }
    //
    componentWillUnmount() {
      ticker.clear(this.interval);
      this.interval = null;
    }
    //
    onMouseEnter(){
      // !this.gather && this.updateTweenData();
      if (!this.gather) {
        this.updateTweenData();
      }
      this.componentWillUnmount();
    };
    //
      onMouseLeave(){
        // this.gather && this.updateTweenData();
        if (this.gather) {
          this.updateTweenData();
        }
        this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
      };
    //
      setDataToDom(data, w, h) {
        this.pointArray = [];
        const number = this.props.pixSize;
        for (let i = 0; i < w; i += number) {
          for (let j = 0; j < h; j += number) {
            if (data[((i + j * w) * 4) + 3] > 150) {
              this.pointArray.push({ x: i, y: j });
            }
          }
        }
        const children = [];
        this.pointArray.forEach((item, i) => {
          const r = Math.random() * this.props.pointSizeMin + this.props.pointSizeMin;
          const b = Math.random() * 0.4 + 0.1;
          children.push((
            <TweenOne className="point-wrapper" key={i} style={{ left: item.x, top: item.y }}>
              <TweenOne
                className="point"
                style={{
                  width: r,
                  height: r,
                  opacity: b,
                  backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
                }}
                animation={{
                  y: (Math.random() * 2 - 1) * 10 || 5,
                  x: (Math.random() * 2 - 1) * 5 || 2.5,
                  delay: Math.random() * 1000,
                  repeat: -1,
                  duration: 3000,
                  yoyo: true,
                  ease: 'easeInOutQuad',
                }}
              />
            </TweenOne>
          ));
        });
        this.setState({
          children,
          boxAnim: { opacity: 0, type: 'from', duration: 800 },
        }, () => {
          this.interval = ticker.interval(this.updateTweenData, this.intervalTime);
        });
      }
    //
      createPointData(){
        const { w, h } = this.props;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);
        canvas.width = this.props.w;
        canvas.height = h;
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;
          this.setDataToDom(data, w, h);
          this.dom.removeChild(canvas);
        };
        img.crossOrigin = 'anonymous';
        img.src = this.props.image;
      };
    //
      gatherData(){
        const children = this.state.children.map(item =>
          React.cloneElement(item, {
            animation: {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              delay: Math.random() * 500,
              duration: 800,
              ease: 'easeInOutQuint',
            },
          }));
        this.setState({ children });
      };
    //
    disperseData(){
      //
      const rect     = this.dom.getBoundingClientRect();
      const sideRect = this.sideBox.getBoundingClientRect();
      const sideTop  = sideRect.top - rect.top;
      const sideLeft = sideRect.left - rect.left;
      //
      const children = this.state.children.map(item =>
        React.cloneElement(item, {
          animation: {
            x: Math.random() * rect.width - sideLeft - item.props.style.left,
            y: Math.random() * rect.height - sideTop - item.props.style.top,
            opacity: Math.random() * 0.4 + 0.1,
            scale: Math.random() * 2.4 + 0.1,
            duration: Math.random() * 500 + 500,
            ease: 'easeInOutQuint',
          },
        }));
      //
      this.setState({ children });
      //
    };
    //
      updateTweenData(){
        this.dom = ReactDOM.findDOMNode(this);
        this.sideBox = ReactDOM.findDOMNode(this.sideBoxComp);
        ((this.gather && this.disperseData.bind(this) ) || this.gatherData)();
        this.gather = !this.gather;
      };
      //
      render() {
        //
        return (
          <div className="logo-gather-demo-wrapper">
            <div style={{position:'absolute',marginLeft:'5%',marginTop:'5vh',width:'90%',textAlign:'center'}}>
              <Title ellipsis={true} >
                <AnimacionTexto texto={ this.props.titulo } />
              </Title>
              <Title  level={2} ellipsis={true}  type="secondary" >
                <AnimacionTexto texto={ this.props.subTitulo } />
              </Title>
              <div className="div-continuar" style={{marginLeft:(this.state.isMobile==true ? '27%' : '45vh'),marginTop:(window.innerHeight<950 ? '25vh' : '40vh')}}>
                <div className="btn-continuar">
                    <AnimacionLink texto={"Más Información"} siguienteDiv={this.props.siguienteDiv} />
                </div>
              </div>
            </div>
            <canvas id="canvas" />
            <TweenOne
              animation={this.state.boxAnim}
              className="right-side blur"
              onMouseEnter={this.onMouseEnter.bind(this)}
              onMouseLeave={this.onMouseLeave.bind(this)}
              ref={(c) => {
                this.sideBoxComp = c;
              }}
            >
              {this.state.children}
            </TweenOne>
          </div>
        );
        //
      }
    //
} ;
//
AnimacionLogo.propTypes = {
    image: PropTypes.string,
    w: PropTypes.number,
    h: PropTypes.number,
    pixSize: PropTypes.number,
    pointSizeMin: PropTypes.number
};
//
/*
AnimacionLogo.defaultProps = {
  //image: 'https://zos.alipayobjects.com/rmsportal/gsRUrUdxeGNDVfO.svg',
  //image: '/img/logo-sindoh-md.svg',
  //image: '/img/logo-sindoh-ok.svg',
  image: '/img/sindog_logo_max.svg',
  w: 300,
  h: 300,
  pixSize: 6,
  pointSizeMin: 4,
};
*/
//
export default AnimacionLogo ;
//