/*
	p40
	
 */
String.method("deentityify", function() {

    // 字符实体表
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    //返回deentityify方法
    return function() {
        return this.replace(/&([^&;]+);/g,
            function(a, b) {
                var r = entity[b];
                return typeof r === "string" ? r : a;
            });
    };

}());

document.write('&lt;&quot;&gt'.deentityify());

//模块模式
var serial_marker = function() {
    //返回一个用来产生位移字符串的对象
    //唯一字符串由两部分组成
    //该对象包含一个设置前缀的方法，一个设置序列号的方法
    //和产生一个唯一字符串的gensym的方法
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function(p) {
            prefix = String(p);

        },
        set_seq: function(s) {
            seq = s;
        },
        gensym: function() {
            var result = prefix + seq;
            seq += 1;
            return result;

        }

    };

};
var seqer = serial_marker();
seqer.set_prefix("Q");
seqer.set_seq(1000);
var unique = seqer.gensym();

