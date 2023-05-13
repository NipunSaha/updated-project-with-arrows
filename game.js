AFRAME.registerComponent("game",{
    schema:{
        gameState:{type:"string",default:play}
    },
    init: function(){
        var duration = 300
        var timer = document.querySelector("#timer")
        this.startTimer(duration,timer)
    },
    startTimer: function(duration,timer){
        var min
        var sec
        setInterval(() => {
            if(duration>=0){
                this.data.gameState="play"
            }
        }, 100);
    }
})