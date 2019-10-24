/*
*
*/
import { Layout, Menu, DatePicker, Icon, Typography, Row, Col, Button, Spin, Tooltip } from 'antd'   ;
import React                             from 'react' ;
import FormUserInfo                      from '../formularios/FormUserInfo' ;
import { api }                           from '../../api/api' ;
import { PARAMETROS }                    from '../../utils/parametros' ;
//
import '../../../css/estilosAccount.css' ;
//
const { Header, Content, Footer, Sider } = Layout ;
const { SubMenu }                        = Menu   ;
const { Title   }                        = Typography ;
//
export class CuerpoCuenta extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            userInfo: false,
            filtroColapsado: false,
            formType: PARAMETROS.FORM.USER_INFO
        } ;
        this.onCollapse = this.onCollapse.bind(this) ;
    }
    //
    componentDidMount(){
        try {
            //
            api.account.getUserInfo()
                .then((resDataUsr)=>{
                    this.setState({userInfo: resDataUsr}) ;
                })
                .catch((errResDM)=>{
                    console.dir(errResDM) ;
                }) ;
                //
        } catch(errCDM){
            console.dir(errCDM) ;
        }
    }
    //
    onCollapse(argCollapse){
        try {
            this.setState({filtroColapsado:argCollapse}) ;
        } catch(errOC){
            console.dir(errOC) ;
        }
    }
    //
    render(){
        return(
            <Layout id="idAccount" style={{ paddingTop:'120px',minHeight: '100vh'}}>
                <Sider collapsible
                    width={250}
                    collapsed={this.state.filtroColapsado}
                    onCollapse={this.onCollapse}
                >
                    <Menu defaultSelectedKeys={['1']} mode="inline"
                          defaultOpenKeys={['sub1']}
                          style={{backgroundColor:'#001529',color:'white',fontWeight:'500',fontSize:'22px'}}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" style={{color:'#EBF2FE'}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.userInfo} >
                                <span onClick={(argEV)=>{argEV.preventDefault();
                                            if ( this.state.formType!=PARAMETROS.FORM.USER_INFO ){
                                                this.setState({formType: PARAMETROS.FORM.USER_INFO}) ;
                                            } else{
                                                console.log('....ya estoy en user info') ;
                                            }
                                        }}
                                >
                                {this.props.translate.menuAdmin.userInfo}</span>
                            </Tooltip>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="robot" style={{color:'#EBF2FE'}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.botsConfiguration} >
                                <span onClick={(argEV)=>{argEV.preventDefault();
                                            if ( this.state.formType!=PARAMETROS.FORM.CHATBOTS ){
                                                this.setState({formType: PARAMETROS.FORM.CHATBOTS}) ;
                                            } else{
                                                console.log('....ya estoy en CHATBOTS') ;
                                            }
                                        }}
                                >Chatbots</span>
                            </Tooltip>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Row>
                        {
                            this.state.formType==PARAMETROS.FORM.USER_INFO ?
                            <FormUserInfo translate={this.props.translate} userInfo={this.state.userInfo} />
                            : null
                        }
                    </Row>
                </Content>
            </Layout>
        )
    }
    //
} ;
//