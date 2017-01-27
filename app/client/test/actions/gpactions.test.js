import {expect} from 'chai';
import {startTransactionsDatasetSearch} from '../../redux/actions/transaction.actions';
import types from '../../redux/actions/action.types';
import configureMockStore from 'redux-mock-store';
import client from '../../services/axios.service';
import thunk from 'redux-thunk';
import sinon, {stub} from 'sinon';

function configStub()