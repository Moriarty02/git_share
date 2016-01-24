//	频繁Layout
var h1 = element1.clientHeight;
element1.style.height = (h1 * 2) + 'px';

var h2 = element2.clientHeight;
element2.style.height = (h2 * 2) + 'px';

var h3 = element3.clientHeight;
element3.style.height = (h3 * 2) + 'px';


先读后写
// Read
var h1 = element1.clientHeight;
var h2 = element2.clientHeight;
var h3 = element3.clientHeight;

// Write
element1.style.height = (h1 * 2) + 'px';
element2.style.height = (h2 * 2) + 'px';
element3.style.height = (h3 * 2) + 'px';

document.body.addEventListener('click', function() {
    var h1 = element1.clientHeight;
    element1.style.height = (h1 * 2) + 'px';
});

document.body.addEventListener('click', function() {
    var h2 = element2.clientHeight;
    element2.style.height = (h2 * 2) + 'px';
});

document.body.addEventListener('click', function() {
    // Read
    var h1 = element1.clientHeight;
    // Write
    requestAnimationFrame(function() {
        element1.style.height = (h1 * 2) + 'px';
    });
});
document.body.addEventListener('click', function() {
    // Read
    var h2 = element2.clientHeight;
    // Write
    requestAnimationFrame(function() {
        element2.style.height = (h2 * 2) + 'px';
    });
});
write后read肿么办？

// Read
var h1 = element1.clientHeight;

// Write
requestAnimationFrame(function() {
    element1.style.height = (h1 * 2) + 'px';

    // 我们可能希望write后再read其他元素的属性
    var height = element2.clientHeight;

    /* 异步读取，可能读取前element1.style.height被修改  
    requestAnimationFrame(function() {
        var height = element1.clientHeight;
    });
    */
});


// Read
var h1 = element1.clientHeight;

// Write
fastdom.write(function() {
    element1.style.height = (h1 * 2) + 'px';

    // We may want to read the new
    // height after it has been set
    fastdom.read(function() {
        var height = element1.clientHeight;
    });
});
在每一帧， 先将读操作批量运行， 再批量运行写操作
Layout小结

不但改变CSS可能导致Layout， 读取位置大小相关得属性也会导致Layout
分离读写， 减少Layout
面对解耦代码， 使用rAF推迟的方法分离读写。

before
for (var i = 0; i < 10; i++) {
    var p = document.createElement("p");
    var oTxt = document.createTextNode("段落" + i);
    p.appendChild(oTxt);
    document.body.appendChild(p);
}

var oFragment = document.createDocumentFragment();
for (var i = 0; i < 10; i++) {
    var p = document.createElement("p");
    var oTxt = document.createTextNode("段落" + i);
    p.appendChild(oTxt);
    oFragment.appendChild(p); < br >
}

document.body.appendChild(oFragment);
