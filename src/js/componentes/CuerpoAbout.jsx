/*
*
*/
import React                           from 'react' ;
import { Row, Col, Typography }        from 'antd'  ;
//
const { Title, Paragraph } = Typography ;
//
export class CuerpoAbout extends React.Component {
    constructor(props){
        super(props) ;
    } ;
    //
    render(){
        return (
            <div id="idAbout" style={{paddingTop:'45px',minHeight:'90vh',backgroundColor:'#F4F4F4'}}>
                <div style={{paddingTop:'120px'}}>
                    {
                        this.props.translate.homeAbout.map((elemAbout,idxHH)=>{
                            return(
                                <Row style={{paddingTop:'50px'}} key={idxHH} >
                                    <Col xs={2}  md={2}  lg={4}  xl={4}  xxl={4}></Col>
                                    <Col xs={20} md={20} lg={18} xl={18} xxl={18}>
                                        <Title level={2} style={{textAlign:'center'}}>{elemAbout.title}</Title>
                                        <Paragraph ellipsis={{ rows: 5, expandable: true }}  style={{fontSize:'20px'}} >
                                            {
                                                elemAbout.text.map((elemText)=>{
                                                    return elemText ;
                                                })
                                            }
                                        </Paragraph>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div>
            </div>
        )
    } ;
    //
} ;
//