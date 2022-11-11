"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl = require("ytdl-core");
const MusicYoutube_1 = require("./MusicYoutube");
class YoutubeUrl {
    static isUrlYoutube(name_or_url) {
        return ytdl.validateURL(name_or_url);
    }
    static SearchMusic(name_or_url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isUrlYoutube(name_or_url)) {
                const infoVideo = yield ytdl.getBasicInfo(name_or_url);
                return new MusicYoutube_1.default(infoVideo.videoDetails.title, name_or_url, infoVideo, yield ytdl(name_or_url, { filter: "audioonly", highWaterMark: 1 << 25 }));
            }
            return null;
        });
    }
}
exports.default = YoutubeUrl;
//# sourceMappingURL=YoutubeUrl.js.map