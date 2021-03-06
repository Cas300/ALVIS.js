const Discord = require('discord.js');
const WolframService = require('../Services/Wolfram.js');
const DefaultResponse = require('./DefaultResponse.js');

class Wolfram extends DefaultResponse {
  constructor(bot) {
    super(bot);
    this.service = "Wolfram";
    if (this.bot.basic.services[this.service].active)
    this.wolframService = new WolframService(this.bot);
  }

  handle(message, response) {
    if (!this.bot.basic.services[this.service].active){
      this.disabledServiceHandler(message, response, this.service);
      return;
    }
    var action = response.result.action;
    var actionType = action.split(".")[1];
    if (actionType == "topic_search"){
      this.wolframService.sendWolframResponse(message, response, "I found this for you:\n\n", null, true, true, false, false, true);
    }else if (actionType == "resolve_equation"){
      this.wolframService.sendWolframResponse(message, response, "Here you go:\n\n", null, false, true, true, true);
    }else{
      this.defaultHandler(message, response);
    }
  }
}

module.exports = Wolfram;
