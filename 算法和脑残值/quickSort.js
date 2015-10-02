//快了个拍
function quickSort(a) {
    Qsort(a, 0, a.length - 1);
}

function Qsort(a, low, high) {
    if (low < high) {
        var povit = Partition(a, low, high);
        Qsort(a, low, povit - 1);
        Qsort(a, povit + 1, high);
    }

}

function Partition(a, low, high) {
    var povitkey = a[low];

    while (low < high) {
        while (low < high && povitkey <= a[high])
            high--;
        swap(a[low], a[high]);
        while (low < high && povitkey >= a[low])
            low++;
        swap(a[low], a[high]);
    }
    return low;
}

function swap(a, b) {
    var temp;
    temp = a;
    a = b;
    b = temp;
    temp = null;
}
var a = [1, 2, 4, , 54, 6, 432, 432, 4, 325, 4, 53, 4]
quickSort(a);
document.write(a)
