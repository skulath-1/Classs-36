var Ball, database;
var position;
var ballP;

function setup() {
  //Initializing DB
  database = firebase.database()

  createCanvas(500, 500);

  Ball = createSprite(250, 250, 10, 10);
  Ball.shapeColor = "red";

  //1)Reading Value from DB

  //a)Refer to the node --> .ref()
  //b)create a listener - listen to all the changes in DB --> .on()
  //c)Retrieving the value from DB --> .val()
  //d)Saving the data

  ballP = database.ref('ball/position');
  ballP.on("value", readPosition)

}

function draw() {
  background("black");

  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +1);
  }
  drawSprites();

}

function writePosition(x, y) { 

  //2)Write/Update the value in DB

  //a)Refer to the node .ref()
  //b)update the value -> update() or set()

  database.ref('ball/position').set({
    x: position.x + x,
    y: position.y + y
  })

}

function readPosition(data) {

  position = data.val()

  console.log(position.x) //DB value X
  console.log(position.y) //DB value Y

  //Change the value of Ball sprite to DB value
  Ball.x = position.x
  Ball.y = position.y
}


