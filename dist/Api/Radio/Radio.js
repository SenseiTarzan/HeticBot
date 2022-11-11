"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
class Radio {
    constructor(name, url, description, icon) {
        this.name = name;
        this.url = url;
        this.description = description;
        this.icon = icon;
    }
    getName() {
        return this.name;
    }
    getUrl() {
        return this.url;
    }
    getFluxAudio() {
        return (0, voice_1.createAudioResource)(this.url, { metadata: this, inlineVolume: true });
    }
    getDescription() {
        return this.description;
    }
    getIconUrl() {
        return this.icon;
    }
}
exports.default = Radio;
//# sourceMappingURL=Radio.js.map