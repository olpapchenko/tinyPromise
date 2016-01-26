
(function (root, factory) {
    if(typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.Promise = factory();
    }
} (this, function (){
    //private service methods
    var resolve = function  (value, promise) {
        promise.resolveValue = value;
        promise.resolved = true;
        if(promise.resolveCallback) {
            promise.resolveCallback(promise.resolveValue);
        }
    }

    var reject = function (value, promise) {
        promise.rejectValue = value;
        promise.rejected = true;
        if(promise.rejectCallback) {
            promise.rejectCallback(promise.rejectValue)
        }
    }

    var processCallbackReturnValue = function (value, resolveCallback) {
        if(value instanceof Promise) {
            value.then(resolveCallback);
        } else {
            resolveCallback(value);
        }
    }

    var Promise = function (asyncAction) {
        var _that = this;
       asyncAction(function (value) {resolve(value, _that)}, function (value) {reject(value, _that)});
    }

    //public api
    Promise.prototype.then = function (resolveCallback, rejectCallback) {
        var _that = this;

        return new Promise(function (resolve, reject) {
            _that.resolveCallback = function (resolveValue) {
                if(resolveCallback) {
                    processCallbackReturnValue(resolveCallback(resolveValue), function (val) {
                        resolve(val, this);     
                    });
                } else {
                    resolve(resolveValue, this);
                }
            }

            _that.rejectCallback = function (rejectValue) {
                if(rejectCallback) {
                    processCallbackReturnValue(rejectCallback(rejectValue), function (val) {
                        reject(val, this);
                    });
                } else {
                    reject(rejectValue, this);
                }
            }

            if(_that.resolved) {
                _that.resolveCallback(_that.resolveValue);
            } else if (_that.rejected) {
                _that.rejectCallback(_that.rejectValue);
            }
        });

    }

    Promise.prototype.isResolved = function () {
        return this.resolved;
    }

    Promise.prototype.isRejected = function () {
        return this.rejected;
    }

    Promise.prototype.catch = function (catachCallback) {
        this.then(undefined, catachCallback);
    }
    return Promise;
}));
