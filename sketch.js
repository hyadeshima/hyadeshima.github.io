// this is a mirror gallery that is interactive based on the brightness of the video input. so if you move around different effects will happen in different mirrors

// click and hold to see mirror 2
// hold any key to see mirror 3

var zoff = 0
var capture
var arrayAverage= 0
var colour = 255
var shapeof = 0.05

function setup() {
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  frameRate(20)
}

function draw() {
  background(255);
// MIRROR 1:

    push()
       // for least lag i will comment out colour and shapeof, but you can uncomment them and see the effects 
  
    //console.log(getAverageBrightness())
  // when tested average brightness of the middle is around 35 - 85
  
  
  // map the the brightness to the colour of the stroke
  // so that when you move around the canvas the colour of all the blobs will change
  // the changing of colours is not as smooth because it is laggy
  
  //colour = map(getAverageBrightness(), 35, 85, 50, 150)
  
  
  // map the bightness to how many vertices the blob has
  
  //shapeof = map(getAverageBrightness(), 35, 85, 0.5, 0.05)
  
  
    // map the brightness to stroke weight
  //let weight = map(getAverageBrightness(), 35, 85, 2, 8)
  
  weight = 5
  blobsinblob(width/2,height/2, colour, shapeof, weight) 
  pop()

  
// MIRROR 2:
  // click and hold the ouse to view mirror 2
  // move around to see its effect
  if(mouseIsPressed){
    // scale(100)
    // translate(-100,-100)
    background(255, 255, 167)
    circlewidth()
  }
  
// MIRROR 3:
  //press and hold any key to view mirror 3
  // move around to see the afects
  if(keyIsPressed){
    background(0)
    linedMirror()
  }
  
}
// MIRROR 1:

function blobsinblob (x, y, colour, shapenum, weight){
  //all the wormhole circles are centered around the x and y
  translate(x, y)
  // create many blobs that get smaller
  // 115 blobs will be made
  for(let x = 0; x <115; x++){
    scale(0.97)
    //rotate(0.01)
    // for the second and third argument, the spikiness and zoff of each blob is changed so the blobs dont look too uniform
    blob(shapenum, (0.1+x*0.2), 0.0004 +x*0.0000002, colour, weight)
  }
  
}


// makes a blob
//where:
// wha is the scaled number of vertices the shape has
// spikiness is the max noise, so if spikiness is higher the spikier the shape
// k controls the zoff, which controls the speed at which the blob moves
// colour affects the stroke colour of the shape
// weight affects the stroke weight of the shape
function blob(wha, spikiness, k, colour, weight){
  // i learnt the code for how to make the shape from
  // https://www.youtube.com/watch?v=ZI1dmHv3MeM
  stroke(193, 158, colour)
  strokeWeight(weight)
  noFill()
  //make shape
  beginShape()
  let noiseMax = spikiness
  for(let i = 0; i < TWO_PI; i += wha){
    let xoff = map(cos(i), -1, 1, 0, noiseMax)
    let yoff = map(sin(i), -1, 1, 0, noiseMax)
    let r = map(noise(xoff, yoff, zoff), 0, 1, 330, 400);
    let x = r * cos(i)
    let y = r * sin(i)
    vertex(x,y)  
  }
  endShape(CLOSE)
  zoff += k
}

function getAverageBrightness() {
  // get the bright ness of every 10 pixels in the middle of canvas
  // if you stand against a white background and you are in the middle this will work
// so if you are in the middle the average birghtness will be higher
// if you are not the average brightness will be lower
  for( let i = 150; i < 250; i+= 10){
    for( let j = 150; j < 250; j+=10){
        let c = capture.get(i,j)
        let b = brightness(c)
        // adding up all the bightness levels
        arrayAverage+=b  
    } 
  }
  // averaging the brightness levels
  arrayAverage = arrayAverage/100
  return arrayAverage
}

//MIRROR 2:

function circlewidth(){
  // the brighter the value is at that point the bigger the circle is
    for( let i = 0; i < 400; i+= 20){
    for( let j = 0; j < 400; j+=20){
        let c = capture.get(i,j)
        let b = brightness(c)
        // map the circle width to the brightness, let brightness be between 20, 100 and let the max circle width be 15
        let circwidth = map(b, 20,100, 0, 15)
        fill(220,20,60)
      noStroke()
        ellipse(10 +i, 10 +j, circwidth, circwidth)
    } 
  }
  
}

//MIRROR 3:

function linedMirror(){
  noStroke()
  for(let i = 0; i < 400; i += 40){
    for(let j = 0; j < 400; j += 30){
      var c = capture.get(i, j);
      var b = brightness(c);
      //we want the lines to go up accroding to brightness
      //if brightness is less than 60 then the line is printed and it also move according to how bright it is
      // i didnt use map here becaus ei wanted to try somehting else, instead i multiplied the brightness by 0.25 and added it to the y value of the line so it moves up and down
      // i changed the lines to text but can comment out and change back if you want
      if(b<60){
      // stroke(255,b)
      // strokeWeight(4)
      // line(10+i, 0+j+(b*0.25), 40+i, 0+j+(b*0.25)) 
        fill(255);
        textSize(10);
        text("bright!",i, j+(b*0.25))
      }
      // the text that are not abouve 60 brightness will stay in place and have a lower colour
      else{
        fill(100);
        textSize(20);
        text(":(",i, j)
      }
    }
  }
}



