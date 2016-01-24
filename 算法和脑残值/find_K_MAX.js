//找到一个数组中第k大的数字(内部不重复)
//第一个思路，也是拿到这个问题马上可以想到的方法
//思考问题的时候，我喜欢结合已经学过的知识或者生活场景来切入问题
//如何去找到第K大的数字，我们学过的最简单的排序方法是什么？冒泡吧，
//冒泡的思路就是每次将最大的数字冒泡上来与第一个数字交换，
//放到这里，我们只需要第K大的数字，实际就是冒泡第K次的数字
//这样就比较简单了吧


//还是先复习一下冒泡吧
function bubble(a) {
    console.log(a);
    var arr = a.slice("");
    var flag = true;
    for (var i = 0, length = arr.length; i < length && flag; i++) {
        flag = false;
        for (var j = length - 1; j > i; j--) {
            if (arr[j] > arr[j - 1]) {
                arr[j] ^= arr[j - 1];
                arr[j - 1] ^= arr[j];
                arr[j] ^= arr[j - 1];
                flag = true;
            }
        }

    }
    return arr;

}

var demo = [12, 43, 57, 6, 87, 8, 5, 54];

function find_K_MAX_Bubble(a, k) { //a为待查找的数组，k为第K大
    //冒泡的方式去拿到第K大的数字
    var arr = a.slice("");
    
    for (var i = 0, length = arr.length; i < length; i++) {
        for (var j = length - 1; j > i; j--) {
            if (arr[j] > arr[j - 1]) {
                arr[j] ^= arr[j - 1];
                arr[j - 1] ^= arr[j];
                arr[j] ^= arr[j - 1];
            }
        }
        if (i === k - 1) {
            return arr[i];
        }
    }
    return -1;
}
// 实现了，但是如果答肯定是不合适的，因为这里的时间复杂度O(n)2
// 即使这样答也会要求拿出更优的方案
//其实拿到这个题第一反应就是先Math.sort(),然后拿到k-1就完了
//既然想到快排就应该想到快排最重要的一个步骤就是Partition那一步，
//这一步做了什么，拿到一个所谓的中间点，然后将比他小的放在他的左边，比他大的放
// 他的右边， 回到我们的这个问题也就是只要我做了这个操作时，左边的个数就是k-1个那么就是
//  这个数就是我们要找的数字。这样的方式可以将时间复杂度降到O(n)
// code 
function find_K_MAX(a, low, high, k) {


}

function Partition(a, low, high) {
    var povitkey = a[low];
    while (low < high) {
        while (low < high && a[high] >= povitkey)
            high--;
        a[low] ^= a[high];
        a[high] ^= a[low];
        a[low] ^= a[high];
        while (low < high && a[low] <= povitkey)
            low++;
        a[low] ^= a[high];
        a[high] ^= a[low];
        a[low] ^= a[high];

    }
    return low;
}

function Quick_K_MAX(a, low, high, k) {
    if (low >= high) {
        return a[low];
    } else {
        var mid = Partition(a, low, high);
        if (mid > k) {
            Quick_K_MAX(a, low, mid - 1, k);
        } else if (mid < k) {
            Quick_K_MAX(a, mid + 1, high.k);
        } else {
        	console.log(a[mid])
            return a[mid];
        }

    }

}
//测试代码
var a = [10, 7, 8, 6, 3, 1, 5, 2, 4, 9];
document.write(Quick_K_MAX(a, 0, a.length - 1, 2))
