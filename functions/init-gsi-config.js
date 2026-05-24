const CS2GSI = require ('cs2-gsi-z');
const SteamLocate = require ('steam-locate');
const fs = require('node:fs');

function generateFile(){
    var app;
        try{
            app =  SteamLocate.findSteamAppSync('730')
        } catch (err) {
            console.log(err)
            return;
        }
        console.log('Counter Strike 2 is installed at: ' +  app.installDir)
        console.log('Generating configuration file and putting it into the appropriate configuration directory')
        const configFile = CS2GSI.GSIConfigWriter.generate({
            name: 'cs2-gsi-z',
            uri: 'http://localhost:3000'
        });
        try{
            fs.writeFileSync((app.installDir+'/game/csgo/cfg/gamestate_integration_cs2-gsi-z.cfg'), configFile);

        }catch (err){
            console.log(err);
        }
}


module.exports = {generateFile};1
