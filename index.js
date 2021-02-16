document.addEventListener('DOMContentLoaded', () => {
    SimpleSynth.startUp()
    SimpleSynth.listenForChange()
    Preset.loadDefaultPreset()
    Preset.getPresets()
    Preset.listenForEvents()
})
