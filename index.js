let synth = new Tone.MonoSynth({
    "filterEnvelope" : {
        "attack": 0.1,
        "decay": 0.1,
        "sustain": 0.2,
        "release": 0.9
    }
}).toDestination();

const keys = document.querySelectorAll(".key")

keys.forEach((key) => {
    key.addEventListener('mousedown', () => {
        synth.triggerAttack(key.id)
    })
})

keys.forEach((key) => {
    key.addEventListener('mouseup', () => {
        synth.triggerRelease()
    })
})


let attack = new Nexus.Slider('#attack', {
    'min': 0.01,
    'max': 2
})
let decay = new Nexus.Slider('#decay', {
    'min': 0,
    'max': 2
})
let sustain = new Nexus.Slider('#sustain', {
    'min': 0,
    'max': 1
})
let release = new Nexus.Slider('#release', {
    'min': 0,
    'max': 5
})

attack.on('change', function(v) {
    synth.envelope.set({'attack': v}),
    synth.filterEnvelope.set({'attack': v})
})

decay.on('change', function(v) {
    synth.envelope.set({'decay': v})
    synth.filterEnvelope.set({'decay': v})
})

sustain.on('change', function(v) {
    synth.envelope.set({'sustain': v})
    synth.filterEnvelope.set({'sustain': v})
})

release.on('change', function(v) {
    synth.envelope.set({'release': v})
    synth.filterEnvelope.set({'release': v})
})

const saveButton = document.getElementById('save')

saveButton.addEventListener('click', () => {
    console.log(synth.envelope.attack)
    console.log(synth.envelope.decay)
    console.log(synth.envelope.sustain)
    console.log(synth.envelope.release)
})