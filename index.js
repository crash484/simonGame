var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

    
    // Now it's safe to interact with DOM elements
    
    $(document).keypress(function() {
        if(!started){
        nextSequence();
        started=true;}
    });


//sound function works perfectly
function playSound(randomChosenColour) {
    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.load();
    audio.play();
}

//level change function and highlight which to play 
function nextSequence(){

    var randomNumber= Math.floor(Math.random()*3 +1);
    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  

    level++;
    $("h1").text("Level "+level);
}


//click button function to generate sound and add animation
$(".btn").on('click',function(){
    var userchose= this.id;
    userClickedPattern.push(userchose);
    $("#"+userchose).fadeOut(100).fadeIn(100);
    playSound(userchose);
    gameLogic(userClickedPattern.length-1);
})

//game logic
function gameLogic(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            userClickedPattern=[];
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else{
        $("body").addClass("game-over");

        setTimeout(function() {

            $("body").removeClass("game-over");
        }, 500);  // 200 milliseconds delay


          $("h1").text("Press A Key to Start");

        gameOver();
        
    }

}




function gameOver(){
    gamePattern.length=0;
    userClickedPattern.length=0;
    level=0;
    started=false;
    
}

