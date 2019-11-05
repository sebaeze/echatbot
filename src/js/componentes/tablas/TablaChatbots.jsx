/*
*
*/
import React                                        from 'react' ;
import { Table, Typography, Input, Button, Spin }   from 'antd'  ;
import { api }                                      from '../../api/api' ;
import { FormNewChatbot }                           from '../formularios/FormNewChatbot' ;
//
const { Title } = Typography ;
//
export class TablaChatbots extends React.Component {
    constructor(props){
        super(props) ;
        this.rowSelection   = this.rowSelection.bind(this) ;
        this.onCancelModal  = this.onCancelModal.bind(this) ;
        this.onChange       = this.onChange.bind(this)     ;
        this.onChangeSearch = this.onChangeSearch.bind(this) ;
        this.parseColumns   = this.parseColumns.bind(this) ;
        this.addNewChatbot  = this.addNewChatbot.bind(this) ;
        this.onClickCreateNewChatbot = this.onClickCreateNewChatbot.bind(this) ;
        let tempColumn      = this.parseColumns() ;
        this.state          = {
            userInfo: this.props.userInfo,
            modalVisible: false,
            arrayChatbots: [],
            textBusqueda: '',
            arraySeleccionados:[],
            columnas: tempColumn,
            flagSpinner: true
        } ;
        //
    }
    //
    componentDidMount(){
        console.log('....componentDidMount:: actual: '+this.props.userInfo.email) ;
        try {
            if ( this.props.userInfo && this.props.userInfo.email.length>0 ){
                this.setState({flagSpinner: true}) ;
                api.chatbot.qry({idUser: this.props.userInfo.email})
                    .then((respQry)=>{
                        respQry.forEach((elemCbot,elemIdx)=>{ elemCbot.key = elemIdx ; }) ;
                        this.setState({arrayChatbots: respQry, flagSpinner: false}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        this.setState({flagSpinner: false}) ;
                    }) ;
            } else {
                this.setState({flagSpinner: false}) ;
            }
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    componentDidUpdate(prevProps){
        try {
            console.log('....componentDidUpdate:: actual: '+this.props.userInfo.email+' previo: '+prevProps.userInfo.email) ;
            if ( this.props.userInfo.email!=prevProps.userInfo.email ){
                this.setState({flagSpinner: true}) ;
                api.chatbot.qry({idUser: this.props.userInfo.email})
                    .then((respQry)=>{
                        respQry.forEach((elemCbot,elemIdx)=>{ elemCbot.key = elemIdx ; }) ;
                        this.setState({arrayChatbots: respQry, flagSpinner: false}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        this.setState({flagSpinner: false}) ;
                    }) ;
            }
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { userInfo: newProps.userInfo } ;
    }
    /*
    static getDerivedStateFromProps(newProps, state) {
        //
        console.log('....getDerivedStateFromProps:: (A) email: '+newProps.userInfo.email+';') ;
        if ( newProps.userInfo ){
            api.chatbot.qry({idUser: newProps.userInfo.email}) ;
                .then((respQry)=>{
                    console.log('....getDerivedStateFromProps:: resuQry:') ;
                    console.dir(respQry) ;
                    return { userInfo: newProps.userInfo, arrayChatbots: respQry } ;
                })
                .catch((respErr)=>{
                    console.log('....getDerivedStateFromProps:: error:') ;
                    console.dir(respErr) ;
                    return { userInfo: newProps.userInfo } ;
                }) ;
        } else {
            return { userInfo: newProps.userInfo } ;
        }
        //
    }
    */
    //
    addNewChatbot(argObjChatbot){
        try {
            this.setState({flagSpinner: true}) ;
            api.chatbot.add(argObjChatbot)
                .then((respADD)=>{
                    if ( respADD.length>0 ){ respADD=respADD[0]; }
                    let tempArrayBots = this.state.arrayChatbots ;
                    tempArrayBots.push({
                        key:(tempArrayBots.length+1),
                        ...respADD
                    }) ;
                    this.setState({arrayChatbots: tempArrayBots, flagSpinner: false}) ;
                })
                .catch((respErr)=>{
                    console.dir(respErr) ;
                    this.setState({flagSpinner: false}) ;
                }) ;
                //
        } catch(errAddNC){
            console.dir(errAddNC) ;
        }
    }
    //
    onClickCreateNewChatbot(argEE){
        try {
            //
            argEE.preventDefault() ;
            if ( !this.state.modalVisible ){
                this.setState({modalVisible: true}) ;
            }
            //
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
                        width: 200,dataIndex:'_id', key:'_id',fixed: 'left',
                        render: text => <span style={{fontWeight:'700',color:'#497EC0'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a._id.localeCompare(b._id) } ,
                {title:'Bot Nombre'      ,dataIndex:'botName', key:'botName' , defaultSortOrder: 'descend', sorter: (a, b) => a.botName.localeCompare(b.botName) },
                {title:'Descripcion'     ,width: 150,dataIndex:'description',key:'description',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.description.localeCompare(b.description) } ,
                {title:'Plan'     ,width: 150,dataIndex:'plan',key:'plan',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.plan.localeCompare(b.plan) } ,
                {title:'Mensajes Consumidos'             ,width: 200,dataIndex:'qtyMessages', key:'qtyMessages',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.qtyMessages - b.qtyMessages } ,
                {title:'Lenguaje'    ,width: 200,dataIndex:'language', key:'language',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.language - b.language },
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
    onCancelModal(argEC){
        try {
            argEC.preventDefault() ;
            this.setState({modalVisible: false}) ;
        } catch(errOCM){
            console.dir(errOCM) ;
        }
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
                    rowSelection={{...this.rowSelection()}}
                    loading={this.state.flagSpinner}
                    columns={this.state.columnas}
                    pagination={{position:'top'}}
                    dataSource={ arrayDatos }
                    onChange={this.onChange.bind(this)}
                    bordered
                    locale={this.props.translate}
                    scroll={{ x: 1500 }}
                />
                <FormNewChatbot
                    modalVisible={this.state.modalVisible}
                    translate={this.props.translate}
                    onCancelModal={this.onCancelModal}
                    sel={
                        (argSel)=>{
                            this.setState({modalVisible: false }) ;
                            let tempNewCBot = {
                                ...argSel,
                                idUser: this.state.userInfo.email
                            } ;
                            this.addNewChatbot(tempNewCBot) ;
                        }
                    }
                />
            </div>
        )
    }
    //
} ;
//