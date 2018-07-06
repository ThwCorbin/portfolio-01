let channelsArray = [
    "food",
    "thejustinwilsonshow",
    "contv",
    "bobross",
    "cosmos",
    "thecosmosmedia",
    "creativemusicfm",
    "monstercat",
    "epidemic_sound",
    "freecodecamp"
];

function error() {
    console.log("Error Axios");
}

function twitchLiveCheck() {
    for (let i = 0; i < channelsArray.length; i++) {
        let urlStreams = `https://wind-bow.glitch.me/twitch-api/streams/${
            channelsArray[i]
        }`;
        let logoI = document.querySelector("#logo" + i);
        let liveStatusI = document.querySelector("#liveStatus" + i);
        let nameI = document.querySelector("#name" + i);
        let statusI = document.querySelector("#status" + i);
        axios
            .get(urlStreams)
            .then(function(response) {
                if (response.data.stream !== null) {
                    let logo = response.data.stream.channel.logo;
                    let displayName = response.data.stream.channel.display_name;
                    let url = response.data.stream.channel.url;
                    let status = response.data.stream.channel.status;
                    logoI.innerHTML = `<a id='logo${i}' href=${url} target='_blank'><img src=${logo} alt='logo'></a>`;
                    liveStatusI.innerHTML = `<h3 id='liveStatus${i}' class='live'><a><i class='fas fa-eye'></i> Live</a></h3>`;
                    nameI.innerHTML = `<h3 id='name${i}' class='name' ><a href=${url} target='_blank'>${displayName}</a></h3>`;
                    statusI.innerHTML = `<h3 id='status${i}' class='details'><a href=${url} target='_blank'>${status}</a></h3>`;
                } else {
                    offline(i);
                }
            })
            .catch(error);
    }
}

function offline(i) {
    let urlChannels = `https://wind-bow.glitch.me/twitch-api/channels/${
        channelsArray[i]
    }`;
    let logoI = document.querySelector("#logo" + i);
    let liveStatusI = document.querySelector("#liveStatus" + i);
    let nameI = document.querySelector("#name" + i);
    let statusI = document.querySelector("#status" + i);
    axios
        .get(urlChannels)
        .then(function(response) {
            let logo = response.data.logo;
            let displayName = response.data.display_name;
            let url = response.data.url;
            let status = "Offline";
            logoI.innerHTML = `<a href=${url} target='_blank'><img id='logo${i}' src=${logo} alt='logo'></a>`;
            liveStatusI.innerHTML = `<h3 id='liveStatus${i}' class='live'><a><i class='fas fa-eye-slash' id='eye_slash'></i> Off</a></h3>`;
            nameI.innerHTML = `<h3 id='name${i}' class='name' ><a href=${url} target='_blank'>${displayName}</a></h3>`;
            statusI.innerHTML = `<h3 id='status${i}' class='details'><a href=${url} target='_blank'>${status}</a></h3>`;
        })
        .catch(error);
}
twitchLiveCheck();