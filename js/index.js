// Disable the refresh on submit
document.getElementById("form").addEventListener("click", function(event){
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
  var tchat = document.getElementById("tchat");

  var newTchatSend = document.createElement("div"); 
  newTchatSend.className = "tchat__send"; // Create a new div and give it the class "tchat__send"
  var newTchatSendMessage = document.createElement("p");
  newTchatSendMessage.className = "tchat__send__message"; // Create a new p and give it the class "tchat__send__message"

  newTchatSendMessage.innerHTML += inputVal;
  newTchatSend.prepend(newTchatSendMessage); // Assemble the new elements
  
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
    case bot[1].action : 
      var counter = bot[1].id;
      counterBot(counter); // Increment the counter

      randomRoll = Math.floor((Math.random()*99));
      response = "Your random number is " + randomRoll;
      return [1, response];
    default:
      var counter = bot[0].id;
      counterBot(counter);
      response = "This command doesn't exist.";
      return [0, response];
  }
}

// Display the response of the bot
function sendResponse(response) {
  var id = response[0];
  var message = response[1];

  var tchat = document.querySelector(".tchat");

  var newTchatReceived = document.createElement("div"); 
  newTchatReceived.className = "tchat__received";

  newTchatReceived.innerHTML += `<div class="tchat__received__top">
    <div class="tchat__received__picture">
      <img src="./assets/img/bot`+ bot[id].id +`.png" alt="bot">
    </div>
    <span class="tchat__received__name">`+ bot[id].name +`</span>
    <span class="tchat__received__date">Date</span>
  </div>
  <p class="tchat__received__message">`+message+`</p>`;

  tchat.prepend(newTchatReceived);
}