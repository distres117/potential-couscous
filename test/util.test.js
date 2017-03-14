import {expect} from 'chai';
import {runProcess, runProcessGp} from '../app/utils/childProcess';
import {getDetails} from '../app/services/acpyService'

//These tests will not work without arcgis server and the appropriate gp service and data
describe('util tests', function(){
    const datasetName = '_OMtesting_feature';
    this.timeout(60000);
    it('should export metadata from dataset', ()=>{
        return runProcess(datasetName, '1')
        .then(res=>{
            expect(res.stdout).to.equal('success\r\n');
        });
    });
    it('should read metadata from dataset', ()=>{
        return runProcessGp(datasetName, '1')
        .then(res=>{
            expect(res.stdout).to.be.ok;
        })
        .catch(err=>{
            console.log(err);
        })
    });
    it('should use service to get all the data', ()=>{
        return getDetails(datasetName, '1')
        .then(res=>{
            expect(res.data).to.be.ok;
            expect(res.data.metadata).to.be.ok;
            //console.log(res.data);
            //expect(res.data.metadata.dataqual.lineage.procstep[4].procdesc).to.be.null;
        });
    });

})