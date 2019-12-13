/*
* FormDynamicInputText.jsx
*/
import React                               from 'react' ;
import { Form, Input, Button }       from 'antd'  ;
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
        console.log('...render:: props:: '+`${this.props.fieldName}`+';') ;
        console.dir(Form) ;
        //
        return (
            <div>
                <Form.List name={`${this.props.fieldName}`}>
                    {(fields, { add, remove }) => {
                        console.log('.....form.List:: fields: '+fields+';') ;
                        console.dir(fields) ;
                        return (
                            <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? this.props.textAdd : ''}
                                required={false}
                                key={field.key}
                                >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input passenger's name or delete this field.",
                                    },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                    />
                                ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => { add(); }} style={{ width: '60%' }} >
                                    <PlusOutlined />{this.props.textAdd}
                                </Button>
                            </Form.Item>
                            </div>
                        );}
                    }
                </Form.List>
            </div>
        );
        //
    }
    //
} ;
//