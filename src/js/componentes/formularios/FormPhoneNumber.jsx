/*
*
*/
import React                               from 'react' ;
import { Form, Input, Select, Icon }       from 'antd'  ;
//
export class FormPhoneNumber extends React.Component {
    constructor(props){
        super(props) ;
        this.anyValidation = this.anyValidation.bind(this) ;
    } ;
    //
    anyValidation(rule, value, callback){
        // const { form } = this.props;
        if ( String(value).length<10) {
            // 'El número debe ser al menos 10 digitos, incluyendo el prefijo, por ejemplo 1112345678'
         callback( `${value} invalido. El número debe contener al menos 10 digitos, incluyendo el prefijo, por ejemplo 1112345678` );
        } else {
         callback();
        }
    };
    //
    /*
    <FormPhoneNumber  form={this.props.form} onSelect={()=>{}} initialValue={this.state.fields.celular}  />
    */
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        //
        const prefixCountry = getFieldDecorator('prefix', {
            initialValue: '549'
        })(
            <Select style={{ width: 70 }}
                getPopupContainer={(trigger) => { return trigger.parentNode ; }}
            >
            <Option value="549">+54 9 Argentina </Option>
            <Option value="550">+55 0 Brasil</Option>
            <Option value="591">+591 Bolivia</Option>
            <Option value="56">+56 Chile</Option>
            <Option value="521">+52 1 Mexico</Option>
            <Option value="595">+595 Paraguay</Option>
            <Option value="5">+51 Perú</Option>
            <Option value="598">+598 Uruguay</Option>
            </Select>
        );
        //
        return(
            <Form.Item hasFeedback  style={{height:'60px'}} >
                {getFieldDecorator('celular',{
                    suppressWarning: true,
                    trigger: 'onBlur',
                    valuePropName: 'defaultValue',
                    initialValue: this.props.initialValue ? this.props.initialValue : "",
                    normalize: (value,prev,all)=>{
                        let tempNum = false ;
                        if ( value ){
                            tempNum = String(value).trim() ;
                            if ( !isNaN(tempNum) ){ tempNum=parseInt(tempNum); }
                        }
                        return tempNum ;
                    },
                    rules: [
                        { suppressWarning: true, type: 'number', required: true, message: 'Por favor, ingrese un télefono movil' },
                        { validator: this.anyValidation }
                        //{ type: 'number',min: 10, message: 'El número debe ser al menos 10 digitos, incluyendo el prefijo, por ejemplo 1112345678' },
                        //{ suppressWarning: true, type: 'number', message: 'Por favor, ingrese solo números' }
                    ]
                })
                (
                    <Input placeholder="Whatsapp / Teléfono"
                        className="waiboc-ec-form-input"
                        addonBefore={prefixCountry}
                        prefix={ <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onBlur={this.props.onChangeInput}
                    />
                )}
            </Form.Item>
        )
    }
    //
} ;
//