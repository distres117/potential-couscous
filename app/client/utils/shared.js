import {toastr} from 'react-redux-toastr';

export const startTimeoutCheck = (hook, resolveFn, timeout = 30000)=>{
    return window.setTimeout(()=>{
            console.log('stopped');
            if (!hook.resolved){
                resolveFn();
            }
        }, timeout);
}