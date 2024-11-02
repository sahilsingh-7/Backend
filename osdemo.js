import os from 'os'
console.log(os.userInfo());
console.log(os.totalmem()/1000000000);
console.log(os.freemem()/1000000000);
console.log(os.cpus());
console.log(os.arch());