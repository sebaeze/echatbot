/*
*
*/
import React              from 'react' ;
import { Row, Col }       from 'antd'  ;
//
export class InicioQueOfrecemos extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        return(
            <Row style={{paddingTop:'45px'}}>
                <Col xs={2}  md={2}  lg={1} xl={2} xxl={2} ></Col>
                <Col xs={16} md={16} lg={8} xl={8} xxl={8} >
                <Col xs={20} md={20} lg={6} xxl={6} key="0">
                    <Title level={4}>En Sindoh BA nuestro proposito es </Title>
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                    Los equipos de Sindoh se caracterizan por poseer bajo costo de mantenimiento.
                    </Paragraph>
                </Col>,
                <Col xs={1} md={1} lg={1} xl={1} xxl={1} key="1"></Col>
                <Col xs={20} md={20} lg={8} xxl={8} key="2">
                    <Title level={4}>Diseño</Title>
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                    Poseen de un diseño para facil uso.
                    </Paragraph>
                </Col>
                <Col xs={1} md={1} lg={1} xl={1} xxl={1} key="3"></Col>
                <Col xs={20} md={20} lg={8} xxl={8} key="4">
                    <Title level={4}>Confiable</Title>
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                    Alta calidad de componentes, lo que garantiza la durabilidad del equipo.
                    </Paragraph>
                </Col>
                </Col>
            </Row>
        ) ;
    }
    //
} ;
//