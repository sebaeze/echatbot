/*
*
*/
import React                               from 'react' ;
import { Form, Input, Icon, Button }       from 'antd'  ;
//
export class FormDynamicInputText extends React.Component {
    constructor(props){
        super(props) ;
        this.nodeFocus     = false ;
        this.refButtonMore = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        this.state        = { keys:[], flagFocusInput: false, focus: this.props.focus ? this.props.focus : false } ;
        this.setRefButton = this.setRefButton.bind(this) ;
    }
    //
    componentDidMount(){
        let fieldArrayValues       = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
        let tempKeys               = fieldArrayValues.map((elem,index)=>{ return index; }) ;
        this.setState({keys: tempKeys}) ;
    }
    //
    setRefButton(argRef){
        if ( argRef && this.refButtonMore==false && this.props.focus && this.props.focus==true ){
            this.refButtonMore = argRef ;
            // console.log('...oy a hacer focus:: this.refButtonMore: ',this.refButtonMore) ;
            setTimeout(() => {
                this.refButtonMore.focus() ;
            }, 0);
        }
    }
    //
    remove(k){
        //
        if (this.state.keys.length === 0) { return; }
        let tempKeys = this.state.keys.filter(key => key !== k) ;
        this.setState({keys: tempKeys})  ;
    };
    //
    add(){
        let tempKeys = this.state.keys.concat( this.state.keys.length );
        this.setState({keys: tempKeys, flagFocusInput: true })  ;
    };
    //
    render(){
        //
        const { getFieldDecorator, getFieldValue } = this.props.form ;
        let fieldArrayValues                       = getFieldValue( this.props.fieldName ) || [] ;
        //
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 4 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 20 } } };
        //
        const formItems      = this.state.keys.map((k, index) => {
                return(
                    <Form.Item
                        {...formItemLayout}
                        required={true}
                        key={"this.props.fieldName_"+k}
                        hasFeedback
                    >
                        {
                            getFieldDecorator(`${this.props.fieldName}[${k}]`,
                            {
                                type: this.props.type,
                                required: true,
                                initialValue: fieldArrayValues[k]||'' ,
                                validateTrigger: ['onChange', 'onBlur'],
                                suppressWarning: true,
                                rules: [ {suppressWarning: true, type:  this.props.defaultTypefield, required: true, message: this.props.description,
                                }, ],
                            })
                            (
                                <Input  placeholder={this.props.textPlaceholder} size="large" style={{ width: '90%' }}
                                        disabled={this.props.disabled}
                                    ref={(argRef)=>{ if ( this.state.flagFocusInput==true ){ argRef.focus();} }}
                                />
                            )
                        }
                        { (this.state.keys.length>0 && this.props.disabled==false)
                            ?   <span className="dynamic-delete-button">
                                    <Icon style={{marginLeft:'10px'}} type="minus-circle-o" onClick={() => this.remove(k)} />
                                </span>
                            :   null
                        }
                    </Form.Item>
                )
            });
        //
        return (
            <div>
                {formItems}
                {
                            this.props.disabled==true
                                ?   <div></div>
                                :   <Form.Item {...formItemLayout}>
                                        <Button onClick={this.add} size="large"
                                                className="waiboc-btn-dynamic-text"
                                        >
                                            <div ref={this.setRefButton} >
                                                <Icon type="plus-circle" />
                                                <span   style={{fontWeight:'600'}}
                                                >{this.props.textAdd}</span>
                                            </div>
                                        </Button>
                                    </Form.Item>
                        }
                <Form.Item {...formItemLayout}></Form.Item>
            </div>
        );
        //
    }
    //
} ;
//