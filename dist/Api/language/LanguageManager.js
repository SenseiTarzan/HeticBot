"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../../Utils/Config");
const Language_1 = require("./Language");
const discord_js_1 = require("discord.js");
class LanguageManager {
    constructor(client) {
        this.languages = new discord_js_1.Collection();
        LanguageManager.instance = this;
        this.config = new Config_1.default(client.getDataFolder() + "Language/config.yml", "yaml", {
            "English": {
                "mini": "en",
                "emote": "🇬🇧",
                "config": "data/english.yml"
            },
            "Francais": {
                "mini": "fr",
                "emote": "🇫🇷",
                "config": "data/francais.yml",
                "default": true
            }
        });
        console.log(client.getDataFolder() + "Language/data.yml");
        this.data = new Config_1.default(client.getDataFolder() + "Language/data.yml", "yaml");
        this.loadLanguage();
        this.loadLanguageGuild();
    }
    static getInstance() {
        return this.instance;
    }
    loadLanguage() {
        // @ts-ignore
        for (const [keys, values] of this.config.getAll(true)) {
            if (!this.existeLanguage(values["mini"])) {
                this.registerLanguage(new Language_1.default(keys, values["mini"], values["emote"], values["config"]));
                if (values["default"] !== undefined && values["default"]) {
                    this.registerLanguage(new Language_1.default(keys, "default", values["emote"], values["config"]));
                }
            }
        }
    }
    loadLanguageGuild() {
        for (const [guild, info] of this.data.getAll(true)) {
            this.languages.get(info.toString()).addCustomLanguage(guild);
        }
    }
    addLanguageGuild(guild, language) {
        this.languages.get(language).addCustomLanguage(guild);
    }
    removeCustomLanguage(guild, language) {
        this.languages.get(language).removeCustomLanguage(guild);
    }
    getLanguageGuild(guildId) {
        return this.data.get(guildId, "default");
    }
    setLanguageGuild(guildid, language) {
        this.removeCustomLanguage(guildid, this.getLanguageGuild(guildid));
        this.data.set(guildid, language);
        this.data.save();
        this.addLanguageGuild(guildid, language);
    }
    registerLanguage(language) {
        this.languages.set(language.getMini(), language);
    }
    existeLanguage(language) {
        return this.languages.has(language);
    }
    getLanguage(guildId) {
        return this.languages.get(this.getLanguageGuild(guildId));
    }
}
exports.default = LanguageManager;
//# sourceMappingURL=LanguageManager.js.map