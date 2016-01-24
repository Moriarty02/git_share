//无new的创建方式//
var aQuery = function(selector, context) {

};
aQuery.prototype = {
    name: function() {},
    age: function() {}
}
var a = new aQuery();
a.name;
//改进
var aQuery = function(selector, content) {
    return new aQuery();
}
aQuery.prototype = {
        name: function() {},
        age: function() {}
    }
    //再次改进
    /*在javascript中实例this只跟原型有关系

    那么可以把jQuery类当作一个工厂方法来创建实例，把这
    个方法放到jQuery.prototye原型中*/
function aQuery = function() {
    return aQuery.prototype.init();

}

aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {},
    age: function() {}
}

//jquery的隔离作用域实现
jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context, rootjQuery);
}
jQuery.fn.init.prototype = jQuery.fn;
//最后的实现方式
var aQuery = function(selector, context) {
    return new aQuery.prototype.init();
};
aQuery.prototype = {
    init: function() {
        return this;
    },
    name: function() {
        this.age;
    },
    age: 20

}
aQuery.prototype.init = aQuery.prototype;
console.log(aQuery().name());
