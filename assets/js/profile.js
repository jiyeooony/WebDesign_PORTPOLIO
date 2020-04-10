function init(){
    //stars
  
    var style = ["style1", "style2", "style3", "style4"];
    var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    var star = "";
    var numStars = 500;
    var night = document.querySelector(".constellation");
    var widthWindow = window.innerWidth;
    var heightWindow = window.innerHeight;
  
    for (var i = 0; i < numStars; i++) {
      star += "<span class='star " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
      + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
      + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
    }
  
    night.innerHTML = star;
    }
  
  window.onload = init;

  const button = document.querySelector('button');
  const aboutMe = document.querySelector('.aboutMe');
  aboutMe.onclick = () => {
    aboutMe.classList.add('aboutMe--transform');
    aboutMe.addEventListener('animationend', () => {
      document.querySelector('.card').classList.add('card--transform');
    })
  }