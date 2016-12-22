const scriptPath = __dirname + '\\exportMetadata.py';
const exec = require('child_process').exec;

export const runProcess = (datasetName, datasetType)=>{
    return new Promise((resolve,reject)=>{
        exec(`${scriptPath} ${datasetName} ${datasetType}`, (err,stdout,stderr)=>{
            if (err)
                reject(err);
            else{
                if(stdout === 'success\r\n')
                    resolve('success')
                else
                    reject(stdout);
            }
                
        })
    })
}
