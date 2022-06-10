function double(n){
    return new Promise((resolve,reject)=>
    {
        setTimeout(()=>resolve(n*2),2000)
    }
    )}
    
    double(2)
.then(double(4))
 