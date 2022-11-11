"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Utils/Config");
const discord_js_1 = require("discord.js");
const Radio_1 = require("./Radio");
class RadioManager {
    constructor(main) {
        this.radio = new discord_js_1.Collection();
        this.config = new Config_1.default(main.getDataFolder() + "radio/config.yml");
        this.loadRadio();
    }
    loadRadio() {
        for (const [name, radio_info] of Object.entries(this.config.getAll())) {
            if (!this.existRadio(name)) {
                this.registerRadio(new Radio_1.default(name, radio_info["url"], radio_info["desc"], radio_info["icon"]));
            }
        }
    }
    /**
     * dis si la radio existe dans la config
     * @param name_radio
     */
    existRadio(name_radio) {
        return this.radio.has(name_radio);
    }
    /**
     * Donne la donne de la radio qui est dans la config
     * @param name_radio
     */
    getRadioData(name_radio) {
        return this.radio.get(name_radio);
    }
    registerRadio(radio) {
        this.radio.set(radio.getName(), radio);
    }
}
exports.default = RadioManager;
//# sourceMappingURL=RadioManager.js.map