import React from 'react';
import { DateField, DatePicker } from 'react-date-picker';
import {formStyles} from '../components/styles/element.styles';

export default {
    labelFor(title){
        return <label className='col-lg-2 control-label'>{title}</label>
    },
    dropDownFor(name,items=[],change, ref, noDefault=false){
        return (
            <div className='col-lg-8'>
                <select className='form-control'name={name} onChange={change} style={formStyles.dropDown} ref={ref} >
                    <option></option>
                    {items.map((it,i)=>{
                        let v = it.value !== undefined ? it.value : it;
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
    textAreaFor(name, change, ref){
        return (
            <div className='col-lg-8'>
                <textarea className='form-control' onChange={change} name={name} ref={ref} />
            </div>
        )
    },
    textFieldFor(name, change, ref){
        return(
            <div className='col-lg-8'>
                <input type='text' className='form-control' onChange={change} name={name} ref={ref}/>
            </div>
        )
    },
    panelFor(title, markup){
        return (
            <div>
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
    },
    infoPaneFor(items, cur, headerField){
        function getMarkup(_items){
            if (!_items)
                return;
            return _items.map((it,i)=>{
                let val = it.format ? it.format(cur[it.key]) : cur[it.key];
                let group = `${it.label}: ${val}`;
                let cls = val && group.length > 30 ? 12 : 6;
                return (
                    <div className={`col-lg-${cls}`} key = {i}>
                        <div className='form-group'>
                            <label className='control-label'>{it.label}:</label>
                            <span> {val || 'None'}</span>
                        </div>
                    </div>
                )
            })
        }
        let cls = {lineHeight: '2px'};
        let headerElem = cur[headerField] ? (
            <div>
                <p><i>{cur[headerField]}</i></p>
                <hr/>
            </div>
        ) : null;
        return (
            <div>
                {headerElem}
                <div style={cls}>
                    {getMarkup(items)}
                </div>
            </div>
        );

    }
}