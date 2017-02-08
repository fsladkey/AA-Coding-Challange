const Chart = require('chart.js');
const moment = require('moment');
const DATE_FORMAT = "dddd, MMMM Do YYYY, h:mm:ss a";

const context = JSON.parse(document.getElementById('context').textContent)
const data = {
  labels: Object.keys(context.numendpointhits),
  datasets: [
    {
      label: "Server Status",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      data: Object.keys(context.numendpointhits).map(path =>
        context.numendpointhits[path]
      ),
    }
  ]
};

new Chart(document.getElementById('chart'), {
  type: 'bar',
  data: data
});

function getUptime(startTime) {
  const now = new Date().getTime()
  const start = new Date(startTime * 1000)
  return moment.utc(now - start).format("HH:mm:ss")
}

function displayTime() {
  const uptime = document.getElementById('uptime')
  uptime.textContent = getUptime(context.starttime)
  const firstHit = document.getElementById('first-hit')
  firstHit.textContent = moment(context.firsthit * 1000).format(DATE_FORMAT)
  setTimeout(displayTime, 1000)
}

displayTime()
