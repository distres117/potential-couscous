import C_TestComponent, {TestComponent} from '../../components/test.jsx';
import {expect} from 'chai';
import React from 'react';
import {mount, shallow} from '../helpers/mount.helper';
import {startGetReadyToLoad, noWork} from '../../redux/actions/gpService.actions';

describe('Test component', ()=>{
    it('renders shallow', ()=>{
        let {wrapped, dispatchArray} = shallow(TestComponent, {readyToLoad:{}}, true);
        expect(wrapped).to.exist;
        wrapped.find('button').simulate('click');
        expect(wrapped.find('h1')).to.have.length(1);
        expect(dispatchArray).to.have.length(1);
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
        let {wrapped, dispatchArray} = mount(TestComponent, state,true);
        wrapped.find('button').simulate('click');
        expect(wrapped).to.exist;
        expect(dispatchArray).to.have.length(2);
        expect(dispatchArray[0](startGetReadyToLoad)).to.be.true;
        expect(dispatchArray[1](noWork)).to.be.true;
    });
});