import {Main} from "../Main";
import Config from "../Utils/Config";

export default class ImageManager{
    private config: Config;
    private static instance: ImageManager;
    constructor(main: Main) {
        ImageManager.instance = this;
        this.config = new Config(main.getDataFolder() + "Image/config.yml", "yaml", {
            "pat": {
                "url": "https://some-random-api.ml/animu/pat",
                "jsonFormat":  "{link: url}"
            },
            "hug": {

                "url": "https://some-random-api.ml/animu/hug",
                "jsonFormat":  "{link: url}"
            }
        });
    }

    public static getInstance() {
        return this.instance;
    }

    public getImage(type: string): {url: string, jsonFormat: string} | null{
        return this.config.get(type, null);
    }
}