/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// // Create viewer.
// var viewer = new Marzipano.Viewer(document.getElementById('pano'));

// // Create source.
// var source = Marzipano.ImageUrlSource.fromString(
//   "tiles/0/{z}/{f}/{y}/{x}.jpg",
//   { cubeMapPreviewUrl: "tiles/0/preview.jpg" });

// // Create geometry.
// var geometry = new Marzipano.CubeGeometry([
//     { tileSize: 256, size: 256, fallbackOnly: true },
//     { size: 512, tileSize: 512 },
//     { size: 1024, tileSize: 512 },
//     { size: 2048, tileSize: 512 }
// ]);

// // Create view.
// var limiter = Marzipano.RectilinearView.limit.traditional(2048, 120*Math.PI/180);
// var view = new Marzipano.RectilinearView(null, limiter);

// // Create scene.
// var scene = viewer.createScene({
//   source: source,
//   geometry: geometry,
//   view: view,
//   pinFirstLevel: true
// });

// // Display scene.
// scene.switchTo({ transitionDuration: 0 });

var panoElement = document.getElementById('pano');
var viewerOpts = {
  controls: {
    mouseViewMode: 'drag'    // drag|qtvr
  }
};

var viewer = new Marzipano.Viewer(panoElement, viewerOpts)

var levels = [
  { tileSize: 256, size: 256, fallbackOnly: true },
  { tileSize: 512, size: 512 },
  { tileSize: 512, size: 1024 }
];

var geometry = new Marzipano.CubeGeometry(levels);

var source = Marzipano.ImageUrlSource.fromString("tiles/{z}/{f}/{y}/{x}.jpg", {
  cubeMapPreviewUrl: "tiles/preview.jpg"
});

var initialView = {
  yaw: 90 * Math.PI/180,
  pitch: -30 * Math.PI/180,
  fov: 90 * Math.PI/180
};

var limiter = Marzipano.RectilinearView.limit.traditional(1024, 120*Math.PI/180);

var view = new Marzipano.RectilinearView(initialView, limiter);

var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});

scene.switchTo({
  transitionDuration: 1000
});

function send2(){
  var answer = document.getElementById('Q2').value;
  if(answer == "梅乾菜"){
    if(getCookieByName('Q2') != 'done'){
      swal("答對了！", "恭喜你獲得B道具一個", "success");
      document.cookie = 'Q2=done;path=/';
    }else{
      swal("答對了！", "但你已經獲得B道具過囉，可以去找找其他道具喔！", "success");
    }
    
  }else{
    swal("答錯了！", "不要灰心，仔細找找場景裡的線索再試一次吧", "error");
  }
}


function btn1(){
  swal("歡迎來到福菜小教室", "你必須要在場景里搜訊線索，並回答問題蒐集道具，才能成為福菜小達人！", "info");
  console.log(getCookieByName('Q1'));
}

function btn2(){
  var ItemX = 0;
  var ItemA = 0;
  var ItemB = 0;
  var ItemC = 0;
  if(getCookieByName('Q0') == 'done'){
    ItemX = 1;
  }
  if(getCookieByName('Q1') == 'done'){
    ItemA = 1;
  }
  if(getCookieByName('Q2') == 'done'){
    ItemB = 1;
  }
  if(getCookieByName('Q3') == 'done'){
    ItemC = 1;
  }

  if(getCookieByName('Q0') == 'done' && getCookieByName('Q1') == 'done' && getCookieByName('Q2') == 'done' && getCookieByName('Q3') == 'done'){
    swal("恭喜", "你已經蒐集完所有道具囉，恭喜你成為福菜小達人", "success");
  }else{
    var show = "X道具:"+ ItemX + "/1 \n A道具:" +ItemA+ "/1 \n B道具:"+ItemB+"/1 \n C道具:" + ItemC+ "/1";
    swal("要收集的道具還有", show, "info");
  }
}


function parseCookie() {
  var cookieObj = {};
  var cookieAry = document.cookie.split(';');
  var cookie;
  
  for (var i=0, l=cookieAry.length; i<l; ++i) {
      cookie = jQuery.trim(cookieAry[i]);
      cookie = cookie.split('=');
      cookieObj[cookie[0]] = cookie[1];
  }
  
  return cookieObj;
}

function getCookieByName(name) {
  var value = parseCookie()[name];
  if (value) {
      value = decodeURIComponent(value);
  }

  return value;
}