;(function (doc) {
var passwordInput = doc.getElementById("password-box"),
    timeDiv = doc.getElementById("password-time"),
    checksList = doc.getElementById("password-checks");

// Code to render the time returned by HSIMP
var renderTime = function (time, input) {
    timeDiv.innerHTML = time || "";
};

// Code to output the checks returned by HSIMP
var renderChecks = function (checks, input) {
    checksList.innerHTML = "";

    for (var i = 0, l = checks.length; i < l; i++) {
        var li = doc.createElement("li"),
            title = doc.createElement("h2"),
            message = doc.createElement("p");

        title.innerHTML = checks[i].name;
        li.appendChild(title);

        message.innerHTML = checks[i].message;
        li.appendChild(message);

        checksList.appendChild(li);
    }
};

// Setup the HSIMP object
var attachTo = hsimp({
    options: {
        calculationsPerSecond: 10e9, // 10 billion calculations per second
        good: 31557600e9, // 1 billion years
        ok: 31557600e3 // 1 thousand years
    },
    outputTime: renderTime,
    outputChecks: renderChecks
});

// setup custom values for "instantly"/"forever"
hsimp.setDictionary({
    "instantly": "Immediately",
    "forever": "Aaaaaaaaaaaaaaaages",
});

// Run the HSIMP
attachTo(passwordInput);

const passwords = [
    "H3ll@WRLD!",
    "b106-8e3b14-bd1d",
    "plank%tiredSun#broccoli",
    "EstasParkeandoMiTroka?",
    "1d4Nf62c4e63Nf3Bb4+",
    "Talonflame@ChoiceBand GaleWings",
    "CGBP:1@RPE8,2xAMRAP@80%"
]

function toClipboard(text) {
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()

    return {result: document.execCommand('copy'), textArea: textArea}
} 
  

$(document).ready(() => {

    for(var i = 0; i < passwords.length; i++) {
        $(`#p${i}box`).html(passwords[i])
    }

    $('.try-password').click(({target: {id}}) => {
        const idx = id.substring(1)
        
        const {result, textArea} = toClipboard(passwords[idx])
        
        console.log($(`#${id}`).html())
        $(textArea).hide()
        $(`#${id}`).html('copied!')

        for(var i = 0; i < passwords.length; i++) {
            if(i != idx) {
                // console.log(`#p${i}`)
                $(`#p${i}`).html('copy password')
            }
        }
    })
}) 

// firebase

document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    } catch (e) {
      console.error(e);
    }
  });
}(this.document));