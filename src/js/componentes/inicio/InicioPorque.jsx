/*
*
*/
import React                                              from 'react' ;
import { Row, Col, Typography, Button }                   from 'antd'  ;
// import VisibilitySensor                                   from 'react-visibility-sensor' ;
import Fade                                               from 'react-reveal/Fade'  ;
import { ActionButtons }                                  from '../pages/ActionButtons'  ;
//
const { Title } =  Typography ;
const WhyElement = (props) => {
    return(
        <div style={{minHeight:'100vh'}} id={props.currentId} >
            <Row>
                <Col xs={1} md={1}   lg={1}  xl={1}  xxl={1} ></Col>
                <Col xs={22} md={22} lg={14} xl={14} xxl={14} >
                    <Title level={1}  >{props.why.title}</Title>
                    <Title level={3}  className="sub-title" >{props.why.description}</Title>
                    {
                        props.why.text.map((elemText,idxTT)=>{
                            return(
                                <Row key={idxTT} >
                                    <span key={idxTT} className="line-detail">{elemText}</span>
                                </Row>
                            )
                        })
                    }
                </Col>
                {
                    props.why.image ?
                        <Col xs={0} md={0} lg={8} xl={8} xxl={8} >
                            {
                                props.why.image.map((elemImg,imgKey)=>{
                                    return(
                                        <Fade right key={imgKey}  >
                                            <img src={elemImg.src} alt="cognitive" style={elemImg.style} />
                                        </Fade>
                                    )
                                })
                            }
                        </Col>
                        :
                        null
                }
            </Row>
            <Row>
                <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                <Col xs={22} md={22} lg={18} xl={18} xxl={18} >
                    <ActionButtons showLoginButton={true} translate={props.translate} siguienteDiv={props.siguienteDiv} />
                </Col>
            </Row>
        </div>
    )
} ;
//
export class InicioPorque extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            isMobile: (window.innerWidth<797),
            showDiv: this.props.flagShowDiv ? this.props.flagShowDiv : false
        } ;
        this.onFocusPorque = this.onFocusPorque.bind(this) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.flagShowDiv!=state.flagShowDiv ){
            return {showDiv: newProps.flagShowDiv} ;
        } else {
            return false ;
        }
    }
    //
    onFocusPorque(argEVV){
        try {
            console.dir(argEVV);
            console.log('..onfocus');
            this.setState({showDivPorque:true})
        } catch(errFP){
            console.dir(errFP) ;
        }
    }
    //
    render(){
        //
        return(
            <Row className="waiboc-home-whyus" id={this.props.id}  >
                {
                    this.props.translate.HomeWhy.map((elemWhy,whyIdx)=>{
                        let elemProps = {
                            ...this.props,
                            currentId: this.props.id+"_"+whyIdx ,
                            nextId: (this.props.translate.HomeWhy.length==(whyIdx+1)) ? this.props.siguienteDiv : this.props.id+"_"+(whyIdx+1)
                        };
                        elemProps.siguienteDiv = elemProps.nextId ;
                        return( <WhyElement key={whyIdx} why={elemWhy} {...elemProps}  /> )
                    })
                }
            </Row>
        ) ;
    }
} ;
//