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

const piano = new Nexus.Piano('#piano', {
    'size': [500,125],
    'mode': 'button',
    'lowNote': 24,
    'highNote': 60
})

const keys = document.querySelectorAll(".key")

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

class SimpleSynth {
    static startUp() {
        Tone.Destination.volume.rampTo(-3, 0.1)
    }

    static listenForChange() {
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
        
        piano.on('change',function(v) {
            if (v.state === true) {
                synth.triggerAttack(v.note)
                console.log(v.note)
            } else {
                synth.triggerRelease()
            }
        })
        
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
    }
}