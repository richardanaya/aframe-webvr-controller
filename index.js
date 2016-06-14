// aframe-webvr-controller.js
// repo    : https://github.com/richardanaya/aframe-webvr-controller
// license : MIT

(function (window, module, AFRAME) {
  "use strict";
	AFRAME = AFRAME.aframeCore || AFRAME;
	function getPoseMatrix (pose, display) {
		var orientation = new THREE.Quaternion();
		var position = new THREE.Vector3();
		var scale = new THREE.Vector3();
		scale.fromArray([1,1,1]);

		if (!orientation) {
			orientation.fromArray([0, 0, 0, 1]);
		}
		else {
			orientation.fromArray(pose.orientation);
		}
		if (!position) {
			position.fromArray([0, 0, 0]);
		}
		else {
			position.fromArray(pose.position);
		}

		var m = new THREE.Matrix4();
		m.compose(position,orientation,scale)


		var stage = new THREE.Matrix4();
		stage.fromArray(display.stageParameters.sittingToStandingTransform);
		stage.multiply(m);
		return stage;
	}

	AFRAME.registerComponent('webvr-controller', {
		schema: { type: 'int' },

	  watchIntersectionForButton: function(button){
	    var _this = this;
	    function handleRayPress(){
				if(!this.components.raycaster){return;}
	      var ints = this.components.raycaster.intersectedEls;
	      for(var i = 0 ; i < ints.length; i++){
	        if(ints[i]!=_this.el && _this.intersections[i].face != null){
	          ints[i].emit("raycaster-intersected-webvrcontroller"+_this.attrValue+"button"+button+"pressed",{intersection:_this.intersections[i],intersections:_this.intersections})
	          return;
	        }
	      }
	    }
	    function handleRayReleased(){
				if(!this.components.raycaster){return;}
	      var ints = this.components.raycaster.intersectedEls;
	      for(var i = 0 ; i < ints.length; i++){
	        if(ints[i]!=_this.el && _this.intersections[i].face != null){
	          ints[i].emit("raycaster-intersected-webvrcontroller"+_this.attrValue+"button"+button+"released",{intersection:_this.intersections[i],intersections:_this.intersections})
	          return;
	        }
	      }
	    }
	    _this.el.addEventListener("webvrcontrollerbutton"+button+"pressed",handleRayPress)
	    _this.el.addEventListener("webvrcontrollerbutton"+button+"released",handleRayReleased)
	  },

	  init: function(){
	    var _this = this;
	    _this.intersections = [];
	    _this.intersectionEvents = [];
	    function handleIntersections(e){
	      _this.intersections = e.detail.intersections;
	    }
	    _this.el.addEventListener("raycaster-intersection",handleIntersections);
	  },

		update: function(){
			if(!this.buttons){
				this.buttons = [];
			}
			var _this = this;
			navigator.getVRDisplays().then(function(displays) {
				if (displays.length > 0) {
					_this.display = displays[0];			}
			});
		},

		tick: function () {
			var object3D = this.el.object3D;
			if(this.display){
				var vrGamepads = [];

				var gamepads = navigator.getGamepads();

				for (var i = 0; i < gamepads.length; ++i) {
					var gamepad = gamepads[i];
					if (gamepad && gamepad.pose) {
						vrGamepads.push(gamepad);
					}
				}

				if(this.display && vrGamepads.length>this.attrValue){
					var gamepad = vrGamepads[this.attrValue];

					if ("vibrate" in gamepad) {
						var vibration = this.el.getAttribute("webvr-controller-vibration");
						if(vibration == "true"){
							gamepad.vibrate(100)
						}
						if(vibration|0 > 0){
							gamepad.vibrate(vibration)
						}
					}

					for (var j = 0; j < gamepad.buttons.length; ++j) {
	          if(this.intersectionEvents[j]!==true){
	            this.watchIntersectionForButton(j);
	            this.intersectionEvents[j] = true;
	          }
						if (gamepad.buttons[j].pressed) {
							if(this.buttons[j]===false||this.buttons[j]===undefined){
								this.buttons[j]=true;
								this.el.emit("webvrcontrollerbutton"+j+"pressed");
							}
						}
						else {
							if(this.buttons[j]===true){
								this.buttons[j]=false;
								this.el.emit("webvrcontrollerbutton"+j+"released");
							}
						}
					}
					object3D.matrix = getPoseMatrix(gamepad.pose, this.display);
					object3D.matrixAutoUpdate = false;
				}
			}
		}
	});
})(
  typeof window !== "undefined" ? window : {},
  typeof module !== "undefined" ? module : {},
  typeof require !== "undefined" ?  AFRAME || window.AFRAME || require("aframe") : (AFRAME || window.AFRAME)
);
