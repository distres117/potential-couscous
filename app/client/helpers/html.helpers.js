import React from 'react';
import { DateField, DatePicker } from 'react-date-picker';
import 'react-date-picker/index.css';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

export default {
    labelFor(title){
        return <label className='col-sm-2 control-label'>{title}</label>
    },
    dropDownFor(name,initial,items,change){
        let initialElem = initial ? (<option>{initial}</option>) : null;
        return (
            <select name={name} onChange={change} >
                {initialElem}
                {items.map((it,i)=>{
                    let v = it.value || it;
                    it = it.label || it;
                    return <option value={v} key={i}>{it}</option>
                })}
            </select> 
        );
        // let _items = items.map((it,i)=>{
        //     return {value: i, label: it}
        // });
        // return (
        //     <div className='form-control'>
        //         <Select name={name} options = {_items} onChange={change}/>
        //     </div>
            
        // )
    },
    datePickerFor(name, change){
        return (
            <DateField dateFormat="YYYY-MM-DD" forceValidDate={true} updateOnDateClick={true} collapseOnDateClick={true} defaultValue={Date.now()} showClock={false}>
                <DatePicker name={name} navigation={true} locale="en" forceValidDate={true} highlightWeekends={false} highlightToday={false} weekNumbers={true} weekStartDay={0} footer={false} onChange={change}/>
            </DateField>
        );
    },
    buttonFor(name,title,clicked, style){
        return(
            <button style={style} name={name} onClick={clicked}>{title}</button> 
        );
    },
    textAreaFor(name, change, style){
        return (
            <textarea style={style} onChange={change} name={name}/>
        )
    }
}