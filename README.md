# aframe-webvr-controller
A component for quickly attaching objects to webvr controllers in a-frame. This library works perfectly fine with HTC-Vive using webvr enabled versions of chrome. For more information, check out http://webvr.info

# Installing

```
npm install aframe-webvr-controller
```

# Usage 
Using this component is simple. Pass in the index of the controller you wish to use.  Please make sure you have an a-camera at position <0,0,0>, otherwise strange offsetting of the controllers may occur!

```html 
<html>
<head>
    <script src="../aframe.js"></script>
    <script src="../../index.js"></script>
</head>
<body>
<a-scene>
    <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="0"></a-box>
    <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="1"></a-box>
    <a-camera id="player"></a-camera>
</a-scene>
</body>
</html>
```
