/*
*
*/
import React                                      from 'react' ;
import { Row, Col, Typography }                   from 'antd'  ;
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
                    return(
                    <Row key={elemIdx} className="bg-azul" style={{minHeight:'80vh'}} >
                        <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                        <Col xs={22} md={22} lg={13} xl={13} xxl={13} >
                            <Title level={1}  >{elemWhy.title}</Title>
                            <Title level={3}  >{elemWhy.description}</Title>
                            {
                                elemWhy.text.map((elemText,idxTT)=>{
                                    return(
                                        <span key={idxTT}>{elemText}</span>
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