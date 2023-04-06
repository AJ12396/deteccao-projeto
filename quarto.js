var img = ""
var status = ""
var objects = []

function preload() {
    img = loadImage("bed_room.jpg")
}

function setup() {
    canvas = createCanvas(600,400)
    canvas.center()
    objectToDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: detectando objetos"
}


function modelLoaded() {
    console.log("O modelo foi carregado corretamente!")
    status = true
    objectToDetector.detect(camera, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
    
}

function draw() {
    if (status != "") {
        image(img,0,0,600,400)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: objetos detectados"
            fill("red")
            percent = Math.floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}