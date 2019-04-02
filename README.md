JS- League of Legends Champion Picker
===

League of legends Champion Picker is a plugin that allow you to create a champion picker and recieve the reponse of selected data in JSON forma, you can also load the data and autoselect the champions on screen.   
Demo:   
https://prjy.github.io/js-lolchampionpicker/index.html

## How to use:
```js
    const leagueOfLegendsChampionPicker = $("#champion-list").lolChampionPicker({
        lolPatchApiVersion: "9.5.1", // Current Patch LOL *required   
        lang: "en_US", // optional
        image: { // optional set image size
            width: 60,
            height: 60,
        },
        messages: { // optional. Error Handling messages
            emptySelectedChampionError: "Pick a champion to continue!",
            unvalidJSONTextError: "Invalid JSON text, failed to import!"
        }
    });
```

You can get the available regions here:  
https://ddragon.leagueoflegends.com/api/versions.json  
The available Languages here:  
https://ddragon.leagueoflegends.com/cdn/languages.json

