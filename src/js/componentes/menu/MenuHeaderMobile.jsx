/*
*
*/
import React                                  from 'react' ;
import { Row, Col, Drawer }                   from 'antd'  ;
import { NavMenu     }                        from './NavMenu' ;
import { BotonMenuResponsive }                from '../botones/BotonMenuResponsive'  ;
//
export class MenuHeaderMobile extends React.Component {
    //
    constructor(props){
        super(props) ;
        this.state = {
            flagDrawerVisible: false
        }
        this.onClickMenu     = this.onClickMenu.bind(this) ;
    } ;
    //
    onClickMenu(argEE){
        try {
            let tempFlag = !this.state.flagDrawerVisible ;
            this.setState({flagDrawerVisible: tempFlag}) ;
        } catch(errCM){
            console.log(errCM) ;
        }
    }
    //
    render(){
        return(
            <div>
                <Drawer
                    title={ <h2 style={{width:'100%',textAlign:'center'}} >Menu</h2> }
                    width={ '99%' }
                    onClose={()=>{ this.setState({flagDrawerVisible: false})} }
                    visible={this.state.flagDrawerVisible}
                    bodyStyle={{ padding:'3px 3px 3px 3px' }}
                    placement={"right"}
                    className="waiboc-drawer"
                    getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                >
                    <NavMenu
                            translate={this.props.translate}
                            isMobile={this.props.isMobile}
                            translate={this.props.translate}
                            marcas={this.props.marcas}
                            userInfo={this.props.userInfo}
                            categorias={this.props.categorias}
                            onClickMenu={this.onClickMenu}
                    />
                </Drawer>
                <div onClick={this.onClickMenu} style={{marginTop:'11px',height:'40px'}}  >
                    <BotonMenuResponsive  />
                </div>
            </div>
        )
    }
    //
} ;
//