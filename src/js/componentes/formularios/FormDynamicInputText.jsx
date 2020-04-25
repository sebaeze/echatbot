/*
*
*/
import React                               from 'react' ;
import { Form, Input, Icon, Button }       from 'antd'  ;
//
//let id   = 0 ;
//let keys = [] ;
//
export class FormDynamicInputText extends React.Component {
    constructor(props){
        super(props) ;
        this.nodeFocus     = false ;
        this.refButtonMore = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        //this.id           = 0 ;
        //this.state.keys         = [] ;
        this.state        = { keys:[], flagFocusInput: false, focus: this.props.focus ? this.props.focus : false } ;
        this.setRefButton = this.setRefButton.bind(this) ;
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
        return false ; // { listaBots: newProps.listaBots } ;
    }
    //
    setRefButton(argRef){
        if ( argRef && this.refButtonMore==false && this.props.focus && this.props.focus==true ){
            this.refButtonMore = argRef ;
            console.log('...oy a hacer focus:: this.refButtonMore: ',this.refButtonMore) ;
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
    render(){
        //
        const { getFieldDecorator, getFieldValue } = this.props.form ;
        let fieldArrayValues                       = getFieldValue( this.props.fieldName ) || [] ;
        //
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 4 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 20 } } };
        //
        const formItems      = this.state.keys.map((k, index) => {
                /*
                console.log('....render:: k: '+k+' dddd: '+index+' field: '+`${this.props.fieldName}[${k}]`+';') ;
                console.dir(fieldArrayValues) ;
                */
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
                                <Input placeholder={this.props.textPlaceholder} size="large" style={{ width: '90%' }}
                                    ref={(argRef)=>{ if ( this.state.flagFocusInput==true ){ argRef.focus();} }}
                                />
                            )}
                        { this.state.keys.length > 0
                            ? ( <Icon style={{marginLeft:'10px'}} className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} /> )
                            : null}
                    </Form.Item>
                )
            });
        //
        return (
            <div>
                {formItems}
                <Form.Item {...formItemLayout}>
                    <Button onClick={this.add} size="large"
                            className="waiboc-btn-dynamic-text"
                    >
                        <div ref={this.setRefButton} >
                            <Icon type="plus-circle" />
                            <span   style={{fontWeight:'600'}}
                            >{this.props.textAdd} </span>
                        </div>
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