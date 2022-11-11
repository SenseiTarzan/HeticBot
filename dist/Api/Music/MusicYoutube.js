"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
const Main_1 = require("../../Main");
class MusicYoutube {
    constructor(name, url, info, video) {
        var _a, _b;
        this.time = 0;
        this.randomID();
        this.name = name;
        this.url = url;
        this.info = info;
        this.time = parseInt(info.videoDetails.lengthSeconds);
        this.likes = (_a = info.videoDetails.likes) !== null && _a !== void 0 ? _a : 0;
        this.dislikes = (_b = info.videoDetails.dislikes) !== null && _b !== void 0 ? _b : 0;
        this.description = info.videoDetails.description;
        if (this.description.length >= 1024) {
            let i = 0;
            let text = "";
            while (i < 1024) {
                text = text + this.description[i];
                i++;
            }
            this.description = text;
        }
        this.icon = info.videoDetails.thumbnails[0] !== undefined ? info.videoDetails.thumbnails[0].url : "";
        this.creator = info.videoDetails.author.name;
        this.creatorIcon = info.videoDetails.author.thumbnails[0] !== undefined ? info.videoDetails.author.thumbnails[0].url : "";
        this.video = video;
    }
    getId() {
        return this.id;
    }
    randomID() {
        this.id = Main_1.Main.UUID4();
    }
    /**
     *  Donne le nom de la Musique
     */
    getName() {
        return this.name;
    }
    /**
     * donnes son url a la video
     */
    getUrl() {
        return this.url;
    }
    /**
     * donne un object tout les info de la musique
     */
    getRawInfo() {
        return this.info;
    }
    getLikes() {
        return this.likes;
    }
    getDisLikes() {
        return this.dislikes;
    }
    /**
     * donne la description de la video regarder
     */
    getDescription() {
        return this.description;
    }
    /**
     * donne la minature de la video
     */
    getIconUrl() {
        return this.icon;
    }
    /**
     * Donne le nom du createur de la video
     */
    getCreator() {
        return this.creator;
    }
    /**
     * Donne le avatar du createur de la video
     */
    getCreatorIcon() {
        return this.creatorIcon;
    }
    getVideo() {
        return (0, voice_1.createAudioResource)(this.video, { metadata: this, inlineVolume: true });
    }
    getTime() {
        return this.time;
    }
    // if (resource.ended) return void this.emit("error", new PlayerError("Cannot play a resource that has already ended.") as unknown as AudioPlayerError);
    getTimeString() {
        const time = {
            'h': ~~(this.time / 3600),
            'i': ~~((this.time % 3600) / 60),
            's': ~~(this.time % 60)
        };
        return (time.h < 10 ? "0" : "") + time.h + ":" + (time.i < 10 ? "0" : "") + time.i + ":" + (time.s < 10 ? "0" : "") + time.s.toString();
    }
}
exports.default = MusicYoutube;
//# sourceMappingURL=MusicYoutube.js.map