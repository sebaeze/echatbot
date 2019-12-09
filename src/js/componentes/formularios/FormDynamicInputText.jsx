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
        this.nodeFocus    = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        //this.id           = 0 ;
        //this.state.keys         = [] ;
        this.state        = { keys:[] } ;
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
        let tempKeys = this.state.keys.concat( (this.state.keys.length++) );
        this.setState({keys: tempKeys })  ;
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
                        //validateStatus="error"
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
                                    /*
                                   transform(value) {
                                        console.log('...estoy en transform:: value: '+value) ;
                                        if ( this.props.defaultTypefield=='url' ){

                                        } else {
                                            return String(value).trim();
                                        }
                                  },
                                  */
                                 /*
                                  validator(rule,value,callback){
                                      console.log('....validator:: value: '+value) ;
                                      console.dir(rule) ;
                                      if ( rule.type=="email" ){
                                        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        return re.test(String(value).toLowerCase());
                                      } else {

                                      }
                                  }
                                  */
                                }, ],
                            })
                            (<Input placeholder={this.props.textPlaceholder} size="large" style={{ width: '90%' }}
                                ref={(argRef)=>{ argRef.focus(); }}
                            />)}
                        { this.state.keys.length > 0 ? ( <Icon style={{marginLeft:'10px'}} className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} /> ) : null}
                    </Form.Item>
                )
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