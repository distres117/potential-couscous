import {mount, shallow} from '../../helpers/mount.helper';
import {expect} from 'chai';
import TransactionSubmit from '../../../components/transactions/submit.component';
import {TransactionSubmitModel} from '../../../models/transaction.models';

function changeValue(elem,name,val){
    elem.find(`select[name="${name}"]`).simulate('change', {target:{name:name, value:val}});
}

describe('submit transaction', ()=>{
   it('should not enable submit button when form is invalid', ()=>{
       let model = new TransactionSubmitModel();
       let state = {
           transaction:{model},
           readyToLoad:{featureClasses:[], loaded:true},
           people:[],
           versions:[]
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
            people:[],
            versions:[]
       }
       let wrapped = mount(TransactionSubmit,state);
       wrapped.find("select[name='action']").simulate('change', {target:{name: 'action', value: 'test'}}); //must change at least one value to trigger validation
       expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.false;
   });
   it('should not enable submit if version is not populated', ()=>{
       let model = new TransactionSubmitModel();
       model.action = 'New';
       model.dataType = 1;
       model.submitName='sde.SDE.test1';
       model.submitPerson = 1;
       let state = {
           transaction:{model},
           readyToLoad:{
               featureClasses:[], 
               loaded:true
            },
            people:[],
            versions: []
       }
       let wrapped = mount(TransactionSubmit,state);
       expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.true;
   });
   it('should populate model predictably', ()=>{
       let model = new TransactionSubmitModel();
       model.submitPerson = 1;
       model.submitName = 'test_data';
       let state = {
           transaction:{model},
           readyToLoad:{
               featureClasses:[], 
               loaded:true
            },
            people:[],
            versions: []
       }
       let wrapped = mount(TransactionSubmit,state);
       //changeValue(wrapped, 'submitPerson', 1);
       changeValue(wrapped, 'action', 'New');
       changeValue(wrapped, 'dataType', "1");
       //changeValue(wrapped, 'submitName', 'test_data');
       expect(model.isValid()).to.be.true;

   }); 
});