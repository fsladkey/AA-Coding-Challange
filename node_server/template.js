const moment = require('moment');
const fs = require('fs');

module.exports = function (context, cb) {
  const duration = moment.duration(context.uptime);
  const hours = Math.floor(duration.asHours());
  const mins = Math.floor(duration.asMinutes()) - hours * 60;
  const uptime = `${mins} minutes`;
  fs.readFile('./node_server/index.html', 'utf8', (err, result) => {
    cb(eval('`' + result + '`'));
  })
}
