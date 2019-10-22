/*
*
*/
import React                             from 'react' ;
import { Row, Col, Table, Spin }          from 'antd'  ;
import MapaGoogle                        from './MapaGoogle' ;
import { api }                           from '../api/api' ;
//
export class MapaDistribuidores extends React.Component {
    constructor(props){
        super(props) ;
        this.state   = {distribuidores:[],coordenadaInicial:false} ;
    }
    //
    componentDidMount(){
        try {
            api.distribuidores.get( {campos:["coordenadas","nombre","direccion","url"]} )
                .then((respDist)=>{
                    console.dir(respDist) ;
                    let tempArrDist = respDist.map((elemD,indE)=>{
                        return({
                            key: indE,
                            ...elemD
                        }) ;
                    }) ;
                    this.setState({distribuidores: tempArrDist }) ;
                })
                .catch((errD)=>{
                    console.dir(errD) ;
                });
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    render(){
        //
        let columns = [
            {title: 'Nombre'   , dataIndex: 'nombre' , render: text => <a>{text}</a> },
            {title: 'Dirección', dataIndex: 'direccion'   },
            {title: 'Website'  , dataIndex: 'url'     , render: text => <a href={text} target="_blank">{text}</a> }
        ] ;
        let datos   = this.state.distribuidores ;
        //
        return(
            <Row>
                <Col xs={1}  md={1}    lg={1} xl={1} xxl={1} ></Col>
                <Col xs={25}  md={25}  lg={14} xl={14} xxl={14} >
                    <Table
                        columns={columns}
                        dataSource={datos}
                        pagination={false}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    this.setState({coordenadasIniciales: record.coordenadas }) ;
                                }
                            };
                            }}
                    />
                </Col>
                <Col xs={2}   md={2}   lg={1} xl={1} xxl={1} ></Col>
                <Col xs={22}  md={22}  lg={8} xl={8} xxl={8} style={{marginTop:'20px'}}>
                    {
                        this.state.distribuidores.length==0 ?
                            <Spin size="large" />
                            :
                            <MapaGoogle
                                coordenadaInicial={this.state.coordenadasIniciales}
                                distribuidores={this.state.distribuidores}
                            />
                    }
                </Col>
            </Row>
        ) ;
    }
    //
} ;
//