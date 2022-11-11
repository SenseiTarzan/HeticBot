"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Utils/Config");
const Main_1 = require("../../Main");
const discord_js_1 = require("discord.js");
class Language {
    constructor(name, mini, emote, filename) {
        this.custom_language = new discord_js_1.Collection();
        console.log(name);
        this.name = name;
        this.mini = mini;
        this.emote = emote;
        this.config = new Config_1.default(Main_1.Main.getInstance().getDataFolder() + "Language/" + filename, "yaml");
    }
    addCustomLanguage(guild) {
        this.custom_language.set(guild, new Config_1.default(Main_1.Main.getInstance().getDataFolder() + "Language/data/guilds/" + guild + "/" + this.getName().toLowerCase() + ".yml"));
    }
    getCustomLanguage(guild) {
        return this.custom_language.get(guild);
    }
    removeCustomLanguage(guild) {
        this.custom_language.delete(guild);
    }
    getName() {
        return this.name;
    }
    getMini() {
        return this.mini;
    }
    getEmote() {
        return this.emote;
    }
    Config() {
        return this.config;
    }
    getRawMessage(guild, message) {
        const custom_language = this.getCustomLanguage(guild);
        if (custom_language !== undefined) {
            custom_language.reload();
        }
        return custom_language !== undefined ? (custom_language.getNested(message) !== undefined ? custom_language.getNested(message) : this.Config().getNested(message)) : this.Config().getNested(message);
    }
    getTranslate(guild, message, balise = [], defaults = "no found translate") {
        this.config.reload();
        let msg = this.getRawMessage(guild, message);
        if (msg === undefined) {
            this.config.setNested(message, defaults);
            this.config.save();
            msg = defaults;
        }
        if (typeof msg === "string") {
            while (msg.includes("%n")) {
                msg = msg.replace("%n", "\n");
            }
            if (balise.length > 0) {
                balise.forEach((value, i) => {
                    msg = msg.replace(`&${i + 1}`, value);
                });
            }
        }
        return msg;
    }
}
exports.default = Language;
//# sourceMappingURL=Language.js.map