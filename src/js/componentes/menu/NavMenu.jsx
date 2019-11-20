/*
*
*/
import React                             from 'react' ;
import { Menu, Button, Icon }            from 'antd'  ;
import { PARAMETROS }                    from '../../utils/parametros' ;
//
const { SubMenu } = Menu ;
//
class NavMenu extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    componentDidMount(){}
    //
    render(){
        //
        let styleMenu = this.props.isMobile ? {} : { width: '100%',zIndex:'9991',lineHeight: '100px', fontSize: '24px', float:'right', marginRight: '1%' } ;
        //
        return(
            <div>
                <Menu
                    id="idHeaerSubmenu"
                    theme="light"
                    className="menu-header-mobile"
                    mode={ this.props.isMobile ? "vertical" : "horizontal" }
                    style={styleMenu}
                >
                    {
                        this.props.userInfo==false ?
                            null :
                            <SubMenu
                                popupClassName="submenu-header"
                                key="sub1"
                                title={
                                <span>
                                    <Icon type="appstore" />
                                    <span style={{fontSize:'21px',fontWeight:'700'}}><u>{this.props.userInfo.name+' '+this.props.userInfo.lastName}</u></span>
                                </span>
                                }
                            >
                                <Menu.Item key="5"><a href={"/account/"+PARAMETROS.FORM.CHATBOTS} ><Icon type="robot" />Chatbots</a></Menu.Item>
                                <Menu.Item key="6"><a href={"/account/"+PARAMETROS.FORM.USER_INFO}><Icon type="profile" />{this.props.translate.myProfile}</a></Menu.Item>
                            </SubMenu>
                    }
                    <Menu.Item key="2"><a rel="noopener noreferrer" href="/contact"       >{this.props.translate.contact}</a> </Menu.Item>
                    <Menu.Item key="3"><a rel="noopener noreferrer" href="/about"         >{this.props.translate.about}</a></Menu.Item>
                    <Menu.Item key="4"><a rel="noopener noreferrer" href="/services"      >{this.props.translate.services}</a></Menu.Item>
                    <Menu.Item key="5"><a rel="noopener noreferrer" href="/prices"        >{this.props.translate.prices}</a></Menu.Item>
                    {
                        this.props.userInfo==false ?
                            <Menu.Item key="7" className="li-no-hover" style={{height:'60px'}}>
                                <Button  type="primary" block
                                        className="btn-shadow-login"
                                        onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                                        style={{marginBottom:'20%',height:'60px',backgroundColor:'#E0E6E5',verticalAlign:'bottom',color:'black',fontWeight:'500',fontSize:'20px',padding:'8px 8px 8px 8px' }}
                                >
                                    {this.props.translate.login}
                                </Button>
                            </Menu.Item>
                            : null
                    }
                </Menu>
            </div>
        ) ;
    }
    //
}
//
export default NavMenu ;
//