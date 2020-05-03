function draw()
{

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 70;

      context.beginPath();
      context.arc(15, 15, 5, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = '#003300';
      context.stroke();

      context.beginPath();
      context.arc(30, 30, 5, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'darkred';
      context.stroke();

      for (var x = 0, i = 0; i < 8; x += 72, i++) {
        for (var y = 0, j = 0; j < 5; y += 56, j++) {
            context.strokeRect(x, y, 72, 56);
        }
    }

}

   

