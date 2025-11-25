var init = function (window) {
    'use strict';
    
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');

    //========================
    // Variables
    //========================
    // TODO 1: Declare our variables
    var circle; 
    var circles = [];
    var game;        // <-- Added so update() always has access

    // Helper function: generate random hex color
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //========================
    // Draw one circle
    //========================
    // TODO 2: Create a Function to Draw a Circle
    function drawCircle() {
        var radius = Math.floor(Math.random() * 21) + 10;
        var color = getRandomColor();

        // Code from TODO 2: Draw circle, add velocity, add to view, push to array
        circle = draw.randomCircleInArea(canvas, true, true, color, 2, radius);
        physikz.addRandomVelocity(circle, canvas, 5, 5);
        view.addChild(circle);
        circles.push(circle);
    }

    // Draw 100 circles
    // DELETE OR COMMENT OUT REPETITIVE CALLS FROM TODO 3
    // TODO 7: Draw 100 circles using a loop
    for (var i = 0; i < 100; i++) {
        drawCircle();
    }

    //========================
    // Update loop
    //========================
    function update() {
        if (!game) return; // Prevents early crashes

        // TODO 8 & 9: Iterate and update all circles (replaces TODO 4 & 5)
        for (var i = 0; i < circles.length; i++) {
            var currentCircle = circles[i]; 
            
            // TODO 4: Move the circle
            physikz.updatePosition(currentCircle);
            
            // TODO 5: Keep the circle in bounds
            game.checkCirclePosition(currentCircle);
        }
    }

    //========================
    // Game object
    //========================
    window.opspark.makeGame = function() {

        window.opspark.game = {};
        game = window.opspark.game;

        // TODO 6: Loop from All Sides
        game.checkCirclePosition = function(circle) {
            // Right Boundary: wraps to left
            if (circle.x > canvas.width) {
                circle.x = 0;
            }
            // Left Boundary: wraps to right
            if (circle.x < 0) {
                circle.x = canvas.width;
            }
            // Bottom Boundary: wraps to top
            if (circle.y > canvas.height) {
                circle.y = 0;
            }
            // Top Boundary: wraps to bottom
            if (circle.y < 0) {
                circle.y = canvas.height;
            }
        };

        // Add UI + updateables
        view.addChild(fps);
        app.addUpdateable(fps);

        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;

        app.addUpdateable(game);
    };

    // Start the game
    window.opspark.makeGame();
};

// DO NOT REMOVE THIS CODE ////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    module.exports = init;
}