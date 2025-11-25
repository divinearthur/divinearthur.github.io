// Ensure window.opspark exists
window.opspark = window.opspark || {};

window.opspark.makeApp = function(updateables) {
    var updateList = updateables ? [].concat(updateables) : [];
    
    // Get canvas + stage
    var canvas = document.getElementById("canvas");
    var stage = new createjs.Stage(canvas);

    // Create a container for all drawings
    var view = new createjs.Container();
    stage.addChild(view);

    // App object returned
    var app = {
        canvas: canvas,
        stage: stage,
        view: view,

        addUpdateable: function(updateable) {
            updateList.push(updateable);
            return app;
        },

        removeUpdateable: function(updateable) {
            var index = updateList.indexOf(updateable);
            if (index !== -1) updateList.splice(index, 1);
            return app;
        },

        update: function() {
            for (var i = 0; i < updateList.length; i++) {
                if (typeof updateList[i].update === "function") {
                    updateList[i].update();
                }
            }
            stage.update();
        }
    };

    // Resize (kept simple)
    function resize() {
        canvas.width = 500;
        canvas.height = 500;
        stage.update();
    }
    window.addEventListener("resize", resize);
    resize();

    // Ticker
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", app.update);

    return app;
};
