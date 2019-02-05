// Examples use USGS Earthquake API: https://earthquake.usgs.gov/fdsnws/event/1/#methods
let earthquakes;

let isLoaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  //textAlign(CENTER);
  let url =
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-01-01&endtime=2018-01-02";

  httpGet(url, "json", false, function(response) {
    isLoaded = true;
    earthquakes = response;
    console.log(earthquakes);
  });
}

function draw() {
  background(200);
  if (isLoaded) {
    let rectX;
    let rectY = (height * 2) / 3;
    let rectWidth;
    //let num = earthquakes.features.length;
    let num = 200;
    let size = 60;
    let earthquakeMag;
    let earthquakePlace;
    let earthquakeInfo;
    for (let i = 0; i <= num; i++) {
      earthquakeMag = earthquakes.features[i].properties.mag;

      earthquakePlace = earthquakes.features[i].properties.place;
      earthquakeInfo = earthquakePlace.split(", ");
      if (earthquakeInfo[0] === undefined) {
        earthquakeInfo[0] = "";
      }
      if (earthquakeInfo[1] === undefined) {
        earthquakeInfo[1] = "";
      }

      earthquakeDate = new Date(earthquakes.features[i].properties.time);
      let iterator = i;
      while (earthquakeDate === undefined) {
        earthquakeDate = new Date(
          earthquakes.features[iterator - 1].properties.time
        );
        iterator--;
      }

      rectWidth = size;
      rectX = size + rectWidth * i;

      stroke(0);
      text(earthquakeInfo[1], rectX, rectY - earthquakeMag * size - 20);

      noStroke();
      let hours = earthquakeDate.getHours();
      let minutes = earthquakeDate.getMinutes();
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }
      let time = hours + ":" + minutes;
      text(time, rectX, rectY - earthquakeMag * size - 5);

      rect(rectX, rectY, rectWidth, -earthquakeMag * size);

      if (mouseX >= rectX && mouseX <= rectX + rectWidth) {
        stroke(0);
        line(rectX, rectY - earthquakeMag * size, rectX, rectY + 20);
        noStroke();
        text(earthquakeInfo[0], rectX, rectY + 35);
      }
    }
  }
}
