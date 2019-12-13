/*
*
*/
import React                               from 'react' ;
import { Form, Input, Button }       from 'antd'  ;
import Icon from '@ant-design/icons';
//
//let id   = 0 ;
//let keys = [] ;
//
export class FormDynamicInputText extends React.Component {
    constructor(props){
        super(props) ;
        this.nodeFocus    = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        this.state        = { keys:[], flagFocusInput: false } ;
        // console.log('.....FormDyna:: Constructor ') ;
    }
    componentDidUpdate(prevProps, prevState) {
        Object.entries(this.props).forEach(([key, val]) =>{
            if ( prevProps[key] !== val ){
                console.log(`Prop '${key}' changed. previous val: `+String(val).toString()+';');
                //console.dir(val);
            }
        });
        if (this.state) {
          Object.entries(this.state).forEach(([key, val]) =>
            prevState[key] !== val && console.log(`State '${key}' changed. previous val: `+String(val).toString()+';')
          );
        }
      }
    //
    componentDidMount(){
        let fieldArrayValues       = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
        let tempKeys               = fieldArrayValues.map((elem,index)=>{ return index; }) ;
        this.setState({keys: tempKeys}) ;
    }
    //
    /*
    static getDerivedStateFromProps(newProps, state) {
        // console.log('.....FormDyna:: getDerivedStateFromProps:: newProps: ') ;
        // console.dir(newProps) ;
        return false ;
    }
    */
    //
    remove(k){
        if (this.state.keys.length === 1) {
          return;
        }
        let tempKeys = this.state.keys.filter(key => key !== k) ;
        this.setState({keys: tempKeys})  ;
      };
      //
      add(){
          console.log('....add: newKey: '+this.state.keys.length+';') ;
        let tempKeys = this.state.keys.concat( this.state.keys.length );
        this.setState({keys: tempKeys, flagFocusInput: true })  ;
      };
    //
    render(){
        //
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form ;
        let fieldArrayValues = getFieldValue( this.props.fieldName ) || [] ;
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 4 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 20 } } };
        //
        const FormItemText = (props) => {
            try {
                console.log('.....field: '+`${props.fieldName}`+' --> keyinput:: '+String(props.fieldName+props.idx).replace('[','').replace(']','')+';') ;
                return(
                    <Form.Item
                        {...formItemLayout}
                        required={true}
                        key={ String(props.fieldName+props.k+props.idx).replace('[','').replace(']','') }
                        hasFeedback
                    >
                        {
                            getFieldDecorator(`${props.fieldName}`,
                            {
                                type: this.props.type,
                                required: true,
                                initialValue: props.fieldValue ,
                                validateTrigger: ['onChange', 'onBlur'],
                                suppressWarning: true,
                                rules: [ {suppressWarning: true, type: 'string', required: true, message: this.props.description }, ],
                            })
                            (<Input placeholder={`${props.fieldName}__key: `+String(props.fieldName+props.idx).replace('[','').replace(']','')} size="large" style={{ width: '90%' }}
                                ref={(argRef)=>{ if ( this.state.flagFocusInput==true ){ console.log('** voy a darle focussss');argRef.focus(); } }}
                            />)}
                        { this.state.keys.length > 0 ?
                            ( <Icon style={{marginLeft:'10px'}} className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(props.k)} /> )
                            : null
                        }
                    </Form.Item>
                )
            } catch(errFIT){
                console.dir(errFIT) ;
            }
        }
        //
        let tempKeys = [...this.state.keys] ;
        const formItems      = tempKeys.map((k, index) => {
            console.log('...K: '+k+' index: '+index+';') ;
            try {
                let tempFieldName = `${this.props.fieldName}[${k}]` ;
                let tempFieldType = this.props.defaultTypefield ;
                let tempfielValue = fieldArrayValues[k]||'' ;
                if ( this.props.defaultTypefield=="intentAnswer" ){
                    tempFieldName = `${this.props.fieldName}[${k}].type` ;
                    tempFieldType = 'string' ;
                    tempfielValue = tempfielValue['type'] ? tempfielValue['type'] : '' ;
                    let tempFieldAnswer = [
                                        {fieldName:`${this.props.fieldName}[${k}]`,fieldType:'string',fieldValue:'text'}
                                        // {fieldName:`${this.props.fieldName}[${k}].text`,fieldType:'string',fieldValue:'answer'}
                                    ] ;
                    return(
                        <div>
                            {
                                tempFieldAnswer.map((elemAnswer,idxAnws)=>{
                                    console.log('....map:: idxAnws: '+idxAnws+';') ;
                                    return(
                                        <FormItemText {...elemAnswer} k={k} idx={idxAnws} />
                                    )
                                })
                            }
                        </div>
                    )
                } else {
                    return(
                        <FormItemText key={tempFieldName} {...{idx:'0',k:k,fieldName: tempFieldName, fieldType: tempFieldType, fieldValue:tempfielValue}} />
                    )
                }
            } catch(errFItems){
                console.dir(errFItems) ;
            }
        });
        //
        return (
            <div>
                {formItems}
                <Form.Item {...formItemLayout}>
                    <Button type="dashed" onClick={this.add} size="large" style={{ width: '60%' }}>
                        <Icon type="plus" /> <span style={{fontWeight:'600'}}>{this.props.textAdd} </span>
                    </Button>
                </Form.Item>
                <Form.Item {...formItemLayout}></Form.Item>
            </div>
        );
        //
    }
    //
} ;
//