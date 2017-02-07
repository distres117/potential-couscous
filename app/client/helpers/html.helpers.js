import React from 'react';
import { DateField, DatePicker } from 'react-date-picker';
import {formStyles} from '../components/styles/element.styles';

export default {
    labelFor(title){
        return <label className='col-lg-3 control-label'>{title}</label>
    },
    dropDownFor(name,items=[],change, ref, noDefault=false, cls){
        return (
            <div className={cls || 'col-lg-8'}>
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
    asyncDropdownFor(name, items=[], change,ref,hook,cls){
        if (!hook()){
            return (
                <div>
                    <div hidden={hook()}>
                        {this.dropDownFor(name,items,change,ref,cls)}
                    </div>
                </div>);
        }
        return (//TODO: swap this out with something more interesting
            <div className='col-lg-8'>
                <h4>Fetching...</h4>
            </div>
        )
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
    buttonFor(name,title,classStyling, ref){
        return(
            <button className={classStyling} name={name} ref={ref}>{title}</button> 
        );
    },
    asyncButtonFor(name, title, hook, classStyling, processStyling, ref){
        if (!hook)
            return this.buttonFor(name,title,classStyling,ref);
        return <div className={processStyling}></div>
    },
    textAreaFor(name, change, ref){
        return (
            <div className='col-lg-8'>
                <textarea className='form-control' onChange={change} name={name} ref={ref} />
            </div>
        )
    },
    textFieldFor(name, change, ref, cls, placeholder=''){
        return(
            <div className={cls || 'col-lg-8'}>
                <input type='text' placeholder={placeholder} className='form-control' onChange={change} name={name} ref={ref}/>
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
    asyncPanelFor(hook,title,markup){
        if (!hook)
            return this.panelFor(title, 
                <div style={{textAlign:'center'}}>
                    <div style={{display:'inline-block'}} className='loader'></div>
                </div>
            )
        return this.panelFor(title,markup);
        
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

    },
    collapsibleFor(title, markup){
        return (
            <div className='col-lg-8 col-lg-offset-3'>
                <a role='button' data-toggle='collapse' href='#collapsible'>{title}</a>
                <div className='collapse' id='collapsible'>
                    {markup}
                </div>
            </div>
        )        

    }
}