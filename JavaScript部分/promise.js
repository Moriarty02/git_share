(function(window) {

    var PENDING = undefined,
        FULFILLED = 1,
        REJECTED = 2;

    var isFunction = function(obj) {
        return 'function' === typeof obj;
    }
    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
    var isThenable = function(obj) {
        return obj && typeof obj['then'] == 'function';
    }

    var transition = function(status, value) {
        var promise = this;
        if (promise._status !== PENDING) return;
        // 所以的执行都是异步调用，保证then是先执行的
        setTimeout(function() {
            promise._status = status;
            publish.call(promise, value);
        },0);
    }
    var publish = function(val) {
        var promise = this,
            fn,
            st = promise._status === FULFILLED,
            queue = promise[st ? '_resolves' : '_rejects'];

        while (fn = queue.shift()) {
            val = fn.call(promise, val) || val;
        }
        promise[st ? '_value' : '_reason'] = val;
        promise['_resolves'] = promise['_rejects'] = undefined;
    }

    var Promise = function(resolver) {
        if (!isFunction(resolver))
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
        if (!(this instanceof Promise)) return new Promise(resolver);

        var promise = this;
        promise._value;
        promise._reason;
        promise._status = PENDING;
        promise._resolves = [];
        promise._rejects = [];

        var resolve = function(value) {
            transition.apply(promise, [FULFILLED].concat([value]));
        }
        var reject = function(reason) {
            transition.apply(promise, [REJECTED].concat([reason]));
        }

        resolver(resolve, reject);
    }

    Promise.prototype.then = function(onFulfilled, onRejected) {
        var promise = this;
        // 每次返回一个promise，保证是可thenable的
        return Promise(function(resolve, reject) {
            function callback(value) {
                var ret = isFunction(onFulfilled) && onFulfilled(value) || value;
                if (isThenable(ret)) {
                    ret.then(function(value) {
                        resolve(value);
                    }, function(reason) {
                        reject(reason);
                    });
                } else {
                    resolve(ret);
                }
            }

            function errback(reason) {
                reason = isFunction(onRejected) && onRejected(reason) || reason;
                reject(reason);
            }
            if (promise._status === PENDING) {
                promise._resolves.push(callback);
                promise._rejects.push(errback);
            } else if (promise._status === FULFILLED) { // 状态改变后的then操作，立刻执行
                callback(promise._value);
            } else if (promise._status === REJECTED) {
                errback(promise._reason);
            }
        });
    }

    Promise.resolve = function(arg) {
        return Promise(function(resolve, reject) {
            resolve(arg)
        })
    }

    Promise.reject = function(arg) {
        return Promise(function(resolve, reject) {
            reject(arg)
        })
    }
    window.Promise = Promise;

})(window);
