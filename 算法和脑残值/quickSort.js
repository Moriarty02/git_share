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
        a[low] ^= a[high];
        a[high] ^= a[low];
        a[low] ^= a[high];
        while (low < high && povitkey >= a[low])
            low++;
        a[low] ^= a[high];
        a[high] ^= a[low];
        a[low] ^= a[high];


    }
    return low;
}
