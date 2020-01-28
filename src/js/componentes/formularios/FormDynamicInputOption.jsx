/*
*
*/
import React                                         from 'react' ;
import { Form, Input, Icon, Button, Row, Col, Select }       from 'antd'  ;
//
const { CustomReply }   = window.waiboc ;
//  <CustomReply datos={{output: text}} flagTimestamp={false} />
//
export class FormDynamicInputOption extends React.Component {
    constructor(props){
        super(props) ;
        this.nodeFocus    = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        this.handleSelectChange   = this.handleSelectChange.bind(this) ;
        this.state        = {
            // keys:[],
            flagFocusInput: false,
            labels: [],
            values: [],
            initialValues: this.props.initialValues || [],
            keys: this.props.initialValues.length>0 ? this.props.initialValues.map((elem,elemKey)=>{ return elemKey; }) : [],
            focus: this.props.focus ? this.props.focus : false
        } ;
    }
    //
    componentDidMount(){
        // this.id   = 0 ;
        //this.state.keys = [] ;
        //
        let fieldArrayValues       = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
        let tempKeys               = fieldArrayValues.map((elem,index)=>{ return index; }) ;
        /*
        console.log('.....Didmount:: tempKeys: ') ;
        console.dir(tempKeys) ;
        */
        this.setState({keys: tempKeys}) ;
        //
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.initialValues.length!=state.initialValues.length ){
            let newState = {
                initialValues: newProps.initialValues,
                keys: newProps.initialValues.map((elem,elemKey)=>{ return elemKey; })
            } ;
            return newState ;
        } else {
            return false ;
        }
    }
    //
    remove(k){
        if (this.state.keys.length === 1) {
          return;
        }
        let tempKeys = this.state.keys.filter(key => key !== k) ;
        this.setState({keys: tempKeys})  ;
        // this.forceUpdate() ;
        // this.setState({keys: tempKeys })
    };
    //
    add(){
    //
    // let tempId   = this.state.ids++ ;
    //let tempKeys = this.state.keys.concat( tempId );
    let tempKeys = this.state.keys.concat( this.state.keys.length );
    this.setState({keys: tempKeys, flagFocusInput: true })  ;
    // this.forceUpdate() ;
    //  this.setState({keys: tempKeys }) ;
    };
    //
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            type: value
        });
        if ( value ){
            this.setState({fieldPanel: value})
        }
    };
    //
    render(){
        //
        const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form ;
        //
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 4 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, md:{span:6}, lg:{span:6}, xl:{span:6}, xxl:{span:6} } };
        //
        const formItems      = this.state.keys.map((k, index) => {
                let tempInitialObject = (this.state.initialValues[k] && typeof this.state.initialValues[k]=='object') ? this.state.initialValues[k] : {label:'',value: false} ;
                return(
                    <div key={k}>
                        <Row key={k}>
                            <Col xs={24} md={24} lg={11} xl={11} xxl={11} key={"this.props.fieldName_"+k+"_label"}>
                                <Form.Item
                                    //{...formItemLayout}
                                    required={true}
                                    key={"this.props.fieldName_"+k+"_label"}
                                    hasFeedback
                                >
                                    {
                                        getFieldDecorator(`${this.props.fieldName}[${k}].label`,
                                        {
                                            type: this.props.type,
                                            required: true,
                                            initialValue: tempInitialObject.label ,
                                            validateTrigger: ['onChange', 'onBlur'],
                                            suppressWarning: true,
                                            rules: [ {suppressWarning: true, type:  this.props.defaultTypefield, required: true, message: this.props.description,
                                            }, ],
                                        })
                                        (
                                            <Input placeholder={this.props.textPlaceholderLabel} size="large" style={{ width: '80%' }}
                                                ref={(argRef)=>{ if ( this.state.flagFocusInput==true ){ argRef.focus();} }}
                                            />
                                        )}
                                    { this.state.keys.length > 0 ? ( <Icon style={{marginLeft:'10px'}} className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} /> ) : null}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={11} xl={11} xxl={11} key={"this.props.fieldName_"+k+"_value"} >
                                <Form.Item
                                    //{...formItemLayout}
                                    required={true}
                                    key={"this.props.fieldName_"+k+"_value"}
                                    hasFeedback
                                >
                                    {
                                        getFieldDecorator(
                                            `${this.props.fieldName}[${k}].value`,
                                            {
                                                rules: [{ required: true, message: this.props.description, whitespace: true }],
                                                ...(tempInitialObject.value==false ? {} : {initialValue:tempInitialObject.value})
                                            }
                                        )
                                        (
                                            <Select
                                                placeholder={this.props.textPlaceholderValue}
                                                onchange={
                                                    (argValue)=>{
                                                        let objDummy = {} ;
                                                        objDummy[ `${this.props.fieldName}[${k}].value` ] = argValue ;
                                                        this.props.form.setFieldsValue( objDummy );
                                                    }
                                                }
                                                getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                                                size="large"
                                            >
                                                {
                                                    Object.values(this.props.chatbotTraining).map((elemEntity,idxEntity)=>{
                                                            return(
                                                                <Select.Option value={elemEntity.entity} key={idxEntity}>
                                                                    <b>{elemEntity.entity}</b>
                                                                </Select.Option>
                                                                )
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                )
            });
        //
        return (
            <div>
                {formItems}
                <Form.Item >
                    <Button type="dashed" onClick={this.add} size="large" style={ this.props.styleButton ? this.props.styleButton : { width: '80%' }} >
                        <Icon type="plus" /> <span style={{fontWeight:'600'}}>{this.props.textAdd} </span>
                    </Button>
                </Form.Item>
            </div>
        );
        //
    }
    //
} ;
//