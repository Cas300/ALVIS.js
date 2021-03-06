const Discord = require('discord.js');
const fs = require('fs');

class StartupCheck {
  constructor(bot) {
    this.bot = bot;
  }

  runConfigCheck() {
    this.bot.util.logger("Startup Configuration Check INITIATED");
    if (!this.bot.config.hasOwnProperty("discord_token") || typeof this.bot.config.discord_token !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("apiai_agent_token") || typeof this.bot.config.apiai_agent_token !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("wolfram_key") || typeof this.bot.config.wolfram_key !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("weather_underground_key") || typeof this.bot.config.weather_underground_key !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("news_api_key") || typeof this.bot.config.news_api_key !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("google_credentials")){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.google_credentials.hasOwnProperty("androidId") || !this.bot.config.google_credentials.hasOwnProperty("masterToken")){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("default_volume")){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("max_upload_size")){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("bot_activity_type") || typeof this.bot.config.bot_activity_type !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("bot_activity") || typeof this.bot.config.bot_activity !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("bot_activity_url") || typeof this.bot.config.bot_activity_url !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("deleteMessages") || typeof this.bot.config.deleteMessages !== 'boolean'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("message_report_threshold")){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("announce_new_members") || typeof this.bot.config.announce_new_members !== 'boolean'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("new_member_notify_admins") || typeof this.bot.config.new_member_notify_admins !== 'boolean'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("new_member_announcement_channel") || typeof this.bot.config.new_member_announcement_channel !== 'string'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.config.hasOwnProperty("welcome_dm") || typeof this.bot.config.welcome_dm !== 'boolean'){
      this.setDefaultConfig();
      return false;
    }
    if (!this.bot.permissions.hasOwnProperty("manager_role") || typeof this.bot.permissions.manager_role !== 'string'){
      this.setDefaultPermissions();
      return false;
    }
    if (!this.bot.permissions.hasOwnProperty("admin_role") || typeof this.bot.permissions.admin_role !== 'string'){
      this.setDefaultPermissions();
      return false;
    }
    if (!this.bot.permissions.hasOwnProperty("default_role") || typeof this.bot.permissions.default_role !== 'string'){
      this.setDefaultPermissions();
      return false;
    }
    if (this.bot.config.discord_token == "" || this.bot.config.discord_token == "YOUR_DISCORD_BOT_TOKEN"){
      console.log("ERROR: Discord bot token not configured. Please configure your token in './config/config.json'. See README for more information.");
      return false;
    }
    this.setEnabledServices();
    this.bot.util.logger("Startup Configuration Check PASSED");
    return true;
  }

  setDefaultConfig(file_missing) {
    if (file_missing) this.bot.util.logger("ERROR: No config file found! Generating new one with default values. Ensure settings are configured correctly then try again.");
    else this.bot.util.logger("ERROR: Missing fields in config file; resetting to default config values.");
    var default_config = require("./Templates/default_config.json");
    fs.writeFile("./config/config.json", JSON.stringify(default_config, null, 4), function(err){
      if (err) console.log(err);
    });
  }

  setDefaultPermissions() {
    this.bot.util.logger("ERROR: Missing fields in permissions file; resetting to default permissions values.");
    var default_permissions = require("./Templates/default_permissions.json");
    fs.writeFile("./config/permissions.json", JSON.stringify(default_permissions, null, 4), function(err){
      if (err) console.log(err);
    });
  }

  setEnabledServices() {
    if (this.bot.config.apiai_agent_token != "" && this.bot.config.apiai_agent_token != "YOUR_API.ai_AGENT_TOKEN"){
      this.enableService("APIai");
    }else{
      this.disableService("APIai");
    }
    if (this.bot.config.google_credentials.androidId != "" && this.bot.config.google_credentials.masterToken != ""){
      this.enableService("GooglePlayMusic");
    }else{
      this.disableService("GooglePlayMusic");
    }
    if (this.bot.config.wolfram_key != ""){
      this.enableService("Wolfram")
    }else{
      this.disableService("Wolfram");
    }
    if (this.bot.config.weather_underground_key != ""){
      this.enableService("WeatherUnderground");
    }else{
      this.disableService("WeatherUnderground");
    }
    if (this.bot.config.new_api_key != ""){
      this.enableService("NewsAPI");
    }else{
      this.disableService("WeatherUnderground");
    }
  }

  enableService(service) {
    if (this.bot.basic.services.hasOwnProperty(service)){
      this.bot.basic.services[service].active = true;
    }else{
      this.bot.basic.services[service] = {"active": true};
    }
  }

  disableService(service) {
    if (this.bot.basic.services.hasOwnProperty(service)){
      this.bot.basic.services[service].active = false;
    }else{
      this.bot.basic.services[service] = {"active": false};
    }
  }
}

module.exports = StartupCheck;
