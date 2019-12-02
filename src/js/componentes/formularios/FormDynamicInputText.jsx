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
        this.id           = 0 ;
        this.keys         = [] ;
        // this.state        = { keys:[] } ;
    }
    //
    componentDidMount(){
        this.id   = 0 ;
        this.keys = [] ;
    }
    //
    remove(k){
        if (this.keys.length === 1) {
          return;
        }
        let tempKeys = this.keys.filter(key => key !== k) ;
        this.keys         = tempKeys ;
        this.forceUpdate() ;
        // this.setState({keys: tempKeys })
      };
      //
      add(){
        //
        let tempKeys = this.keys.concat(this.id++);
        this.keys    = tempKeys ;
        this.forceUpdate() ;
        //  this.setState({keys: tempKeys }) ;
      };
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 4 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 20 } } };
        const formItems      = this.keys.map((k, index) => {
                return(
                    <Form.Item
                        {...formItemLayout}
                        required={true}
                        key={k}
                        hasFeedback
                        //validateStatus="error"
                    >
                        {
                            getFieldDecorator(`${this.props.fieldName}[${k}]`,
                            {
                                type: this.props.type,
                                required: true,
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
                            (<Input placeholder={this.props.textPlaceholder} size="large" style={{ width: '90%' }} ref={(argRef)=>{ argRef.focus(); }} />)}
                        { this.keys.length > 1 ? ( <Icon style={{marginLeft:'10px'}} className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} /> ) : null}
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