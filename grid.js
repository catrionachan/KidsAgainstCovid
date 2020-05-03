//Array 1: for houses
var house= []; 
var rows = 8;
var columns=5
var occupiedHouse =false;
for (var i=0;i<rows;i++) 
{ 
house[i] = []; 
} 

for(var i=0;i<rows;i++){
	for(var j=0;j<columns;j++){
  house[i][j]= occupiedHouse;
  console.log(house[i][j])
}
}



//Array2: for rooms
var rooms= []; 
var rows = 8;
var columns=5;
var rowsRoom = 3;
var columnsRoom = 2;
var occupiedRoom =false;
for (var i=0;i<rows;i++) 
{ 
rooms[i] = []; 
for(var j=0;j<columns;j++){
  	rooms[i][j]= occupiedRoom;
  	console.log(rooms[i][j])
}
}

