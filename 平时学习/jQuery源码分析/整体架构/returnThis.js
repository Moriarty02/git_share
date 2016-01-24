//链式调用实现
//return this
var x = 1;

function foo() {
    console.log("1"+x);//1
    console.log("2"+arguments);//1,2
    console.log(foo.arguments);//1,2函数内部foo.arguments和arguments一样的
    var x = 2;
}
foo(1, 2);
