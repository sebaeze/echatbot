/*
*
*/
import React, { Component }      from 'react'        ;
import Fade                      from 'react-reveal/Fade'  ;
import { productos }             from '../../api/apiProductos' ;
//
class ListaCategoriasFiltro extends Component {
  constructor(props) {
    super(props);
    this.state         = {categorias:[],flagShowCategorias:!(window.innerWidth<=760)} ;
    this.onClickToggle = this.onClickToggle.bind(this) ;
  }
  //
  componentWillReceiveProps(nextProps) {
    let arrayOrdenado = nextProps.arrayCategorias.sort((a,b)=>{ return b.cantidad-a.cantidad;} ) ;
    this.setState({ categorias: arrayOrdenado,flagShowCategorias:nextProps.defaultOpen });
  }
  //
  componentDidMount(){
    try {
        //
        //let flagDefaultOpen = (this.props.defaultOpen && this.props.defaultOpen==false) ? this.props.defaultOpen : true ;
        //console.log('ppp: '+this.props.defaultOpen+' flag: '+flagDefaultOpen) ;
        //if ( this.props.defaultOpen && this.props.defaultOpen==false ){ flagDefaultOpen=false; }
        this.setState({flagShowCategorias:this.props.defaultOpen}) ;
        //
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        //
        let arrayOrdenado = this.props.arrayCategorias.sort((a,b)=>{ return b.cantidad-a.cantidad;} ) ;
        this.setState({categorias:arrayOrdenado}) ;
        //
    } catch(errInfo){ console.dir(errInfo); }
  }
  //
  onClickToggle(){
    try{
        this.setState({flagShowCategorias:!this.state.flagShowCategorias}) ;
      } catch(errTog){
        console.dir(errTog) ;
      }
  }
  //
  resize() {
    this.setState({flagShowCategorias: !(window.innerWidth <= 760)});
  }
  //
  render() {
    //
    return (
        //
        <div className="list-group mb-0 mt-2">
            <span className="font-weight-bold mb-2 mas-productos sans-serif font-16-px" onClick={ this.onClickToggle.bind(this) } >
                {this.props.mensaje}{this.state.flagShowCategorias==true ? '-' : '+'}
            </span>
            <Fade bottom when={this.state.flagShowCategorias}>
                <div style={this.state.flagShowCategorias==true ? {} : {display:'none'} } className="mt-3">
                    {
                        this.state.categorias.map( (elemCateg) => {
                            return(
                                <a key={this.props.tipo+elemCateg.id} href={elemCateg.url} className="list-group-item list-group-item-action">
                                    {elemCateg.id}<span className="badge badge-pill badge-primary pull-right">{elemCateg.cantidad}</span>
                                </a>
                            )
                        })
                    }
                </div>
            </Fade>
        </div>
        //
    )
  }
  //
}
/* */
export default ListaCategoriasFiltro ;
/* */