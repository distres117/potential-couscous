import TestComponent from '../../components/test.jsx';
import {expect} from 'chai';
import React from 'react';
import {mount, shallow} from '../helpers/mount.helper';
import {startGetReadyToLoad, noWork} from '../../redux/actions/gpService.actions';


xdescribe('Test component', ()=>{
    it('renders shallow', ()=>{
        let wrapped = shallow(TestComponent, {readyToLoad:{}}, true);
        expect(wrapped).to.exist;
        wrapped.find('button').simulate('click');
        expect(wrapped.find('h1')).to.have.length(1);
        expect(wrapped.dispatchArray).to.have.length(1);
    });
    it('renders deep', ()=>{
        let state = {
            readyToLoad:{
                featureClasses:[
                    'test1','test2','test3'
                ],
            },
            clicked:false
        };
        //Redux actions will not be carried out!!
        //We can only track and assert which actions were dispatched
        let wrapped = mount(TestComponent, state);
        //wrapped.find('button').simulate('click');
        expect(wrapped).to.exist;
        expect(wrapped).dispatched(startGetReadyToLoad); //custom assertions to check if action was dispatched
        expect(wrapped).not.dispatched(noWork);
        expect(wrapped).dispatches.equal(1);
    });
});