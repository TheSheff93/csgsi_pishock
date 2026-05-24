
//require configuration functions
const GSIConfig = require ('./functions/init-gsi-config');
const Pishock = require ('./functions/pishock');
const CS2GSI = require ('cs2-gsi-z');
const fs = require('fs');

//these values account for the player being you, without it, if you spectate someone who has more deaths than you while dead.
var playerDead = false;

console.log("OwO, welcome to CS2 Pishock integration");

//if user passes a '-c' argument when they run this, start configuration
if(process.argv.includes('-c'))
{
    console.log("I see you've given me the \'-c'\ arugument uwu, starting configuration!");
    console.log("Starting pishock configuration");
    var success;
    //start pishock configuration, but await it's completeion before moving onto the next step
    Pishock.config();
    //config
    console.log("generating CounterStrike Game Sense Integration file...")
    GSIConfig.generateFile();
}
else{
    
    console.log("If this is your first time running this or you don't have a GSI config file, rerun this command with the \'-c\' argument!");
}
console.log("starting Game state integration service")

const gsiService = new CS2GSI.GsiService({
    httpPort: 3000
})

gsiService.lsogger
gsiService.start();
gsiService.on(CS2GSI.EVENTS.player.deathsChanged, (payload) => {
    //we want to make sure that the player actually died (aka the death stat increase)
   if(payload.previous < payload.current && !playerDead){
        console.log('player died?!?!?!?!?!??! >:3c')
        Pishock.shock()
        playerDead = true;
    }
})

 gsiService.on(CS2GSI.EVENTS.round.phaseChanged, (payload) => {
    if(payload.previous == 'freezetime'){
        console.log("leaving freeze time, the player can die again!")
         playerDead = false;
    }
 })