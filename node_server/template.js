const moment = require('moment');

module.exports = function (binding) {
  const duration = moment.duration(binding.uptime);
  const hours = Math.floor(duration.asHours());
  const mins = Math.floor(duration.asMinutes()) - hours * 60;
  const uptime = `${mins} minutes`;
  return (
    `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <h1>Hello world!</h1>
        <table>
          <thead>
            <tr>
              <th>Up Time</th>
              <th>Visits to 'Status' endpoint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${ uptime }</td>
              <td>${ binding.numstatushits }</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>

    `
  )
}
