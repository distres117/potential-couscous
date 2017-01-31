import {toastr} from 'react-redux-toastr';
export default () => {
    try {
        let wshshell = new ActiveXObject("wscript.shell");
        let username = wshshell.ExpandEnvironmentStrings("%username%");
        return username;        
    } catch (e) {
        console.warn('You must use IE and ActiveX scripts need to be enabled for authentication to work properly');
    }
}