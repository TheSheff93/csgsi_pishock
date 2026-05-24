
# CS2GSI Pishock
A small project written for nodejs that integrates with Counterstrike 2s Game Sense integration. It will detect when you die and send API requests to Pishock so that you can be shocked when you die.


## Requirements
- A working installation of Counter Strike 2
- A working installation of [Nodejs and npm](https://nodejs.org/en)

## Installation

1. clone or download this project
2. navigate to the project folder
3. install dependenices by doing:
```bash
    npm install
```
4. login to the [PiShock account portal](https://login.pishock.com/Account)

5. Create an API key, it doesn't matter what it's named, make it something that you will recognize that you created. NEVER share this API key with anyone, it gives them full access to your devices.

5. Put your the API key into the pishockConfig.json file, as well as your Pishock Username, don't worry about userID and shockerIDs, those fields will be populated automatically.
```JSON
{
  "username": "<Your Pishock Username Goes Here>",
  "api_key": "<Your Api Key Goes Here>",
...
}

```
6. Run the program for the first time with the '-c' argument to start it and do configuration (or any time you need to re-initialize the configuration):
```bash
node index.js -c
```
This will do all the necessary setup for you, including creating the necessary CS2GSI configuration file and putting it into your Counterstrike installation folder, and pull all your PiShock information (your User ID and the Shocker IDs). You can change this afterwards to add  or remove shockers, but you will need their shockerIDS (refer to the [PiShock API docs](https://docs.pishock.com/pishock/api-documentation/pishock-api-documentation.html) to figure out how to do this yourself)

7. to run any other time after the first initial setup, simply run the program without the '-c' flag
```bash
node index.js
```
## Settings
You can change the duration and the intensity of a shock by adjusting the values in the pishcokConfig.json file. NOTE: the intensity range is 1-100
and the duration is stored in miliseconds, the range for which is 16-15000ms (.016 seconds to 15 seconds) however, it's best to keep it at above 100ms or higher.
```JSON
{
...
  "shock_value": "40", This value is between 1-100
  "duration": "1000" This value is between 16-15000 
}
```
## Dependencies

 - [CS2-GSI-Z](https://github.com/alebcj/cs2-gsi-z)
 - [Steam Locate](https://github.com/zevnda/steam-locate)
 - [axios](https://github.com/axios/axios)