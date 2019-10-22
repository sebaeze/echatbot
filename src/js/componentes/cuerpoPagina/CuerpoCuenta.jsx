/*
*
*/
import { Layout, Menu, DatePicker, Icon, Typography, Row, Col, Button, Spin, Tooltip } from 'antd'   ;
import React                             from 'react' ;
import { api }                           from '../../api/api' ;
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
            filtroColapsado: false
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
            <Layout id="idMainTasas" style={{ paddingTop:'120px',minHeight: '100vh'}}>
                <Sider collapsible
                    width={310}
                    collapsed={this.state.filtroColapsado}
                    onCollapse={this.onCollapse}
                >
                    <Menu defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['sub1']}>
                        <Menu.Item key="1">
                            <Icon type="user" style={{color:'#EBF2FE'}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.userInfo} >
                                <span >{this.props.translate.menuAdmin.userInfo}</span>
                            </Tooltip>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="robot" style={{color:'#EBF2FE'}} />
                            <Tooltip placement="topRight" title={this.props.translate.menuAdmin.botsConfiguration} >
                                <span >Chatbots</span>
                            </Tooltip>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Row>
                    </Row>
                </Content>
            </Layout>
        )
    }
    //
} ;
//