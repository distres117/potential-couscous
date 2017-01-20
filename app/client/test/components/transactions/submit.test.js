import {mount, shallow} from '../../helpers/mount.helper';
import {expect} from 'chai';
import TransactionSubmit from '../../../components/transactions/submit.component';
import {TransactionSubmitModel} from '../../../models/transaction.models';
describe('submit transaction', ()=>{
   it('should not enable submit button when form is invalid', ()=>{
       let model = new TransactionSubmitModel();
       let state = {
           transaction:{model},
           readyToLoad:{featureClasses:[], loaded:true},
           people:[]
       }
       let wrapped = mount(TransactionSubmit, state);
       expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.true;

   });
   it('should enable submit button when form is valid',()=>{
       let model = new TransactionSubmitModel();
       model.action = 'New';
       model.dataType = 1;
       model.submitName='test1';
       model.submitPerson = 1;
       let state = {
           transaction:{model},
           readyToLoad:{
               featureClasses:[], 
               loaded:true
            },
            people:[]
       }
       let wrapped = mount(TransactionSubmit,state);
       wrapped.find("select[name='action']").simulate('change', {target:{name: 'action', value: 'test'}}); //must change at least one value to trigger validation
       expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.false;
   }) 
});