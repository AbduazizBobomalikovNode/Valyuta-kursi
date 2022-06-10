const spawn = require("child_process").spawn;
const format = require('../maxfunction/format')
const fs = require('fs');

module.exports.plotx = async function(){
  const pythonProcess = spawn('python',["./plot/render.py"]);

  pythonProcess.stdout.on('data', (data) => {
      console.log(`stderr :${data}`)
  });
  pythonProcess.stderr.on('data', (data) => {
      console.log(`stderr :${data}`)
  });
  pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      fs.writeFile('./text/updateData.txt', format(),(err) => {
            if (err)
                console.log('updateData.txt fayliga yozishda xato bor',err);
            else {
                console.log('updateData.txt ga malumotlar yozildi!')
                }
        })
  });
} 