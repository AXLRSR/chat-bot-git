// Disable the refresh on submit
document.querySelector("form").addEventListener("click", function(event){
  event.preventDefault()
});

// List of bots
var bot = [{
  id: 0,
  name: 'BOT Help',
	action: '/help'
},{
  id: 1,
  name: 'BOT Roll',
	action: '/roll'
},{
  id: 2,
  name: 'BOT Time',
	action: '/time'
}];

// Display all the bots in the contact list
function displayBot() {
  var contact = document.querySelector(".contact");
  for (let i = 0; i < bot.length; i++) {
    contact.innerHTML += `<div class="contact__profile">
      <div class="contact__picture">
        <img src="./assets/img/bot`+ bot[i].id +`.png" alt="bot" class="contact__picture__img">
      </div>
      <span class="contact__name">`+ bot[i].name +`</span>
      <span class="contact__counter">0</span>
    </div>`
  }
}

document.onload = displayBot();

function sendMessage(){
  var inputVal = document.getElementById("message").value; // Retrieve the user input
  var tchat = document.querySelector(".tchat");

  var newTchatSend = document.createElement("div"); 
  newTchatSend.className = "tchat__send";

  newTchatSend.innerHTML += `<p class="tchat__send__message">`+inputVal+`</p>`;
  
  tchat.prepend(newTchatSend); // Insert it into the html (display the message)

  var response = botTest(inputVal);
  sendResponse(response);

  document.getElementById('message').value = ''; // Reset the input
}

function counterBot(id){
  var counterId = document.querySelectorAll(".contact__counter")[id];
  var counter = counterId.textContent;

  counter = Number(counter);
  counter += 1;
  counterId.textContent = counter;
}

// Test if the message sent is a bot action and send the corresponding message
function botTest(inputVal) {
  switch (inputVal){
    case bot[0].action : 
      var counter = bot[0].id;
      counterBot(counter); // Increment the counter

      var commands = "";
      for (let i = 0; i < bot.length; i++) {
        commands += "<br/>"+bot[i].action ;
      }
      response = "List of usable commands:" + commands;
      return [0, response];
    
    case bot[1].action : 
      var counter = bot[1].id;
      counterBot(counter);

      randomRoll = Math.floor((Math.random()*99));
      response = "Your random number is " + randomRoll;
      return [1, response];

    case bot[2].action : 
      var counter = bot[2].id;
      counterBot(counter);

      var time = new Date();
      var hh = String(time.getHours()).padStart(2, '0');
      var mm = String(time.getMinutes()).padStart(2, '0');
      time = hh + ':' + mm;
      response = "It is " + time;
      return [2, response];

    default:
      var counter = bot[0].id;
      counterBot(counter);
      response = "This command doesn't exist. Try " + bot[0].action;
      return [0, response];
  }
}

// Display the response of the bot
function sendResponse(response) {
  var id = response[0];
  var message = response[1];

  var date = new Date();
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  date = dd + '/' + mm + '/' + yyyy;

  var tchat = document.querySelector(".tchat");

  var newTchatReceived = document.createElement("div"); 
  newTchatReceived.className = "tchat__received";

  newTchatReceived.innerHTML += `<div class="tchat__received__top">
    <div class="tchat__received__picture">
      <img src="./assets/img/bot`+ bot[id].id +`.png" alt="bot">
    </div>
    <span class="tchat__received__name">`+ bot[id].name +`</span>
    <span class="tchat__received__date">`+date+`</span>
  </div>
  <p class="tchat__received__message">`+message+`</p>`;

  tchat.prepend(newTchatReceived);
}