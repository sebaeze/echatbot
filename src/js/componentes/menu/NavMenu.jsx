/*
*
*/
import React, { Component }           from 'react' ;
import { Menu, Button, Row, Col }     from 'antd' ;
//
class NavMenu extends Component {
    constructor(props){
        super(props) ;
    }
    //
    componentDidMount(){}
    //
    render(){
        return(
            <div>
                <Menu
                    theme="light"
                    mode={ this.props.isMobile ? "vertical" : "horizontal" }
                    style={ this.props.isMobile ? {} : { width: '100%',lineHeight: '100px', fontSize: '24px', float:'right', marginRight: '1%' }}
                >
                    <Menu.Item key="1"><a rel="noopener noreferrer" href="/contact"       >{this.props.translate.contact}</a> </Menu.Item>
                    <Menu.Item key="2"><a rel="noopener noreferrer" href="/about"         >{this.props.translate.about}</a></Menu.Item>
                    <Menu.Item key="3"><a rel="noopener noreferrer" href="/services"      >{this.props.translate.services}</a></Menu.Item>
                    <Menu.Item key="4"><a rel="noopener noreferrer" href="/prices"        >{this.props.translate.prices}</a></Menu.Item>
                    <Menu.Item key="5" className="li-no-hover">
                            <Button  type="primary" block
                                    className="btn-shadow-login"
                                    onClick={(argEV)=>{argEV.preventDefault();location.href="/admin/account";}}
                                    style={{marginBottom:'20%',height:'60px',backgroundColor:'#E0E6E5',verticalAlign:'bottom',color:'black',fontWeight:'500',fontSize:'20px',padding:'8px 8px 8px 8px' }}
                            >
                                {this.props.translate.login}
                            </Button>
                    </Menu.Item>
                </Menu>
            </div>
        ) ;
    }
    //
}
//
export default NavMenu ;
//