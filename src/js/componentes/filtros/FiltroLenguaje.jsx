/*
*  FiltroLenguaje
*/
/*
*
*/
import React                    from 'react' ;
import { Select }               from 'antd'  ;
//
const arrayLangs = [
    {lang:"es",imagen:"/img/banderas/esp.png"},
    {lang:"pt",imagen:"/img/banderas/ptbr.png"},
    {lang:"en",imagen:"/img/banderas/eng.png"}
] ;
//
const toArrayOptions = ( translate, argOpt={size:"large"} ) => {
    //
    let outArray = [] ;
    //
    let classNameOption = argOpt.size=="large" ? "bissa-option-large" : "bissa-option-small"  ;
    for ( let keyLang=0; keyLang<arrayLangs.length; keyLang++ ){
        let item = arrayLangs[keyLang] ;
        outArray.push(
            <Select.Option value={item.lang} key={item.lang} className={"bissa-option "+classNameOption} >
                <img  className="waiboc-select-img"  src={item.imagen} alt={item.lang} />
                <span className="waiboc-select-name" >{item.lang}</span>
            </Select.Option>
        ) ;
    }
    //
    return outArray ;
} ;
//
export class  FiltroLenguaje  extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            inputSearch: '',
            seleccionados: []
        } ;
        this.onChange     = this.onChange.bind(this) ;
    }
    //
    onChange(selectedItems){
        try {
            //
            this.setState({ seleccionados:selectedItems });
            this.props.seleccion(selectedItems) ;
            //
        } catch(errOC){
            console.dir(errOC) ;
        }
    }
    //
    render(){
        //
        let defaultVal = navigator.language || navigator.languages[0] || "en" ;
        //
        const { customStyle } = this.props ;
        let arrayOptions = toArrayOptions( this.props.translate ,{size: "large"} ) ;
        let extraProps   = this.props.initialValue ? {defaultValue: this.props.initialValue} : {defaultValue: defaultVal} ;
        if ( this.props.id ){
            extraProps["id"] = this.props.id  ;
        }
        //
        return(
            <Select showSearch
                    filterOption={(input, option) =>{
                        let flagReturn = option.key.toUpperCase().indexOf(input.toUpperCase())!=-1 ;
                        return(flagReturn);
                    }}
                    {...extraProps}
                    size={"small"}
                    placeholder={this.props.translate.form.filterCifraPlaceholder}
                    optionFilterProp="children"
                    dropdownClassName="waiboc-select-dropdown-header"
                    onChange={this.onChange}
                    size="large"
                    style={{ width: '80%', lineHeight:'55px',marginLeft:'5%',...customStyle}}
                    onMouseDown={e => e.preventDefault()}
                    getPopupContainer={(trigger) => { return trigger.parentNode ; }}
                >
                    {arrayOptions}
            </Select>
        )
    }
    //
} ;
//