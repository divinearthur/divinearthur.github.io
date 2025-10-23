$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
     toggleGrid();


    // TODO 2 - Create Platforms

  createPlatform(1350, 400, 50, 50, "DarkOrchid");
  
createPlatform(300, 660, 100, 20, "DarkOrchid");      
createPlatform(450, 560, 100, 20, "Lavender");
createPlatform(600, 460, 100, 20, "DarkOrchid");
createPlatform(750, 360, 100, 20, "Lavender");
createPlatform(900, 260, 100, 20, "DarkOrchid");



    // TODO 3 - Create Collectables

createCollectable("Cookie", 1350, 50);
createCollectable("diamond", 200, 170, 0.5, 0.7);


    
    // TODO 4 - Create Cannons
createCannon("left", 400, 1500);
createCannon("bottom", 600, 1200);
createCannon("top", 200, 1000);
createCannon("right", 300, 100);


    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
