//书上的代码
var empty_object = {};
var stooge = {
    "first-name": "Moriarty";
    "age": "23";

};
//使用||可以用来填充默认值
var middle = stooge.first - name || "none";
/*//测试代码  forin会拿到对象的所有的属性，包括原型上的以及函数类型的东西
var obj = {
    name: "moriarty",
    age: 21,
    sayName: function() {
        cosole.log(this.name);
    }

}
obj.constructor.prototype = {
    "super": "prototype"
}
for (var i in obj) {
    console.log(i + " " + obj[i]);
}*/
function person(name, age) {
    this.name = name,
        this.age = age;
    this.sayName = function() {
        console.log(this.name);
    }
}
person.prototype={
	super:"super"
}
var p=new person("moriarty",21);
