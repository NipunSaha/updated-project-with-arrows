AFRAME.registerComponent("drive",{
    init : function(){
        var gameStateValue = this.el.getAttribute("game")
        if(gameStateValue=="play"){
            this.driveCar()
        }
    },
    isVelocityActive : function(){
        return Math.random() < 0.25
    },
    driveCar : function(){  
        var multiply = 10
        var wheelRotation = 0
        window.addEventListener("keydown",(e) => {
            var wheel = document.querySelector("#control_wheel")
            if (e.code == "ArrowRight" && wheelRotation > -40){
                wheelRotation -= 5
                wheel.setAttribute("rotation",{x:0, y:0, z:wheelRotation})
            }
            if (e.code == "ArrowLeft" && wheelRotation < 40){
                wheelRotation += 5
                wheel.setAttribute("rotation",{x:0, y:0, z:wheelRotation})
            }
            var cameraControl = document.querySelector("#camera_cursor")
            var cameraRotation = cameraControl.getAttribute("rotation")
            var cameraPosition = cameraControl.getAttribute("position")
            var cameraMoveControl = cameraControl.getAttribute("movement-control")
            
            cameraControl.setAttribute("movement-control",{"speed" : cameraMoveControl.speed + 0.005})
            var cameraDirection  = new THREE.Vector3()
            cameraControl.object3D.getWorldDirection(cameraDirection)
            if (e.code == "ArrowUp"){
                multiply += 0.5
                if(multiply <= 100 && cameraPosition.z > -500){
                    cameraControl.setAttribute("movement-control",{"speed" : cameraMoveControl.speed + 0.005})
                    var accelerator = document.querySelector("#control_acc")
                    accelerator.setAttribute("material","color","green")
                    var speed = document.querySelector("#speed")
                    speed.setAttribute("text",{"value":multiply})
                }
            }
            if (e.code == "space"){
                cameraControl.setAttribute("movement-control",{"speed" : 0})
                var control_break = document.querySelector("#control_break")
                control_break.setAttribute("material","color","red")
            }
            if (e.code == "ArrowRight"){
                cameraRotation.y -= 5
                cameraControl.setAttribute("rotation",{x:0, y:cameraRotation.y, z:0})
                cameraControl.setAttribute("movement-control",{"speed" : cameraMoveControl + 0.005})
            }
            if (e.code == "ArrowLeft"){
                cameraRotation.y += 5
                cameraControl.setAttribute("rotation",{x:0,y:cameraRotation.y, z:0})
                cameraControl.setAttribute("movement-control",{"speed" : cameraMoveControl - 0.005})
            }
        })
    }
})