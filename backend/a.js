var CronJob = require('cron').CronJob;
const express = require('express');
const app = express();
const mysql = require('mysql');
const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  width: 640,
  height: 480,
  nopreview: true,
});
const db = mysql.createPool({
    user: "omar",
    host: "127.0.0.1",
    password: "zuis1234",
    database: "p",
    charset: "utf8mb4",
})
var job = new CronJob(
	'*/5  * * * *',
	function() {
        let date = new Date();
        let time = ((date.getHours().toString()).length>1? date.getHours() : "0"+date.getHours()) +":"+ ((date.getMinutes().toString()).length>1? date.getMinutes() : "0"+date.getMinutes());
console.log(time)    
const Act =(a)=>{
    myCamera.snap()
    .then((result) => {
      // Your picture was captured
      if(1){
            // disable buzzer and break the loop
      }else{
        Act()
      }
    })
    .catch((error) => {
       // Handle your error
    });
}
db.query("SELECT * FROM alarms WHERE time = ?",[time],(err2,result2)=>{
    if(err2){
        console.log(err2)
      }else{
if(result2.length > 0){
    console.log('alarm activeted')
    // give power to the buzzer
    
    

}
      }

})
	},
	null,
	true,
	'America/Los_Angeles'
);
app.get('/',(req,res)=>{
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = ((today.getHours().toString()).length>1? today.getHours() : "0"+today.getHours()) +":"+ ((today.getMinutes().toString()).length>1? today.getMinutes() : "0"+today.getMinutes());
var dateTime = date+' '+time;
 
console.log(dateTime)
myCamera.snapDataUrl()
  .then((result) => {
    // Your picture was captured
    res.send('<img src="${result}">')
    console.log('<img src="${result}">');
  })
  .catch((error) => {
    res.send(error)
     // Handle your error
  });
  
})
app.get('/alarms',(req,res)=>{

    db.query("SELECT * FROM alarms",[],(err2,result2)=>{
        if(err2){
            console.log(err2)
            res.send({code:404})
          }else{
            res.send(result2)
          }

    })
})
app.post('/add', (req, res)=> {
    const time = req.body.time

  res.send('Hello World');
  db.query("SELECT * FROM alarms WHERE time = ? ",[time],(err2,result2)=>{
  if(err2){
    console.log(err2)
    res.send({code:404})
  }else{
    if(result2.length > 0){
res.send({code:300})
    }else{
        db.query("INSERT INTO alarms ",[username],(err3,result3)=>{
            if(err3){
                console.log(err3)
                res.send({code:404})
            }else{
                res.send({code:200})
            }
        })
    }
  }

})
}) 
// time active
app.listen(3000,()=>{
 console.log("starting...");
});
job.start()