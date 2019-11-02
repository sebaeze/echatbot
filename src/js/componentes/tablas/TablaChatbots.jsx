/*
*
*/
import React                                        from 'react' ;
import { Table, Typography, Input, Button }         from 'antd'  ;
//
const { Title } = Typography ;
//
export class TablaChatbots extends React.Component {
    constructor(props){
        super(props) ;
        this.rowSelection   = this.rowSelection.bind(this) ;
        this.onChange       = this.onChange.bind(this)     ;
        this.onChangeSearch = this.onChangeSearch.bind(this) ;
        this.parseColumns   = this.parseColumns.bind(this) ;
        this.onClickCreateNewChatbot = this.onClickCreateNewChatbot.bind(this) ;
        let tempColumn      = this.parseColumns() ;
        this.state          = {
            arrayChatbots: [],
            arrayChatbotsMuestra: [] ,
            textBusqueda: '',
            arraySeleccionados:[],
            columnas: tempColumn
        } ;
        //
    }
    //
    componentDidMount(){
        try {
            if ( this.state.userInfo ){
                api.chatbot.qry({idUser: this.state.userInfo._id})
                    .then((respQry)=>{
                        console.dir(respQry) ;
                        this.setState({arrayChatbots: respQry, arrayChatbotsMuestra: respQry}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                    }) ;
            }
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    /*
    static getDerivedStateFromProps(newProps, state) {
        let tempArrayTasas = parseTasas( newProps.tasas ) ;
        //let tempColumn     = this.parseColumns() ;
        return { arrayTasas: tempArrayTasas, arrayTasasMuestra: tempArrayTasas  } ;
    }
    */
    onClickCreateNewChatbot(argEE){
        try {
            argEE.preventDefault() ;
        } catch(errOCNC){
            console.dir(errOCNC) ;
        }
    }
    //
    parseColumns(){
        let outCols = [] ;
        try {
            //
            outCols = [
                {title: 'Id',
                        width: 200,dataIndex:'_id', key:'_id',
                        render: text => <span style={{fontWeight:'700',color:'#497EC0'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a._id.localeCompare(b._id) } ,
                {title:'Descripcion'     ,width: 150,dataIndex:'description',key:'description',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.description.localeCompare(b.description) } ,
                {title:'Plan'     ,width: 150,dataIndex:'plan',key:'plan',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.plan.localeCompare(b.plan) } ,
                {title:'Mensajes Consumidos'             ,width: 200,dataIndex:'tasa', key:'tasa',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.qtyMessages - b.qtyMessages } ,
                {title:'Lenguaje'    ,width: 200,dataIndex:'language', key:'language',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.language - b.language },
                {title:'Bot Nombre'          ,dataIndex:'botName', key:'botName' , defaultSortOrder: 'descend', sorter: (a, b) => a.botName.localeCompare(b.botName) },
                {title:'Bot Sub-leyenda'     ,dataIndex:'botSubtitle', key:'botSubtitle' , defaultSortOrder: 'descend', sorter: (a, b) => a.botSubtitle.localeCompare(b.botSubtitle) }
            ] ;
            //
        } catch(errPC){
            console.dir(errPC) ;
        }
        return outCols ;
    }
    //
    onChangeSearch(argEventSearch){
        try {
            argEventSearch.preventDefault() ;
            let tempValorBuscar = argEventSearch.target.value || argEventSearch.target.innerText || '' ;
            this.setState({textBusqueda: tempValorBuscar}) ;
        } catch(errOCS){
            console.dir(errOCS) ;
        }
    }
    //
    rowSelection(){
        try {
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({arraySeleccionados:selectedRows}) ;
                    if ( this.props.sel ){
                        this.props.sel( selectedRows ) ;
                    }
                  },
                  getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',
                    name: record.name,
                  })
            }
        } catch(errRS){
            console.dir(errRS) ;
        }
    }
    //
    onChange(pagination, filters, sorter){
        this.setState({ pagination: pagination });
    }
    //
    render(){
        //
        let arrayDatos = [] ;
        if ( this.state.textBusqueda.length==0 ){
            arrayDatos = this.state.arrayChatbots ;
        } else {
            this.state.arrayChatbots.forEach((elemTC)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    arrayDatos.push( elemTC ) ;
                }
            }) ;
        }
        //
        return(
            <div>
                <div style={{width:'100%',marginTop:'20px',marginBottom:'15px'}}>
                    <Input placeholder={this.props.translate.search}
                           onChange={this.onChangeSearch}
                           style={{height:'42px',marginLeft:'10px', width:'20%'}}
                    />
                    <Button type="primary" size={"large"} style={{marginLeft:'10px'}} className="btn-edit-menu"  onClick={this.onClickCreateNewChatbot} >
                      {this.props.translate.newChatbot}
                    </Button>
                </div>
                <Table
                    style={{padding:'10px 10px 10px 10px '}}
                    rowSelection={{...this.rowSelection()}}
                    columns={this.state.columnas}
                    pagination={{position:'top'}}
                    dataSource={ arrayDatos }
                    onChange={this.onChange.bind(this)}
                    bordered
                    locale={this.props.translate}
                />
            </div>
        )
    }
    //
} ;
//