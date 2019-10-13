/*
*
*/
import React, { Component       }            from 'react' ;
import Sidebar                               from "react-sidebar" ;
import Nav                                   from 'react-bootstrap/Nav' ;
//
import '../../../css/estilosAdminPanel.css'  ;
import 'bootstrap/dist/css/bootstrap.min.css' ;
//
class MenuAdmin extends Component {
  constructor(props) {
    super(props) ;
    this.state                 = {sidebarOpen:props.sidebarOpen} ;
    // this.onSetSidebarOpen      = this.onSetSidebarOpen.bind(this) ;
    this.onClickCerrarPanel    = this.onClickCerrarPanel.bind(this) ;
    // this.onClickOverlaySidebar = this.onClickOverlaySidebar.bind(this) ;
  }
  //
  componentDidMount(){
      try {
      } catch(errDidMount){ console.dir(errDidMount); }
  }
  //
  componentWillReceiveProps(nextProps) {
      this.setState({ sidebarOpen: nextProps.sidebarOpen });
      /* No controla el estado previo, por que al cerrar al apretar desde el Overlay, se pierde el estado */
  }
  //
  /*
  onSetSidebarOpen(open) {
    console.log('....onSetopen::open: '+open) ;
    this.setState({ sidebarOpen: open });
  }
  */
  //
  /*
  onClickOverlaySidebar(argEvent){
    argEvent.preventDefault() ;
    let tempFlag = 
    this.setState({ sidebarOpen: open });
    if (this.props.open) {
      this.props.onSetOpen(false);
    }
  }
  */
  //
  onClickCerrarPanel(argEvent) {
    argEvent.preventDefault() ;
    this.setState({ sidebarOpen: false });
  }
  //
  render() {
    //
    const ItemsMenu = () => {
      return (
        <div style={{marginTop:'50%'}}>
          <Nav className="mt-5" defaultActiveKey="/admin" className="flex-column" variant="dark">
            <Nav.Link onClick={this.onClickCerrarPanel.bind(this)} href="#">Cerrar Menu</Nav.Link>
            <Nav.Link href="/admin">Productos</Nav.Link>
            <Nav.Link href="/admin/usuarios">Usuarios</Nav.Link>
            <Nav.Link href="/admin/Ventas">Ventas</Nav.Link>
          </Nav>
        </div>
      ) } ;
    //
    return (
        <Sidebar
            sidebar={ <ItemsMenu /> }
            open={this.state.sidebarOpen}
            shadow={true}
            touch={true}
            transitions={true}
            onSetOpen={ this.props.onSetSidebarOpen.bind(this)}
            rootClassName={"menu-admin-sidebar-root"}
            sidebarClassName={"menu-admin-sidebar-panel"}
            contentClassName={"menu-admin-sidebar-contenido"}
        >
            <br/><br/>
        </Sidebar>
        ) ;
      //
    }
  }
/* */
export default MenuAdmin ;
/* */