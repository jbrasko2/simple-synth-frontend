const apiUrl = 'http://localhost:3000/synths/1/presets'
const loadForm = document.getElementById('preset-load-form')
const saveForm = document.getElementById('preset-save-form')

class Preset {
    static all = []
    constructor({id, name, wave_type, filter_dial, attack_value, decay_value, sustain_value,
        release_value, reverb_dial, delay_dial, trem_switch, trem_frequency, chorus_switch}) {
        
        this.id = id
        this.name = name
        this.wave_type = wave_type
        this.filter_dial = filter_dial
        this.attack_value = attack_value
        this.decay_value = decay_value
        this.sustain_value = sustain_value
        this.release_value = release_value
        this.reverb_dial = reverb_dial
        this.delay_dial = delay_dial
        this.trem_switch = trem_switch
        this.trem_frequency = trem_frequency
        this.chorus_switch = chorus_switch
        Preset.all.push(this)
    }

    static loadDefaultPreset() {
        waveTypeButton.select(2)
        filterDial.value = 3000
        attack.value = 0.1
        decay.value = 1.5
        sustain.value = 0.5
        release.value = 3
        reverbDial.value = 0.25
        delayDial.value = 0
        tremSwitch.state = false
        tremFreq.value = 4
        chorSwitch.state = false
    }

    static getPresets() {
        fetch(apiUrl)
        .then(res => res.json())
        .then(resp => {this.showPresets(resp)})
    }

    static showPresets(arr) {
        let presetOptions = arr.map(obj => {
        return `<option value="${obj.id}">${obj.name}</option>`
    })

        document.getElementById('preset-options').innerHTML = presetOptions
    }

    static getPreset(e) {
        e.preventDefault()
        let id = document.querySelector('#preset-selector').value
        fetch(apiUrl)
        .then(res => res.json())
        .then(resp => this.loadPreset(resp[id - 1]))
    }
    
    static loadPreset(obj) {
        waveTypeButton.select(obj.wave_type)
        filterDial.value = obj.filter_dial
        attack.value = obj.attack_value
        decay.value = obj.decay_value
        sustain.value = obj.sustain_value
        release.value = obj.release_value
        reverbDial.value = obj.reverb_dial
        delayDial.value = obj.delay_dial
        tremSwitch.state = obj.trem_switch
        tremFreq.value = obj.trem_frequency
        chorSwitch.state = obj.chorus_switch
    }

    static savePreset(e) {
        e.preventDefault()
        let name = document.querySelector('#preset-name').value
        let wave_type = waveTypeButton.active
        let filter_dial = filterDial.value
        let attack_value = attack.value
        let decay_value = decay.value
        let sustain_value = sustain.value
        let release_value = release.value
        let reverb_dial = reverbDial.value
        let delay_dial = delayDial.value
        let trem_switch = tremSwitch.state
        let trem_frequency = tremFreq.value
        let chorus_switch = chorSwitch.state

        let presetObj = {
            name, wave_type, filter_dial, attack_value, decay_value, sustain_value,
            release_value, reverb_dial, delay_dial, trem_switch, trem_frequency, chorus_switch
        }

        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(presetObj)
        }

        fetch(`${apiUrl}`, config)
        this.getPresets()
        saveForm.reset()
    }

    static listenForEvents() {
        loadForm.addEventListener('submit', (e) => this.getPreset(e))
        saveForm.addEventListener('submit', (e) => this.savePreset(e))
    }

}