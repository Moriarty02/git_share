//函数调用模式中，由于程序设计上的问题，比如
//var sum=add(3,4) 方法不能利用内部函数来帮助他完成工作,因为内部函数的this
//被绑定在错误的值，所以不能共享该方法的控制权，


//给myobj增加一个double 的方法
var myobj = {};
myobj.double = function() {
    var thay = this;
    var helper = function() {
        that.value = add(that.value, that.value);
    }
    helper();
}

myobj.double();
document.write(myobj.value);
// 处理函数的中异常
var add = function(a, b) {
    if (typeof a !== 'number' && typeof b != 'number') {
        throw {
            name: "TypeError",
            message: 'add need numbers'
        };

    }
    return a + b;

}

var try_it = function() {
        try {
            add("string")
        } catch {
            alert(e.name + "  " + e.message)

        }

    }
    //利用闭包来做一些事情
    //定义一个函数，他设置一个DOM节点的为黄色，然后把他渐变为白色
var fade = function(node) {
    var level = 1;
    var step = function() {
        var hex = level.toString(16);
        node.style.backgroundColor = "#FFFF" + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);

        }

    };
    setTimeout(step, 100);

};
fade(document.body);
// 糟糕的例子 循环注事件n那个
var add_the_handler = function(nodes) {
    var i;
    for (var i = 0, len = nodes.length; i < len; i++) {
        nodes[i].onclick = function(e) {
            alert(i);
        };

    }

};
//修正后的例子
var add_the_handler = function(nodes) {
    var helper = function(i) {
        return function(e) {
            alert(i);
        }
    };
    var i;
    for (var i = 0, len = nodes.length; i < len; i++) {
        nodes[i].onclick = helper(i);

    }

}
