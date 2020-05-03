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
      var numRows =10;
      var numColumn =10;
      var canvasx =576;
      var canvasy =280;
      for (var x = 0, i = 0; i < numRows; x += (canvasx/numRows), i++) {
        for (var y = 0, j = 0; j < numColumn; y += (canvasy/numColumn), j++) {
            context.strokeRect(x, y, canvasx/numRows, canvasy/numColumn);
        }
    }
      //for (var x2 = 0, k = 0; k < numrows*3; x2 += ((canvasx/numRows)/3), k++) {
        //for (var y2 = 0, l = 0; l< numColumn*2; y2 += ((canvasy/numColumn)/3), l++) {
          //  context.strokeRect(x2, y2, ((canvasx/numRows)/3)), ((canvasy/numColumn)/3));
       // }
    //}

//}

   

