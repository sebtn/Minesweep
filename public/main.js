var grid
var cols
var rows 
var w = 20
var totalBees = 20

/*-------------------------------------------------------*/
function make2DArray(cols, rows) {
  var arr = Array(cols)
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  return arr
}

/*-------------------------------------------------------*/
function setup() {
  createCanvas(201, 201)
  cols = floor(width / w)
  rows = floor(height / w)
  grid = make2DArray(cols, rows)
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // initialize grid using cells
      grid[i][j] = new Cell(i, j, w)
    }
  }

  // options
  var options = []
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j])
    }
  }

  //pick totalBees spots 
  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length))
    var choice = options[index]
    var i = choice[0]
    var j = choice[1]
    // splice deletes the spot from options
    // so no bee spot is repeated
    options.splice(index, 1) 
    grid[i][j].bee = true
  }

  // count neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees()
    }
  }
}

/*-------------------------------------------------------*/
function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true    
    }
  }
}

/*-------------------------------------------------------*/
function draw() {
  background(255)
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // initialize grid using cells
      grid[i][j].show()
    }
  }
}

/*-------------------------------------------------------*/
function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      // Check every spot for mouse spot reveal on click
      if ( grid[i][j].contains(mouseX, mouseY) ) {
        grid[i][j].reveal()
        if (grid[i][j].bee) { 
          gameOver() 
        }
      }
    }
  }
}