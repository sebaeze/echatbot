/*
* TablaTraining
*/
import React                                               from 'react' ;
import { Table, Form, Input, Button, notification }        from 'antd'  ;
import { api }                                             from '../../api/api' ;
import { FormNewIntent }                                   from '../formularios/FormNewIntent' ;
//
const EditableContext = React.createContext();
//
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
//
const EditableFormRow = Form.create()(EditableRow);
//
class EditableCell extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            editing: false,
        } ;
        this.toggleEdit = this.toggleEdit.bind(this) ;
        this.save       = this.save.bind(this) ;
        this.renderCell = this.renderCell.bind(this) ;
    }
  //
  toggleEdit(){
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };
  //
  save(e){
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  //
  renderCell(form){
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };
  //
  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
//
export class TablaTraining extends React.Component {
    constructor(props){
        super(props) ;
        this.onChange       = this.onChange.bind(this) ;
        this.parseColumns   = this.parseColumns.bind(this)   ;
        this.onChangeSearch = this.onChangeSearch.bind(this) ;
        this.handleSave     = this.handleSave.bind(this) ;
        this.onAcceptNewIntent      = this.onAcceptNewIntent.bind(this) ;
        this.saveChangesToTrainning = this.saveChangesToTrainning.bind(this) ;
        this.state = {
            modalNewIntent: false,
            flagCachedProps: false,
            flagSpinner: false,
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
    parseColumns(){
        let outCols = [] ;
        try {
            //
            outCols = [
                {title: 'Domain',
                        width: 200,dataIndex:'domain', key:'domain',fixed: 'left',editable: true,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.domain.localeCompare(b.domain)
                } ,
                {title: 'Intend',
                        dataIndex: 'entity',width:200,key: 'entity',fixed: 'left',editable: true,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.entity.localeCompare(b.entity)
                },
                {title: 'Examples',width: 200,
                        dataIndex:'examples', key:'examples',editable: true,
                        render: (text) => {
                            /*
                            console.log('....render::examples:: text: ') ;
                            console.dir(text) ;
                            */
                            let tempTT = Array.isArray(text)==true ? text.join(' - ') : text ;
                            return( <div>
                                    <a style={{fontWeight:'700',color:'#497EC0'}} >{tempTT}</a>
                                </div>
                            )}
                        //defaultSortOrder: 'descend', sorter: (a, b) => a.examples.localeCompare(b.examples)
                },
                {title: 'Answer'       ,width: 200,dataIndex:'answer',key:'answer',editable: true
                        //render: (text) => <a style={{fontWeight:'700',color:'#497EC0'}} >{text}</a>,
                        //defaultSortOrder: 'descend', sorter: (a, b) => a.status.localeCompare(b.status) } ,
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
        let tempArrayTraining = this.state.arrayTraining ;
        tempArrayTraining.push({
          key: tempArrayTraining.length,
          answer: argNewIntent.intentAnswer,
          domain: argNewIntent.domain||'default',
          examples: argNewIntent.intentExamples||argNewIntent.examples||[],
          entity: argNewIntent.intentName
        });
        this.setState({arrayTraining:tempArrayTraining,modalNewIntent: false}) ;
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
    handleSave(row){
        const newData = [...this.state.arrayTraining];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ arrayTraining: newData });
    };
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
                  //message: <h1>putooo</h1>,
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
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };
        //
        const columns = this.state.columnas.map(col => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
              }),
            };
          });
        //
        let arrayDatos = [] ;
        if ( this.state.textBusqueda.length==0 ){
            arrayDatos = this.state.arrayTraining ;
        } else {
            this.state.arrayTraining.forEach((elemTC,elemIdx)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    arrayDatos.push( {...elemTC} ) ;
                }
            }) ;
        }
        //
        return(
            <div>
                <FormNewIntent  onAccept={this.onAcceptNewIntent}
                                data={false}
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
                    //columns={this.state.columnas}
                    dataSource={ arrayDatos }
                    columns={columns}
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