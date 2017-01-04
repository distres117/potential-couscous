(function (chaiDispatch) {
    "use strict";

    // Module systems magic dance.

    /* istanbul ignore else */
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // NodeJS
        module.exports = chaiDispatch;
    } else if (typeof define === "function" && define.amd) {
        // AMD
        define(function () {
            return chaiDispatch;
        });
    } else {
        // Other environment (usually <script> tag): plug in to global chai instance directly.
        chai.use(chaiDispatch);
    }
}(function chaiDispatch(chai,utils){
    var Assertion = chai.Assertion;

    function mapDispatches(obj, fn){
        return obj.dispatchArray.map(d=>d(fn)).some(d=>!!d);
    }
    function assertDispatches(n){
        var len = this._obj.dispatchArray.length;
        this.assert(        
            len === n
            , 'expected instance to have dispatched #{exp} times but got #{act}'
            , 'expected instance to not have dispatched #{exp} times'
            ,n
            ,len
        )
    }
    
    function chainAssertDispatches(n){
        utils.flag(this, 'dispatches',true);
    }
    Assertion.addChainableMethod('dispatches', assertDispatches, chainAssertDispatches);
    Assertion.overwriteMethod('equal', function(_super){
        return function (n){
            if (utils.flag(this, 'dispatches')){
                assertDispatches.call(this, n);
            } else {
                _super.apply(this,arguments);
            }
            
        }
    });
    Assertion.addMethod('dispatched', function(fn){
        this.assert(
            mapDispatches(this._obj,fn)
            , 'expected #{exp} to have been dispatched'
            , 'expected #{exp} to not have been dispatched'
            , fn.toString()
            , null

        )
    });
}));