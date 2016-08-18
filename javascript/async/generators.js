function *gen(max) {

    var i = 0;
    while (i < max) {
        yield i++;
    }

}


for (let n of gen(10)) {
    console.log(n);
}
