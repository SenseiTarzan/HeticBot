"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Utils/Config");
class ImageManager {
    constructor(main) {
        ImageManager.instance = this;
        this.config = new Config_1.default(main.getDataFolder() + "Image/config.yml", "yaml", {
            "pat": {
                "url": "https://some-random-api.ml/animu/pat",
                "jsonFormat": "{link: url}"
            },
            "hug": {
                "url": "https://some-random-api.ml/animu/hug",
                "jsonFormat": "{link: url}"
            }
        });
    }
    static getInstance() {
        return this.instance;
    }
    getImage(type) {
        return this.config.get(type, null);
    }
}
exports.default = ImageManager;
//# sourceMappingURL=ImageManager.js.map