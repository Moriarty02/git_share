//继承的含义以及继承的多种实现方式
/*
参考阮一峰
1.构造函数方式
2:非构造函数方式

 */
function Animal() {
    this.special = "animal";
}

function Cat(name, age) {
    //实现对animal的继承
    Animal.apply(this, arguments);
    this.name = name;
    this.age = age;
    this.sayName = function() {
        return this.special;

    }
}
//var cat = new Cat("caddy", 21)
function Cat2(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        return this.special;
    }

}
Cat2.prototype = new Animal();
Cat2.prototype.constroctor = Cat2;
//var cat2 = new Cat2('cate', 21);
//第三种直接写到animal的prototype上面（资源共享）
function Animal() {}
Animal.prototype.special = "animal";

function Cat3(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {

        return this.special || "no found";
    }
}
Cat3.prototype = Animal.prototype;
Cat3.prototype.constroctor = Cat3;
//空对象作为媒介
var F = function() {}
F.prototype.special = "animal";

function Cat4(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        return this.special;
    }
}
Cat4.prototype = new F();
Cat4.prototype.constroctor = Cat4;
