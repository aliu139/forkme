cheet('p a x o s', function () {
  alert('god mode enabled');
});

cheet('$ h a t t', function () {
  alert('OMG $HATT5EVER!');
});

cheet('m u a h', function () {
  alert('<3 么么哒');
});

cheet('t r u m p', function () {
  alert('Trump mode activated!');
  TRUMP_MODE = true;
  CHANCE_OF_SNIPPET = 0;

  addHat("res/hair.png", "hairBaby");
});

cheet('h a c k', function(){
  alert('I tip my fedora to you good sir');
  addHat("res/fedora.png", "fedoraBaby");
})

function addHat(imgName, className){
  let tempElement = document.createElement("IMG");
  tempElement.src = imgName;
  tempElement.classList.add(className);

  $("#datHair").prepend(tempElement);
}
