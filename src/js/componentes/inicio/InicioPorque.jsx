/*
*
*/
import React                                              from 'react' ;
import { Row, Col, Typography, Button }                   from 'antd'  ;
// import VisibilitySensor                                   from 'react-visibility-sensor' ;
import Fade                                               from 'react-reveal/Fade'  ;
import { AnimacionLink }                                  from '../animacion/AnimacionLink' ;
//
const { Title } =  Typography ;
const WhyElement = (props) => {
    return(
        <div style={{minHeight:'100vh'}} id={props.currentId} >
            <Row>
                <Col xs={1} md={1}   lg={1}  xl={1}  xxl={1} ></Col>
                <Col xs={22} md={22} lg={12} xl={12} xxl={12} >
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
                        <Col xs={0} md={0} lg={0} xl={10} xxl={10} >
                            {
                                props.why.image.map((elemImg,imgKey)=>{
                                    return(
                                        <Fade right key={imgKey}  >
                                            <img src={elemImg} alt="cognitive" style={{width:'100%',height:'auto'}} />
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
                    <Row className="waiboc-home-row-actions" >
                        <Button type="primary" size="large" className="waiboc-btn-action"
                                onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                        >
                            {props.translate.login}
                        </Button>
                        <AnimacionLink texto={
                                        <Button type="primary" size="large" className="waiboc-btn-action" >
                                            {props.translate.moreInfo}
                                        </Button>
                                    }
                                    offset={130}
                                    siguienteDiv={props.nextId}
                        />
                    </Row>
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
                        return( <WhyElement key={whyIdx} why={elemWhy} {...elemProps}  /> )
                    })
                }
            </Row>
        ) ;
    }
} ;
//