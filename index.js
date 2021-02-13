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

const synth = new Tone.MonoSynth({
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

const waveTypeButton = new Nexus.RadioButton('#waveTypeButton', {
    'numberOfButtons': 4
})

const filterDial = new Nexus.Dial('#filterDial', {
    'min': 0,
    'max': 5000
})

const reverbDial = new Nexus.Dial('#reverbDial', {
    'min': 0,
    'max': 1
})

const delayDial = new Nexus.Dial('#delayDial', {
    'min': 0,
    'max': 0.5
})

const tremSwitch = new Nexus.Toggle('#tremSwitch', {
    'state': false
})

const tremFreq = new Nexus.Slider('#tremFreq', {
    'min': 0,
    'max': 10
})

const chorSwitch = new Nexus.Toggle('#chorSwitch', {
    'state': false
})

const attack = new Nexus.Slider('#attack', {
    'min': 0.01,
    'max': 2
})
const decay = new Nexus.Slider('#decay', {
    'min': 0.01,
    'max': 2
})
const sustain = new Nexus.Slider('#sustain', {
    'min': 0,
    'max': 1
})
const release = new Nexus.Slider('#release', {
    'min': 0,
    'max': 5
})

const oscilloscope = new Nexus.Oscilloscope('#oscilloscope')
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

document.addEventListener('DOMContentLoaded', () => {
    waveTypeButton.select(3)
    filterDial.value = 3000
    attack.value = 0.1
    decay.value = 1.5
    sustain.value = 0.5
    release.value = 3
    reverbDial.value = 0.25
    delayDial.value = 0
    tremSwitch.value = false
    tremFreq.value = 4
    chorSwitch.value = false
    chorus.set({'wet': 0})

    const apiUrl = 'http://localhost:3000/synths/1/presets'

    function getPresets() {
        fetch(apiUrl).then(res => res.json()).then(resp => {showPresets(resp)})
    }

    getPresets()

    function showPresets(arr) {
        let presetOptions = arr.map(obj => {
        return `<option value="${obj.id}">${obj.name}</option>`
    })

        document.getElementById('preset-options').innerHTML = presetOptions
    }

    const loadForm = document.getElementById('preset-load-form')
    loadForm.addEventListener('submit', getPreset)

    function getPreset(event) {
        event.preventDefault()
        let id = event.target.parentNode.querySelector('#preset-selector').value
        console.log(id)
    }

})

