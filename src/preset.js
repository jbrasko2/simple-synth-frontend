class Preset {
    static all = []
    constructor({id, name, wave_type, filter_dial, attack_value, decay_value, release_value,
    reverb_dial, delay_dial, trem_switch, trem_frequency, chorus_switch}) {
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
}