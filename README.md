# aframe-webvr-controller
A-Frame ( http://aframe.io ) is a library made by Mozilla to make VR experiences in the web.
This is a component for quickly attaching objects to WebVR controllers in a-frame. This library works perfectly fine with HTC-Vive using WebVR enabled versions of chrome and is the primary reason I made this library! For more information, check out http://webvr.info

Check out demo here: http://richardanaya.github.io/aframe-webvr-controller/examples/02_vibration/index.html

Features
* Position tracking
* Simple button events
* Vibration
* Events on triggering while interesected

Notes
* You may have to build the latest master branch of aframe to get it to recognize your HTC Vive can go into VR mode ( or just copy mine from examples )

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

Let's add some button events. There are several buttons your webvrcontroller may have. For HTC Vive:
* webvrcontrollerbutton0pressed/webvrcontrollerbutton0released - circle button
* webvrcontrollerbutton1pressed/webvrcontrollerbutton1released - trigger button
* webvrcontrollerbutton2pressed/webvrcontrollerbutton2released - grip button
* webvrcontrollerbutton3pressed/webvrcontrollerbutton3released - menu button

```html
<html>
<head>
    <script src="../aframe.js"></script>
    <script src="../../index.js"></script>
</head>
<body>
<a-scene>
    <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="0">
        <a-event name="webvrcontrollerbutton0pressed" color="#0000FF"></a-event>
        <a-event name="webvrcontrollerbutton0released" color="#FF0000"></a-event>
    </a-box>
    <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="1">
        <a-event name="webvrcontrollerbutton0pressed" color="#0000FF"></a-event>
        <a-event name="webvrcontrollerbutton0released" color="#FF0000"></a-event>
    </a-box>
    <a-camera id="player"></a-camera>
</a-scene>
</body>
</html>
```

Now lets add some vibration.

<html>
<head>
    <script src="../aframe.js"></script>
    <script src="../../index.js"></script>
</head>
<body>
<a-scene>
    <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="0">
        <a-event name="webvrcontrollerbutton1pressed" color="#0000FF" webvr-controller-vibration="true"></a-event>
        <a-event name="webvrcontrollerbutton1released" color="#FF0000" webvr-controller-vibration="false"></a-event>
    </a-box>
    <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="1">
        <a-event name="webvrcontrollerbutton1pressed" color="#0000FF" webvr-controller-vibration="true"></a-event>
        <a-event name="webvrcontrollerbutton1released" color="#FF0000" webvr-controller-vibration="false"></a-event>
    </a-box>
    <a-camera id="player"></a-camera>
</a-scene>
</body>
</html>

You can also pass in a number in millseconds to represent a delay (the default delay is 100). Setting the property to false or 0 will turn off vibration.

Now lets add some events for when a user presses a button while they are intersecting a component

<a-scene>

    <a-box id="table" position="0 0 0" width="2" depth="2" height=".1" color="#333333" roughness="0.8">
      <!--controller 0 button 1 will change color-->
      <a-event name="raycaster-intersected-webvrcontroller0button1pressed" color="#FFC65D"></a-event>
      <a-event name="raycaster-intersected-webvrcontroller0button1released" color="#F16745"></a-event>
    </a-box>
    <!--this should not get hit from the top-->
    <a-box id="table2" position="0 -2 0" width="2" depth="2" height=".1" color="#333333" roughness="0.8">
      <!--controller 0 button 1 will change color-->
      <a-event name="raycaster-intersected-webvrcontroller0button1pressed" color="#FFC65D"></a-event>
      <a-event name="raycaster-intersected-webvrcontroller0button1released" color="#F16745"></a-event>
    </a-box>

  <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="0" raycaster laser>
      <a-event name="webvrcontrollerbutton1pressed" color="#0000FF" webvr-controller-vibration="true"></a-event>
      <a-event name="webvrcontrollerbutton1released" color="#FF0000" webvr-controller-vibration="false"></a-event>
  </a-box>
  <a-box width=".1" height=".1" depth=".1"  color="#4CC3D9" webvr-controller="1" raycaster laser>
      <a-event name="webvrcontrollerbutton1pressed" color="#0000FF" webvr-controller-vibration="true"></a-event>
      <a-event name="webvrcontrollerbutton1released" color="#FF0000" webvr-controller-vibration="false"></a-event>
  </a-box>
  <a-camera id="player"></a-camera>
</a-scene>
