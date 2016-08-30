var namespaceIter = function(path, obj) {

    var ptr = obj;

    while(path.length) {

        var seg = path.shift();

        if ([!ptr[seg]]) {
            ptr[seg] = {};
        }

        ptr = ptr[seg];

    }
    return obj;
};

var paths = 'my.test.namespace.path'.split('.');
var namespacedObj = namespaceIter(paths,{});
console.log(namespacedObj);




