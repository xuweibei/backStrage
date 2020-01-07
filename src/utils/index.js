export {
    keyMirror, createReducer, errorType, getUrlParam,
    showInfo, showFail, showSuccess} from './mixin';
// export {rollStatus} from './rollStatus';
const isAndroid = (/android/gi).test(navigator.appVersion);
export {isAndroid};