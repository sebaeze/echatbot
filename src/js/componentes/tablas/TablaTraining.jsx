/*
* TablaTraining
*/
import React                                               from 'react' ;
import { Table, Input, Button, notification, Icon, Tag }   from 'antd'  ;
import moment                                              from 'moment-timezone'  ;
import { api }                                             from '../../api/api' ;
import { FormNewIntent }                                   from '../formularios/FormNewIntent' ;
//
export class TablaTraining extends React.Component {
    constructor(props){
        super(props) ;
        this.onChange       = this.onChange.bind(this) ;
        this.parseColumns   = this.parseColumns.bind(this)   ;
        this.onChangeSearch = this.onChangeSearch.bind(this) ;
        this.onAcceptNewIntent      = this.onAcceptNewIntent.bind(this) ;
        this.onClickEditIntent      = this.onClickEditIntent.bind(this) ;
        this.saveChangesToTrainning = this.saveChangesToTrainning.bind(this) ;
        this.state = {
            modalNewIntent: false,
            flagCachedProps: false,
            flagSpinner: false,
            intentNewModify: false,
            textBusqueda: '',
            chatbotConfig: this.props.chatbotConfig,
            arrayTraining: Object.values(this.props.chatbotConfig.trainning),
            columnas: this.parseColumns()
        } ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( state.flagCachedProps==false ){
            let tempArrayTraining = Object.values(newProps.chatbotConfig.trainning) ;
            if ( tempArrayTraining.length==0 ){
                tempArrayTraining=[
                    {
                                "domain":"WELCOME",
                                "entity":"WELCOME.INITIAL",
                                "examples":["WELCOME.INITIAL"],
                                "answer":{
                                        //type:'option',
                                        type:'carousel',
                                        title:"<div><span>Hola !</span><span>Gracias por contactarme</span><span>En que te puedo ayudar ?</span></div>",
                                        options:[
                                            {label:"Ayuda",value:"trolo"},
                                            {label:"Nose",value:"2"},
                                            {label:"Que se yo",value:"3"},
                                            {label:"Vose",value:"4"}
                                        ] }
                            },
                            {
                                "domain":"chat",
                                "entity":"chat.greeting",
                                "examples":["hola","hi","como andas ?","que haces?","que hacias?"],
                                "answer":{type:'text',answer:"Hola, ¿ como te puedo ayudar ?"}
                            },
                            {
                                "domain":"chat",
                                "entity":"chat.chau",
                                "examples":["me voy","chau","ya fue","nos vemos","ahi nos olemos"],
                                "answer": {type:"image",source:"/img/china.jpg"}
                            },
                            {
                                "domain":"simpsons",
                                "entity":"simpsons.nerd",
                                "examples":["nerd","inteligente","anda a estudiar"],
                                "answer": {type:"image",source:"/img/nerd.gif"}
                            },
                            {
                                "domain":"simpsons",
                                "entity":"simpsons.fanatico",
                                "examples":["simpsons","ay caramba!","a la grande le puse cuca","marge"],
                                "answer": {type:"option",title:"Fanatico de los simpsons, deberas elejir:",
                                    options:[
                                    {value:"hola",label:"mandando saludosss"},
                                    {value:"lavadora",label:"La lavadora"},
                                    {value:"caja",label:"la caja"}
                                ]}
                            },
                            {
                                "domain":"simpsons",
                                "entity":"simpsons.plandental",
                                "examples":["plan dental"],
                                "answer":{type:'text',answer:"Liza necesita frenos"}
                            },
                            {
                                "domain":"simpsons",
                                "entity":"simpsons.lizanecesitarenos",
                                "examples":["Liza necesita frenos"],
                                "answer":{type:'text',answer:"plan dental"}
                            },
                            {
                                "domain":"puteadas",
                                "entity":"puteadas.mal",
                                "examples":["putaso","trolo","hijo de puta","HDP","concha de tu madre",],
                                "answer": {type:"image",source:"/img/escribir.gif",alt:"Lo voy a anotar en mi maquina de escribir invisible"}
                            }
                    ];
            }
            tempArrayTraining = tempArrayTraining.map((elemTT,elemIDD)=>{
                return {...elemTT,key: elemIDD}
            }) ;
            /*
            console.dir(tempArrayTraining) ;
            console.dir(newProps) ;
            console.dir(state) ;
            */
            return { chatbotConfig: newProps.chatbotConfig, arrayTraining: tempArrayTraining, flagCachedProps: true  } ;
        } else {
            return false ;
        }
    }
    //
    onClickEditIntent(argRowIntent){
        try {
            //
            let tempIntent2Modify = {
                intentNewModify:{
                    intentName: argRowIntent.entity ,
                    intentLanguage: argRowIntent.language||'es' ,
                    intentExamples: argRowIntent.examples ,
                    intentDomain: argRowIntent.domain ,
                    intentAnswer: argRowIntent.answer
                },
                modalNewIntent: true
            } ;
            this.setState( {...tempIntent2Modify} ) ;
            //
        } catch(errOCI){
            console.dir(errOCI) ;
        }
    }
    //
    parseColumns(){
        let outCols   = [] ;
        let tagColors = ['geekblue','blue','volcano','lime-5','gold-4','magenta-3'] ;
        try {
            //
            outCols = [
                {title: this.props.translate.table.intent ,
                        dataIndex: 'entity',width:200,key: 'entity',
                        render: (text,argRow) => {
                            return(
                                <div>
                                    <a style={{fontWeight:'600',fontSize:'20px',color:'#497EC0'}}
                                        onClick={(argEE)=>{argEE.preventDefault();this.onClickEditIntent(argRow);}}
                                    >
                                        <Icon type="edit" style={{color:'green'}}/>
                                        <span style={{marginLeft:'5px'}}>{text}</span>
                                    </a>
                                </div>
                        )},
                        defaultSortOrder: 'descend', sorter: (a, b) => a.entity.localeCompare(b.entity)
                },
                {title: this.props.translate.table.examples ,width: 200,
                        dataIndex:'examples', key:'examples',
                        render: (text) => {
                            let tempTT = Array.isArray(text)==true ?
                                        text.map((elemTT,idxTT)=>{
                                            let color = idxTT<tagColors.length ? idxTT : (idxTT % tagColors.length) ;
                                            color     = tagColors[ color ] ;
                                            return (
                                                <span key={idxTT} style={{fontWeight:'500',display:'block',width:'100%'}} >
                                                    <Tag color={color}>{elemTT}</Tag>
                                                </span>
                                            )
                                        })
                                        : text ;
                            return(
                                <div>
                                    {tempTT}
                                </div>
                              )}
                },
                {title: this.props.translate.table.answer       ,width: 200,dataIndex:'answer',key:'answer',
                        render: (text) =>
                            <div>
                                <span>{this.props.translate.form.answerType}: </span>
                                <span style={{fontWeight:'600'}}>{text.type}</span><hr/>
                                <span>{text.title||''}</span><br/>
                                <span>{text.text||text.answer||''}</span><br/>
                                <span>{text.image||''}</span><br/>
                                {
                                    (text.options && text.options.length>0) ?
                                        text.options.map((elemObj,idx)=>{
                                            return (
                                                <div key={idx}>
                                                    <span style={{fontWeight:'600'}}>{elemObj.label}: </span>
                                                    <span>{elemObj.value}</span>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                        :
                                        null

                                }
                            </div>
                },
                {title: 'Timestamp' ,
                        width: 100,dataIndex:'timestamp_last_update', key:'timestamp_last_update',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.domain.localeCompare(b.domain)
                },
                {title: this.props.translate.table.domain ,
                        width: 200,dataIndex:'domain', key:'domain',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.domain.localeCompare(b.domain)
                }
            ] ;
            //
        } catch(errPC){
            console.dir(errPC) ;
        }
        return outCols ;
    }
    //
    onChange(pagination, filters, sorter){
        this.setState({ pagination: pagination });
    }
    //
    onAcceptNewIntent(argNewIntent){
      try {
        //
        console.log('.....onAcceptNewIntent:: ',argNewIntent) ;
        let tempNewIntent = {
            answer: argNewIntent.intentAnswer,
            domain: argNewIntent.domain||'default',
            examples: argNewIntent.intentExamples||argNewIntent.examples||[],
            entity: argNewIntent.intentName,
            timestamp_last_update: moment( new Date() ).tz("America/Argentina/Buenos_Aires").format()
        };
        let tempArrayTraining = this.state.arrayTraining ;
        let indexIntent       = tempArrayTraining.findIndex((elemIntent)=>{ return elemIntent.entity.toUpperCase()==tempNewIntent.entity.toUpperCase() ; }) ;
        if ( indexIntent!=-1 ){
            tempArrayTraining[indexIntent] = Object.assign({...tempArrayTraining[indexIntent]},tempNewIntent) ;
        } else {
            tempNewIntent.creation_ts = moment( new Date() ).tz("America/Argentina/Buenos_Aires").format() ;
            tempArrayTraining.push( tempNewIntent ) ;
        }
        this.setState({arrayTraining:tempArrayTraining,modalNewIntent: false, intentNewModify: false}) ;
        this.saveChangesToTrainning() ;
        //
      } catch(errNI){
        console.dir(errNI) ;
      }
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
    saveChangesToTrainning(){
        try {
            //
            let chatbotTrain = {
              _id: this.state.chatbotConfig._id,
              train: {}
            } ;
            for ( let idTrain=0; idTrain<this.state.arrayTraining.length; idTrain++ ){
              let objIntent = {...this.state.arrayTraining[ idTrain ]} ;
              delete objIntent.key ;
              let idIntent  = objIntent.entity ;
              chatbotTrain[ idIntent ] = objIntent ;
            }
            //
            const openNotificationWithIcon = (type,argText) => {
              notification[type]({
                  //message: <h1>holaaa</h1>,
                  top: 180,
                  description: <h2>{argText}</h2>
              });
            } ;
            //
            api.chatbot.train( chatbotTrain )
                .then((respTrain)=>{
                  if ( respTrain==false ){
                    openNotificationWithIcon('error',this.props.translate.form.userNotAuthorized) ;
                  } else {
                    openNotificationWithIcon('success',this.props.translate.form.changesSaved) ;
                  }
                })
                .catch((respErr)=>{
                  console.dir(respErr) ;
                }) ;
            //
        } catch(errSC){
            console.dir(errSC) ;
        }
    }
    //
    render(){
        //
        let arrayDatos = [] ;
        if ( this.state.textBusqueda.length==0 ){
            arrayDatos = this.state.arrayTraining.map((elemTC,elemIdx)=>{ return {...elemTC,key: elemIdx} ; }) ;
        } else {
            this.state.arrayTraining.forEach((elemTC,elemIdx)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    arrayDatos.push( {...elemTC, key: elemIdx} ) ;
                }
            }) ;
        }
        //
        return(
            <div>
                <FormNewIntent  onAccept={this.onAcceptNewIntent}
                                data={this.state.intentNewModify}
                                modalVisible={this.state.modalNewIntent}
                                onCancelModal={(argEE)=>{argEE.preventDefault();this.setState({modalNewIntent:false})}}
                                translate={this.props.translate}
                />
                <div style={{width:'100%',marginTop:'20px',marginBottom:'15px'}}>
                    <Input placeholder={this.props.translate.search}
                           onChange={this.onChangeSearch}
                           style={{height:'42px',marginLeft:'10px', width:'20%'}}
                    />
                    <Button onClick={(argEE)=>{argEE.preventDefault(); this.setState({modalNewIntent: true});}} type="primary" size="large" style={{ marginLeft: '15px' }}>
                      {this.props.translate.form.newIntent}
                    </Button>
                    <Button onClick={this.saveChangesToTrainning} type="primary" size="large" style={{ marginLeft: '15px' }}>
                      {this.props.translate.form.savechanges}
                    </Button>
                </div>
                <Table
                    //rowSelection={{...this.rowSelection()}}
                    loading={this.state.flagSpinner}
                    //
                    columns={this.state.columnas}
                    dataSource={ arrayDatos }
                    rowKey="entity"
                    // columns={columns}
                    //components={components}
                    //
                    style={{marginLeft:'10px'}}
                    pagination={{position:'bottom'}}
                    onChange={this.onChange.bind(this)}
                    bordered
                    locale={this.props.translate}
                    scroll={{ x: 900 }}
                />
            </div>
        )
    }
    //
} ;
//