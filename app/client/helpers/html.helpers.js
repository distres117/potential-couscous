import React from 'react';
import { DateField, DatePicker } from 'react-date-picker';
import 'react-date-picker/index.css';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

export default {
    labelFor(title){
        return <label className='col-lg-2 control-label'>{title}</label>
    },
    dropDownFor(name,initial,items,change){
        let initialElem = initial ? (<option>{initial}</option>) : null;
        return (
            <div className='col-lg-8'>
                <select className='form-control'name={name} onChange={change} >
                    {initialElem}
                    {items.map((it,i)=>{
                        let v = it.value || it;
                        it = it.label || it;
                        return <option value={v} key={i}>{it}</option>
                    })}
                </select>
            </div> 
        );
    },
    datePickerFor(name, change){
        return (
            <div className='col-lg-9'>
                <DateField dateFormat="YYYY-MM-DD" forceValidDate={true} updateOnDateClick={true} collapseOnDateClick={true} defaultValue={Date.now()} showClock={false}>
                    <DatePicker name={name} navigation={true} locale="en" forceValidDate={true} highlightWeekends={false} highlightToday={false} weekNumbers={true} weekStartDay={0} footer={false} onChange={change}/>
                </DateField>
            </div>
            
        );
    },
    buttonFor(name,title,clicked, classStyling){
        return(
            <button className={classStyling} name={name} onClick={clicked}>{title}</button> 
        );
    },
    textAreaFor(name, change, style){
        return (
            <div className='col-lg-8'>
                <textarea className='form-control' style={style} onChange={change} name={name}/>
            </div>
        )
    },
    panelFor(title, markup){
        return (
            <div className='row-align-items-center'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>{title}</h3>
                    </div>
                    <div className='panel-body'>
                        {markup}
                    </div>
                </div>
            </div>
        );
    }
}