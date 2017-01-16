import {mount,shallow} from '../../helpers/mount.helper';
import Transactions from '../../../components/transactions';
import {expect} from 'chai';

describe('transactions', ()=>{
    it('should render submit transaction component', ()=>{
        let state = {
            transaction:{mode:'create'},
            current: {isNull: ()=>false}
        };
        let wrapped = mount(Transactions,state);
        let result = wrapped.findWhere(n=> n.type()==='h3' && n.text()==='Submit Transaction');
        expect(result).lengthOf(1);
    });
    it('should render review transaction form', ()=>{
        let state = {
            transaction:{mode:'review'},
            current: {isNull: ()=>false}
        };
        let wrapped = mount(Transactions,state);
        let result = wrapped.findWhere(n=> n.type()==='h3' && n.text()==='Review Transaction');
        expect(result).lengthOf(1);
    });
    it('should render load transaction form', ()=>{
        let state = {
            transaction:{mode:'load'},
            current: {isNull: ()=>false}
        };
        let wrapped = mount(Transactions,state);
        let result = wrapped.findWhere(n=> n.type()==='h3' && n.text()==='Load Transaction');
        expect(result).lengthOf(1);
    });
    it('should render message that transaction is closed but still display info', ()=>{
        let state = {
            transaction:{mode:'none'},
            current: {isNull: ()=>false}
        };
        let wrapped = mount(Transactions,state);
        let result = wrapped.findWhere(n=> n.text()==='This transaction is closed');
        let result2 = wrapped.findWhere(n=>n.text()==='Transaction Info');
        expect(result).length.above(0);
        expect(result2).length.above(0);
    });
    it('should render message that no transactions are selected and not show info', ()=>{
        let state = {
            transaction:{mode:'none'},
            current: {isNull: ()=>true}
        };
        let wrapped = mount(Transactions,state);
        let result = wrapped.findWhere(n=> n.text()==='No transactions are selected');
        let result2 = wrapped.findWhere(n=>n.text()==='Transaction Info').first().parents().find("div[hidden=true]");
        expect(result).length.above(0);
        expect(result2).length.above(0);
    });
});