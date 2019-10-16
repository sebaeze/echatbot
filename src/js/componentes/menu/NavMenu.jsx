/*
*
*/
import React, { Component }        from 'react' ;
import { Menu, Divider          }  from 'antd' ;
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
            <Menu
                theme="light"
                mode={ this.props.isMobile ? "vertical" : "horizontal" }
                style={ this.props.isMobile ? {} : { width: '100%',lineHeight: '100px', fontSize: '24px', float:'right', marginRight: '1%' }}
            >
                <Menu.Item key="1"><a rel="noopener noreferrer" href="/contacto"      >{this.props.translate.contact}</a> </Menu.Item>
                <Menu.Item key="2"><a rel="noopener noreferrer" href="/nosotros"      >{this.props.translate.about}</a></Menu.Item>
                <Menu.Item key="3"><a rel="noopener noreferrer" href="/services"      >{this.props.translate.services}</a></Menu.Item>
                <Menu.Item key="4"><a rel="noopener noreferrer" href="/prices"        >{this.props.translate.prices}</a></Menu.Item>
            </Menu>
        ) ;
    }
    //
}
//
export default NavMenu ;
//