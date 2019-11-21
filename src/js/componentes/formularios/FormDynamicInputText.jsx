/*
*
*/
import React                               from 'react' ;
import { Form, Input, Icon, Button }       from 'antd'  ;
//
let id   = 0 ;
let keys = [] ;
//
export class FormDynamicInputText extends React.Component {
    constructor(props){
        super(props) ;
        this.nodeFocus    = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        // this.state        = { keys:[] } ;
    }
    //
    componentDidMount(){
        id   = 0 ;
        keys = [] ;
    }
    //
    remove(k){
        if (keys.length === 1) {
          return;
        }
        let tempKeys = keys.filter(key => key !== k) ;
        keys         = tempKeys ;
        this.forceUpdate() ;
        // this.setState({keys: tempKeys })
      };
      //
      add(){
        //
        let tempKeys = keys.concat(id++);
        keys         = tempKeys ;
        this.forceUpdate() ;
        //  this.setState({keys: tempKeys }) ;
      };
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        //
        const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 4 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 20 } } };
        const formItems      = keys.map((k, index) => {
//                console.log('.....(D) render:: formItems:: k: '+k+' index: '+index+';') ;
                return(
                    <Form.Item
                        {...formItemLayout}
                        required={false}
                        key={k}
                        hasFeedback
                    >
                        {
                            getFieldDecorator(`${this.props.fieldName}[${k}]`, {
                                type: this.props.type,
                                required: true,
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [ { whitespace: true, message: this.props.description }, ],
                            })
                            (<Input placeholder="email@dominio.com" size="large" style={{ width: '90%' }} ref={(argRef)=>{ argRef.focus(); }} />)}
                        { keys.length > 1 ? ( <Icon style={{marginLeft:'10px'}} className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} /> ) : null}
                    </Form.Item>
                )
            });
        //
        return (
            <div>
                {formItems}
                <Form.Item {...formItemLayout}>
                    <Button type="dashed" onClick={this.add} size="large" style={{ width: '60%' }}>
                        <Icon type="plus" /> Add {this.props.type}
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