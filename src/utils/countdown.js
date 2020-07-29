const Countdown = ()=>{
    let time =  new Date().getTime()+3*1000;
    let interval = setInterval(()=>{
       let now = new Date().getTime();
       console.log(time-now);
       if(time-now<=0){
           clearInterval(interval);
       }
    },1000)
}


export {Countdown};