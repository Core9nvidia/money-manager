function foo() {
    var p1 = new Promise((resolve, reject) => {
        var obj=[];
        for(var i=0;i<30;i++){
            obj.push(i);
        }
      resolve(obj);
    })
    p1.then((obj) => console.log(obj))
      .then(() => console.log('last block'))
      .then(() => resolve)
      .catch(() => console.log('catch block'));
  }
 foo();