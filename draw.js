var fs = require('fs');

let filename = "homes.csv"
let homesData = fs.readFileSync(process.cwd() + "/" + filename).toString()
var homes = [];
homes = homesData.split('\n');
for (var i = 0; i < homes.length; i++) {
    homes[i] = homes[i].split(",");
}
console.log(homes)

function draw() {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 70;

    context.beginPath();
    context.arc(30, 30, 3, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'darkred';
    context.stroke();
    var numRows = 10;
    var numColumn = 10;
    var canvasx = 576;
    var canvasy = 280;
    var xdim = Math.floor(canvasx / numColumn);
    var ydim = Math.floor(canvasy / numColumn);
    for (var x = 0, i = 0; i < numRows; x += xdim, i++) {
        for (var y = 0, j = 0; j < numColumn; y += ydim, j++) {
            context.strokeRect(x, y, xdim, ydim);
        }
    }

    for (var x2 = 0, k = 0; k < 30; x2 += (19), k++) {
        for (var y2 = 0, l = 0; l < 20; y2 += (14), l++) {
            context.strokeStyle = 'purple';
            context.strokeRect(x2, y2, (19), (14));
            context.fillStyle = 'green';
            context.beginPath();
            context.arc(x2+10, y2+7, 3, 0, 2 * Math.PI, false);
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
            }
        }


    }
