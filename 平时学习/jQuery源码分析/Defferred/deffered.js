//deferred
//普通写法
function a(callback) {
    setTimeout(function() {
        callback();
    }, 1000);

}

function done(value) {
    alert(value)
}

a(function(value) {
        done(value)
    })
    //jquery的写法


var defer = $.Deferred();
setTimeout(function() {
    defer.resolve(5);
}, 1000);

var filtered = defer.then(function(value) {
    return value * 2;

}, function(error) {
    console.log("error")
});
//deferred源码实现
jQuery.extend({
    Deferred: function() {
        var tuples = [],
            state = "pending",
            promise = {},
            deferred = {},
            jQuery.each(tuples, function(i, tuple) {
                deferred[[tuple[0] + "With"]] = list.fireWith;

            });
        promise.promise(deferred);
        return deferred;

    },
    when: function() {}
})
