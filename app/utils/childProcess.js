const path = require('path');
const exec = require('child-process-promise').exec;
const exportScript = path.join(__dirname, 'python', 'exportMetadata.py');
const gpScript = path.join(__dirname, 'python', 'gpservice.py');
// export const runProcess = (datasetName, datasetType)=>{
//     return new Promise((resolve,reject)=>{
//         let prc = exec(`${scriptPath} ${datasetName} ${datasetType}`);
//         prc.on('exit', ()=>{
//             resolve();
//         });
            
//             // if (stderr)
//             //     reject(stderr);
//             // else{
//             //     if(stdout === 'success\r\n' || stdout === 'success with export\r\n')
//             //         resolve(stdout);
//             //     else
//             //         reject(stdout);
//             // }
                
//     })
// };
export const runProcess = (datasetName, datasetType)=>{
    return exec(`${exportScript} ${datasetName} ${datasetType}`);
}
export const runProcessGp = (datasetName = '', datasetType = '', location = '')=>{
    return exec(`${gpScript} ${datasetName} ${datasetType} ${location}`);
}
