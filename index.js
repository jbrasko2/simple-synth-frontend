const reverb = new Tone.Reverb({"wet": 0.25}).toDestination()
const delay = new Tone.PingPongDelay({"wet": 0})
const filter = new Tone.Filter(3000, "lowpass")
const tremolo = new Tone.Tremolo({
    "depth": 0.5,
    "frequency": 4,
    "spread": 0,
    "wet": 0
}).start()
const chorus = new Tone.Chorus(1, 2.5, 0.5).start()

let synth = new Tone.MonoSynth({
    "filterEnvelope" : {
        "attack": 0.1,
        "decay": 1.5,
        "sustain": 0.5,
        "release": 3
    }
}).chain(filter, delay, tremolo, chorus, reverb)

Tone.Destination.volume.rampTo(-3, 0.1)


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

let waveTypeButton = new Nexus.RadioButton('#waveTypeButton', {
    'numberOfButtons': 4
})

let filterDial = new Nexus.Dial('#filterDial', {
    'min': 0,
    'max': 5000
})

let reverbDial = new Nexus.Dial('#reverbDial', {
    'min': 0,
    'max': 1
})

let delayDial = new Nexus.Dial('#delayDial', {
    'min': 0,
    'max': 0.5
})

let tremSwitch = new Nexus.Toggle('#tremSwitch', {
    'state': false
})

let tremFreq = new Nexus.Slider('#tremFreq', {
    'min': 0,
    'max': 10
})

let chorSwitch = new Nexus.Toggle('#chorSwitch', {
    'state': false
})

let attack = new Nexus.Slider('#attack', {
    'min': 0.01,
    'max': 2
})
let decay = new Nexus.Slider('#decay', {
    'min': 0.01,
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

let oscilloscope = new Nexus.Oscilloscope('#oscilloscope')
oscilloscope.connect(Tone.Master)

waveTypeButton.on('change', function(v) {
    if (v === 0) {
        synth.oscillator.set({'type': 'sine'})
    } else if (v === 1) {
        synth.oscillator.set({'type': 'square'})
    } else if (v === 2) {
        synth.oscillator.set({'type': 'triangle'})
    } else {
        synth.oscillator.set({'type': 'sawtooth'})
    }
})

filterDial.on('change', function(v) {
    filter.set({'frequency': v})
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

reverbDial.on('change', function(v) {
    reverb.set({'wet': v})
})

delayDial.on('change', function(v) {
    delay.set({'wet': v})
})

tremSwitch.on('change', function(v) {
    if (v === false) {
        tremolo.set({'wet': 0})
    } else {
        tremolo.set({'wet': 1})
    }
})

tremFreq.on('change', function(v) {
    tremolo.set({'frequency': v})
})

chorSwitch.on('change', function(v) {
    if (v === false) {
        chorus.set({'wet': 0})
    } else {
        chorus.set({'wet': 0.5})
    }
})

const saveButton = document.getElementById('save')

saveButton.addEventListener('click', () => {
    console.log(synth.oscillator.type)
    console.log(synth.envelope.attack)
    console.log(synth.envelope.decay)
    console.log(synth.envelope.sustain)
    console.log(synth.envelope.release)
    console.log(reverb.wet.value)
    console.log(delay.wet.value)
})

const loadButton = document.getElementById('load')

loadButton.addEventListener('click', () => {
    attack.value = 0
})

document.addEventListener('DOMContentLoaded', () => {
    filterDial.value = 3000
    attack.value = 0.1
    decay.value = 1.5
    sustain.value = 0.5
    release.value = 3
    waveTypeButton.select(3)
    reverbDial.value = 0.25
    tremSwitch.value = false
    tremFreq.value = 4
    chorSwitch.value = false
    chorus.set({'wet': 0})
})
