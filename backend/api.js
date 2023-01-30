// imports
var CronJob = require('cron').CronJob;
const express = require('express');
const app = express();
const mysql = require('mysql');
const tf = require('@tensorflow/tfjs-node');
const blazeface = require('@tensorflow-models/blazeface');
const fs = require('fs');
const Gpio = require('onoff').Gpio;
const cors = require('cors');
const PiCamera = require('pi-camera');
app.use(express.json());
app.use(cors({
    "Access-Control-Allow-Headers": "Origin"
}))
function getCurrentTime() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  var date = currentDate.getDate().toString().padStart(2, '0');
  var hours = currentDate.getHours().toString().padStart(2, '0');
  var minutes = currentDate.getMinutes().toString().padStart(2, '0');

  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
}
// functions and consts
async function loadModel() {
  model = await blazeface.load();
  console.log('loaded', )
}
function checkProbability(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].probability > 0.50) {
      return true;
    }
  }
  return false;
}

// var Gpio = require('onoff').Gpio
// setup
const myCamera = new PiCamera({
  mode: 'photo',
  width: 640,
  height: 480,
  nopreview: true,
});
const db = mysql.createPool({
    user: "lukes",
    host: "127.0.0.1",
    password: "lukes1234",
    database: "projects",
    charset: "utf8mb4",
})
// ON LED GPIO 21
// ALARM ON GPIO 20
// ALARM BUZZER GPIO 16
// 16
var ALRAM = new Gpio(20, 'out');
var detect = new Gpio(16, 'out');
var BUZZER = new Gpio(12, 'out');
var ONLED = new Gpio(21, 'out');

// cron jobs
// display alarm
// check alarm
const show = ()=>{
  while(1){
    console.log(Math.random()*1000)
  }
}
var job = new CronJob(
	'*/5  * * * *',
	function() {
let time = getCurrentTime()

// it's better to use nosql here but i don't have time to do it
db.query("SELECT * FROM alarms WHERE time = ?",[time],(err2,result2)=>{
    if(err2){
        console.log(err2)
      }else{
if(result2.length > 0){
    console.log('alarm activeted')
    BUZZER.writeSync(2)
detectFace();
    // give power to the buzzer
    // turn an led on
}else{
  console.log('no alrams')
}
      }
})
	},
	null,
	true,
	'America/Los_Angeles'
);
// paths
// test
var count = 0;
const detectFace = async()=>{

detect.writeSync(0)
  myCamera.snap()
  .then( async (result) => {
    // Your picture was captured
    const imageBuffer =  await fs.readFileSync('a.jpg');
    const image = tf.node.decodeImage(imageBuffer)

    const returnTensors = false;
    const flipHorizontal = true;
    const annotateBoxes = true;
    const predictions = await model.estimateFaces(image, returnTensors, flipHorizontal, annotateBoxes);
    // console.log('6')
    if(predictions.length > 0){{
      if(checkProbability(predictions)) {
        count++
        detect.writeSync(1)
        // BUZZER.writeSync(2)
       }else{
        // BUZZER.writeSync(1)
        count =0;
       }  
    }

    }else{
  
      // BUZZER.writeSync(1)
      count =0;
    }
    console.log(predictions);
    if(count<5){
      detectFace()
    }else{
      detect.writeSync(1)
      BUZZER.writeSync(1)
      count =0;
    }
    console.log(count)

    // res.send(`${JSON.stringify(predictions)}`);
  })
  .catch((error) => {
     // Handle your error
     console.log(error)
  });

}
app.get('/',(req,res)=>{
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = ((today.getHours().toString()).length>1? today.getHours() : "0"+today.getHours()) +":"+ ((today.getMinutes().toString()).length>1? today.getMinutes() : "0"+today.getMinutes());
var dateTime = date+' '+time;
console.log(getCurrentTime())
BUZZER.writeSync(2)
detectFace();
db.query("SELECT * FROM alarms",[],(err2,result2)=>{
  if(err2){
      console.log(err2)
      res.send({code:404})
    }else{
      res.send(result2)
    }

})
})
// list all alarms
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


// add new alarm
app.post('/add', (req, res)=> {
    const time = req.body.time
console.log(time)
  // res.send('Hello World');
  db.query("SELECT * FROM alarms WHERE time = ? ",[time],(err2,result2)=>{
  if(err2){
    console.log(err2)
    res.send({code:404})
  }else{
    if(result2.length > 0){
res.send({code:300})
    }else{
        db.query("INSERT INTO alarms (time) VALUES (?)",[time],(err3,result3)=>{
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
const runme = async()=>{
  BUZZER.writeSync(1)
  await loadModel()

  app.listen(3000,()=>{
    console.log("server started at port 3000");
   });
   ONLED.writeSync(1);

  //  detectFace()
}
runme()

// job.start()
// show()