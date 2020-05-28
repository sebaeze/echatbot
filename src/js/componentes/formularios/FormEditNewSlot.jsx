//
import React                                             from 'react' ;
import { Button, Form, Input, Drawer, Icon }             from 'antd'  ;
import { Row, Col }                                      from 'antd'  ;
//
const log = require('debug')('WAIBOC:FormEditNewSlot') ;
//
export class FormEditNewSlotBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode            = false ;
        this.state              = {
            flagSpinner: false,
            modalVisible: this.props.modalVisible,
            data: this.props.data || {}
        } ;
        this.setRefFocus        = this.setRefFocus.bind(this) ;
        this.onSubmitForm       = this.onSubmitForm.bind(this) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.modalVisible!=state.modalVisible ){
            let newState = {} ;
            if ( newProps.modalVisible!=state.modalVisible ){
                newState.modalVisible = newProps.modalVisible ;
                newState.data = newProps.data ;
            } ;
            return newState ;
        } else {
            return false ;
        }
    }
    //
    setRefFocus(argRef){
        if ( argRef && (window.innerWidth>797) ){
            argRef.focus() ;
        }
    }
    //
    onSubmitForm(argEE){
        try {
            //
            if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
            //
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false }) ;
                    }, 700 ) ;
              } else {
                  //
                  let tempFields = this.props.form.getFieldsValue() ;
                  console.log('...tempFields: ',tempFields,';') ;
                  this.props.onAccept( tempFields ) ;
                  //
              }
            });
        } catch(errFS){
            console.dir(errFS) ;
        }
    }
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        let propsButtonSub = this.state.flagSpinner==true ? {disabled: true} : { onClick: this.onSubmitForm   } ;
        let propsButtonCan = this.state.flagSpinner==true ? {disabled: true} : { onClick: this.props.onCancel } ;
        //
        return(
            <Drawer
                title={
                    <div style={{width:'100%',color:'#012EFF', fontSize:'26px',fontWeight:'600'}} >
                        <div style={{marginLeft:'35%',height:'50px',lineHeight:'50px'}} >
                            <Icon type="edit" style={{color:'green'}}/>
                            <span style={{marginLeft:'1%',color:'#012EFF',textAlign:'center',padding:'5px 5px 5px 5px', marginBottom:'0'}} >
                                {this.state.data.name||''}
                            </span>
                        </div>
                    </div>
                }
                destroyOnClose={true}
                width={ (window.innerWidth<797) ? '99%' : '70%' }
                placement="right"
                closable={true}
                className="waiboc-drawer"
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onCancel={this.props.onCancel}
                onClose={this.props.onCancel}
                footer={null}
            >
                <Row style={{paddingTop:'30px'}} >
                <Col xs={0}  md={0}  lg={2}  xl={2}  xxl={2} ></Col>
                <Col xs={24} md={24} lg={20} xl={20} xxl={20} >
                    <Form className="waiboc-cl-form" >
                        <Form.Item
                            hasFeedback
                            labelCol={  {xs: 24, md: 24, lg: 24, xl: 24, xxl: 24}}
                            wrapperCol={{xs: 24, md: 20, lg: 24, xl: 24, xxl: 24}}
                            label={ <span className="form-label" placement="bottomRight" title={this.props.translate.tooltip.chatbotName} >
                                        Slot {this.props.translate.form.name}
                                        <Icon type="question-circle-o" />
                                    </span>
                                    }
                        >
                            {getFieldDecorator('name', {
                                initialValue: this.props.data.name||'',
                                normalize: (value)=>{ return (value || '').toUpperCase()},
                                rules: [
                                    { required: true, message: this.props.translate.form.errorSlotName, whitespace: true },
                                    { pattern: new RegExp('^[-_a-zA-Z0-9]+$') , message: this.props.translate.form.errorInvalidSlotName }
                                ]
                            })
                            (<Input allowClear size="large" ref={this.setRefFocus} addonBefore="##" />)}
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            labelCol={  {xs: 24, md: 24, lg: 24, xl: 24, xxl: 24}}
                            wrapperCol={{xs: 24, md: 20, lg: 24, xl: 24, xxl: 24}}
                            label={ <span className="form-label" placement="bottomRight" title={this.props.translate.tooltip.chatbotName} >
                                        {this.props.translate.form.botSlotQuestion}
                                        <Icon type="question-circle-o" />
                                    </span>
                                    }
                        >
                            {getFieldDecorator('question', {
                                initialValue: this.props.data.question||'',
                                rules: [
                                    { required: true, message: this.props.translate.form.errorSlotQuestion, whitespace: true }
                                ]
                            })
                            (<Input allowClear size="large" />)}
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label={ false }
                            labelCol={  {xs: 24, md: 24, lg: 24, xl: 24, xxl: 24}}
                            wrapperCol={{xs: 24, md: 20, lg: 24, xl: 24, xxl: 24}}
                            label={ <span className="form-label" placement="bottomRight" title={this.props.translate.tooltip.chatbotName} >
                                        {this.props.translate.table.description}
                                        <Icon type="question-circle-o" />
                                    </span>
                                    }
                        >
                            {getFieldDecorator('description', {
                                initialValue: this.props.data.description||'',
                                rules: [{ required: false, message: this.props.translate.form.errorSlotQuestion, whitespace: true }]
                            })
                            (<Input allowClear size="large" />)}
                        </Form.Item>
                        <Form.Item style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'30px' }} >
                            <Button type="primary" size="large" {...propsButtonSub} >
                                <Icon type="save" />
                                {this.props.translate.form.savechanges}
                            </Button>
                            <Button size="large" {...propsButtonCan} style={{marginLeft:'10px'}} >
                                <Icon type="close-circle" />
                                {this.props.translate.cancel}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            </Drawer>
        ) ;
    }
    //
} ;

//
export const FormEditNewSlot = Form.create({ name: 'FormEditNewSlot',
    mapPropsToFields(props) {
        return {
            name:            Form.createFormField({ value: props.data.name          || "" }),
            question:        Form.createFormField({ value: props.data.question      || "" }),
            description:     Form.createFormField({ value: props.data.description   || "" })
        };
    }
})(FormEditNewSlotBase);
//