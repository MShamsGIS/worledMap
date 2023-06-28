let mymap;
let view;
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapGallery",
  "esri/widgets/AreaMeasurement2D",
  "esri/layers/FeatureLayer",
], ( esriConfig , Map, MapView, BasemapGallery, AreaMeasurement2D, FeatureLayer) => {
  esriConfig.apiKey =
  "AAPK513684e248f14a459b9307104a93a24c61-Q65Yp6-CD3m4cDiHwsi61wMCGkvWnnzV2H1_11es94dkyP9BUKzH-g7w8sygp";





  let mylayer = new FeatureLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0",
    definitionExpression: "pop >5000000",
    popupTemplate: {
      title: "CITY NAME : {CITY_NAME} ",
      content: "POP IS : {POP}",
    },
    
  });
  // mylayer.renderer = {
    // type:"class-breaks",
    // field:"POP",
    // classBreakInfos: [
    //   {
    //     minValue: 0,
    //     maxValue: 500000,
    //     // symbol: {
    //     //   type: "simple-marker",
    //     //   style: "circle",
    //     //   color: "red",
    //     // },
    //   },
    // ],
  // };

  mymap = new Map({
    basemap: "terrain",
    layers: [mylayer],
  });

  view = new MapView({
    map: mymap,
    container: "mapdiv",
    zoom: 2,
    center: [60, 60],
  });

  // view.on("click", (e) => {
  //   // console.log(e);
  //   view.goTo(
  //     {
  //       center: [e.mapPoint.longitude, e.mapPoint.latitude],
  //       zoom: 7,
  //     },
  //     { duration: 4000 }
  //   );
  // });
  // ............................/............................/..............

  let basemapGallery = new BasemapGallery({
    view: view,
  });
  view.ui.add(basemapGallery, "top-right");
  // ******************************************
  var Button = document.getElementById("Button");
  var flag = false;
  Button.addEventListener("click", function () {
    if (flag == false) {
      view.ui.remove(basemapGallery);
      flag = true;
      Button.textContent = "Show BasemapGallery ";
    } else if (flag == true) {
      view.ui.add(basemapGallery, "top-right");
      flag = false;
      Button.textContent = "Hide BasemapGallery ";
    }
  });
  // ............................/............................/..............
  mylayer.on("layerview-create", function (e) {
    alert("hello Worled");
    mylayer.queryExtent().then(function (data) {
      console.log(data);
      view.goTo(data.extent, { duration: 5000 });
    });
  });
  // ............................/............................/..............
  let myMeasure = new AreaMeasurement2D({
    view: view,
  });
  view.ui.add(myMeasure, "top-left");
  // ******************************************
  var Butt = document.getElementById("dis");
  var flag = false;
  Butt.addEventListener("click", function () {
    if (flag == false) {
      view.ui.remove(myMeasure);
      flag = true;
      Butt.textContent = "Show Measure ";
    } else if (flag == true) {
      view.ui.add(myMeasure, "top-left");
      flag = false;
      Butt.textContent = "Hide Measure ";
    }
  });

  // ............................/............................/..............
  let streetBtn = document.getElementById("streetBtn");
  streetBtn.addEventListener("click", function () {
    mymap.basemap = "streets";
  });
  // ******************************************
  let hybridBtn = document.getElementById("hybridBtn");
  hybridBtn.addEventListener("click", function () {
    mymap.basemap = "hybrid";
  });
  // ******************************************
  let darkBtn = document.getElementById("dark-grayBtn");
  darkBtn.addEventListener("click", function () {
    mymap.basemap = "dark-gray";
  });
});
