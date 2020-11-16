/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
    loadVideo();
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {

    console.log('Received Event: ' + id);
  }
};

app.initialize();

function loadVideo() {



  var canvas = document.createElement('canvas');
  canvas.style.border= '2px solid red'
  document.body.appendChild(canvas);
  canvas.height = 640;
  canvas.width = 480;

  var video = document.createElement('video');
  video.style.border= '2px solid blue'



  video.autoplay = true;
  document.body.appendChild(video);

const onFrame = () => {
  const canvasContext = canvas.getContext('2d');
  canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
  //setTimeout(onFrame, parseInt((1000/60)*25));
  window.requestAnimationFrame(onFrame);
};

// Refresh video tags position
if (window.cordova && window.cordova.plugins.iosrtc) {
  cordova.plugins.iosrtc.registerGlobals();

  // Enable iosrtc debug (Optional)

  setInterval(function () {
    cordova.plugins.iosrtc.refreshVideos();
  }, 500);
}

navigator.mediaDevices.getUserMedia({
  //If min and max are not set canvas is huge
  video: {width: {min:640, max:1000}, height: {min:480, max: 1000}},
  audio: false
}).then((stream) => {

  video.oncanplay = (event) => {
    window.requestAnimationFrame(onFrame);
  };

  video.srcObject = stream;

}).catch((error) => {
  console.log(error);
});
}
