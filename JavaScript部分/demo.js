var dtd = $.Deferred(); //  new Deferred
　　
var wait = function(dtd) {　　　　
    var tasks = function() {　　　　　　
        alert("finish");　　　　　　
        dtd.resolve(); // change state
    };　　　　
    setTimeout(tasks, 5000);　　　　
    return dtd.promise(); // promise   　　
};　　

$.when(wait(dtd)).done(function() {
    alert("success");
}).fail(function() {
    alert("error");
});

function asyncEvent() {
    var dfd = jQuery.Deferred();

    setTimeout(function() {
        dfd.resolve("hurray");
    }, Math.floor(400 + Math.random() * 2000));

    // Reject after a random interval
    setTimeout(function() {
        dfd.reject("sorry");
    }, Math.floor(400 + Math.random() * 2000));

    // Show a "working..." message every half-second
    setTimeout(function working() {
        if (dfd.state() === "pending") {
            dfd.notify("working... ");
            setTimeout(working, 500);
        }
    }, 1);


    return dfd.promise();
}

$.when(asyncEvent()).then(
    function(status) {
        alert(status + ", things are going well");
    },
    function(status) {
        alert(status + ", you fail this time");
    },
    function(status) {
        $("body").append(status);
    }
);
var getJSON = function(url) {
    var promise = new Promise(function(resolve, reject) {
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
    });

    return promise;
};

getJSON("/posts.json").then(function(json) {
    console.log('Contents: ' + json);
}, function(error) {
    console.error('出错了', error);
});
$.get('demo.json').then(doneCallbacks, failCallbacks).then(doneCallbacks, failCallbacks)