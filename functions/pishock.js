const PISHOCK_URL = 'https://api.pishock.com/Shockers/';
const fs = require('fs')
const psConfig = JSON.parse(fs.readFileSync('./pishockConfig.json'));
const { send } = require('process');
const axios = require('axios')

const instance = axios.create({
    baseURL: PISHOCK_URL,
    headers: {
        "accept": "*/*",
        "X-PiShock-Api-Key": psConfig.api_key,
        "X-PiShock-UserId": psConfig.username,
        "Content-Type": "application/json"
    }
})

function shock() {
    if (psConfig.intensity < 1 || psConfig.intensity > 100) {
        console.log("Intensity is out of acceptable range ;c, it must be between 1 and 100");
        return;
    }

    return sendRequest(0, parseInt(psConfig.shock_value), parseInt(psConfig.duration));

}

function vibrate() {
    if (psConfig.shock_value < 1 || psConfig.shock_value > 100) {
        console.log("Intensity is out of acceptable range ;c, it must be between 1 and 100");
        return;
    }
    return sendRequest(1, parseInt(psConfig.shock_value), parseInt(psConfig.duration));

}

function beep() {
    return sendRequest(2, 40, 1000);
}

 async function config() {
    
    if (psConfig.api_key == "" || psConfig.username == "") {
        console.log("No username and/or API key found in the pishockConfig.json file, refer to the readme on how to configure these");
        process.exit();
    }
    let authURL = 'https://auth.pishock.com/Auth/GetUserIfAPIKeyValid?apikey='+psConfig.api_key+'&username='+psConfig.username;
    try{
        console.log()
        const responseUserInfo = await axios.get(authURL);
        console.log(responseUserInfo);
        psConfig.userId = responseUserInfo.data.UserId;
        let shockerURL = 'https://ps.pishock.com/PiShock/GetUserDevices?UserId='+psConfig.userId+'&Token='+psConfig.api_key+'&api=true'
        console.log(psConfig.userId)
        psConfig.shocker_ids = []
        const responseUserShockers = await axios.get(shockerURL);
        for(const shocker of responseUserShockers.data[0].shockers){
            psConfig.shocker_ids.push(shocker.shockerId);
        }
        
        console.log(psConfig.shocker_ids);
        fs.writeFileSync('./pishockConfig.json', JSON.stringify(psConfig, null, 2));
        vibrate();
    } catch(err){
        console.log(err);
    }
}




async function sendRequest(option, intensity, duration) {
    let requests = [];
    data = {
        AgentName: psConfig.app_name,
        Operation: option,
        Duration: duration,
        Intensity: intensity,
        IntensityAsPercentage: true
    }
    try {
        console.log('sending requests');
        Promise.all(psConfig.shocker_ids.map((shocker_id) => instance.post(PISHOCK_URL + shocker_id, JSON.stringify(data)))).then(
            axios.spread((...allData) => {
                console.log({ allData });
            })
        )
    } catch (err) {

        console.log(err)

    }
}


module.exports = { shock, beep, vibrate, config }
