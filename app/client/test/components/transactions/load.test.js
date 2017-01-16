import {mount} from '../../helpers/mount.helper';
import LoadComponent from '../../../components/transactions/load.component';
import {TransactionLoadModel} from '../../../models/transaction.models';
import {expect} from 'chai';

describe('load transaction', ()=>{
    it('should disable submit button when form is invalid', ()=>{
        let model = new TransactionLoadModel();
        //model.sdePerson = 1;
        //model.submitName = 'testData';
        let state = {
            transaction:{model}
        };
        let wrapped = mount(LoadComponent,state);
        expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.true;
    });
    it('should enable submit button when form is valid and prepopulate correctly', ()=>{
        let model = new TransactionLoadModel();
        model.sdePerson = 1;
        model.submitName = 'testData';
        let state = {
            transaction:{model},
            people:[
                {label: 'testPerson1', value: 1}
            ]
        };
        let wrapped = mount(LoadComponent,state);
        expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.false;
        expect(wrapped.find("select[name='sdePerson']").node.value).to.equal('1');
        expect(wrapped.find("input[name='submitName']").node.value).to.equal(model.submitName);
    });
});