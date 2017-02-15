import { mount } from '../../helpers/mount.helper';
import LoadComponent from '../../../components/transactions/load.component';
import { TransactionLoadModel } from '../../../models/transaction.models';
import { expect } from 'chai';

let extraAttrs;
describe('load transaction', () => {
    beforeEach(() => {
        extraAttrs = {
            people: [
                { label: 'testPerson1', value: 1 }
            ]
        }
    });
    it('should disable submit button when form is invalid', () => {
        let state = _.assign(extraAttrs,{
            current:{
                isNull: ()=>false
            }
        })
        let wrapped = mount(LoadComponent, state);
        expect(wrapped.findWhere(n => n.text() === 'Submit').node.disabled).to.be.true;
    });
    it('should enable submit button when form is valid and prepopulate correctly', () => {
        let state = _.assign(extraAttrs,{
            current:{
                isNull:()=>false,
                sdePerson: 1,
                submitName: 'testData'
            }
        })
        let wrapped = mount(LoadComponent, state);
        expect(wrapped.findWhere(n => n.text() === 'Submit').node.disabled).to.be.false;
        expect(wrapped.find("select[name='sdePerson']").node.value).to.equal('1');
        expect(wrapped.find("input[name='submitName']").node.value).to.equal('testData');
    });
});