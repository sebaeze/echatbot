/*
*
*/
import React                                              from 'react' ;
import { Row, Col, Typography, Button }                   from 'antd'  ;
import { AnimacionLink }                  from '../animacion/AnimacionLink' ;
//
const { Title } =  Typography ;
//
export class InicioPorque extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {isMobile: (window.innerWidth<797), showDiv: this.props.flagShowDiv ? this.props.flagShowDiv : false } ;
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
    render(){
        //
        let Content = this.props.translate.HomeWhy.map((elemWhy,elemIdx)=>{
                    //
                    let nextId = (elemIdx<(this.props.translate.HomeWhy.length-1)) ? this.props.id+(elemIdx+1)  : false ;
                    return(
                        <Row key={elemIdx} className="bg-azul" style={{minHeight:'80vh'}} id={(this.props.id+elemIdx)}>
                            <Row>
                                <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                                <Col xs={22} md={22} lg={18} xl={18} xxl={18} >
                                    <Title level={1}  >{elemWhy.title}</Title>
                                    <Title level={3}  >{elemWhy.description}</Title>
                                    {
                                        elemWhy.text.map((elemText,idxTT)=>{
                                            return(
                                                <Row key={idxTT} >
                                                    <span key={idxTT} style={{fontWeight:'500'}}>{elemText}</span>
                                                </Row>
                                            )
                                        })
                                    }
                                </Col>
                                {
                                    elemWhy.image ?
                                        <Col xs={24} md={24} lg={10} xl={10} xxl={10} >
                                            <img src={elemWhy.image} alt="cognitive" style={{width:'100%',height:'auto'}} />
                                        </Col>
                                        :
                                        null
                                }
                            </Row>
                            <Row>
                                <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                                <Col xs={22} md={22} lg={18} xl={18} xxl={18} >
                                    <div style={{marginTop: '15px',width:'auto'}} >
                                        {
                                            nextId ?
                                            <AnimacionLink texto={
                                                            <Button type="primary" size="large" style={{backgroundColor:'#ADDF95'}}>
                                                                {this.props.translate.moreInfo}
                                                            </Button>
                                                        }
                                                        styleCss={{float: 'left', display: 'inline-block', position: 'relative' }}
                                                        offset={130}
                                                        siguienteDiv={nextId}
                                            />
                                            : null
                                        }
                                        <Button type="primary" size="large"
                                                style={{backgroundColor:'#ADDF95', marginLeft:'7px'}}
                                                onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                                        >
                                            {this.props.translate.login}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Row>)
                }) ;
        //
        return(
            <div style={{marginTop:'100px'}} id={this.props.id} >
                <div className={this.state.showDiv==true?'fadeIn':'fadeOut'} >
                    {Content}
                </div>
            </div>
        ) ;
    }
} ;
//