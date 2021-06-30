//grab everything we need


const buttonColours = ["blue" , "red" , "yellow" , "green"];
const gamePattern = [];
const userClickedPattern = [];
let game = false;
let level = 0;


// functions


startGame = () => {

  $(document.body).one('keypress', function(){
    game = true;
    nextSequence();
   
  });
};

startGame();

nextSequence = () =>{

    const randomNumber = Math.round(Math.random () * 3);
    let randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);
   $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    
    $('#level-title').text(`Level ${level}`);
  
    level++;
    userClickedPattern.length = 0;
};


chooseButton = () => {

  $('[type=button]').click(function (e) { 
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    const clicked = e.target;
    console.log(clicked);
    playSound(userChosenColour);
    animatePress(clicked , 'pressed' , 100);
    checkAnswer(userClickedPattern.length-1);
   }); 

};
chooseButton();
checkAnswer = (currentLevel) => {

  console.log(currentLevel);
  console.log(gamePattern);
  console.log(userClickedPattern[currentLevel]);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
  
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence,1000);
    }
  } else {
    $('#level-title').text(`Game Over, Press Any Key To Restart`);
    playSound('wrong');

   animatePress(document.body , 'game-over' , 1000);
   gamePattern.length = 0;
   level = 0;
    startGame();
    
  }
}

playSound = (name) => {

    const audio = new Audio(`/sounds/${name}.mp3`);
   audio.play();
}

animatePress = (currentColor , className , time) =>{

    $(currentColor)
  .addClass(className)
  .delay(time)
  .queue(function(next){
    $(this).removeClass(className);
    next();
  });

}


//addEventListner


