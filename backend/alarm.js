const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD( 1, 0x27, 16, 2 );
lcd.beginSync();
lcd.clearSync();
const startUsage = process.cpuUsage();
function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
}

// while(true){

//       const date = new Date(); // current date and time
//       const endUsage = process.cpuUsage();
//       const cpuUsage = endUsage.user - startUsage.user;
//       const percentage = (cpuUsage / (1000 * 1000)) * 100;
//       console.log(`CPU usage: ${percentage}%`);
//       lcd.setCursorSync(0, 0);
//       lcd.printSync(formatTime(date));

// }
function formatTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let formattedTime = hours + ':' + minutes + ' ' + ampm;
  return formattedTime;
}
function wakeUpTime(cycles) {
  const sleepDuration = 90 * cycles; // 90 minutes per cycle
  const currentDate = new Date();
  const wakeUpDate = new Date(currentDate.getTime() + sleepDuration * 60 * 1000);

  let hours = wakeUpDate.getHours();
  let minutes = wakeUpDate.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + ' ' + ampm;
}

console.log(wakeUpTime(5));

const updateTime = () => {
  const date = new Date(); // current date and time
console.log(formatTime(date))
  lcd.setCursorSync(0, 0);
  lcd.printSync(formatTime(date));
  lcd.setCursorSync(0, 1);
  lcd.printSync(`5 cycles ${wakeUpTime(5)}`);
  const currentSecond = new Date().getSeconds()
  const delay = currentSecond > 0 ? (60 - currentSecond) * 1000 : 1000;
  setTimeout(updateTime, delay);
}
updateTime();