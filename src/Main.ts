import {Client, GatewayIntentBits, REST, Routes, WebSocketShardEvents} from "discord.js";
import Config from "./Utils/Config";
import CommandFactory from "./Utils/CommandFactory";
import {VoteManager} from "./Api/VoteManager";
import LanguageManager from "./Api/language/LanguageManager";
import fetch from "node-fetch";
import RadioManager from "./Api/Radio/RadioManager";
import TwitterClient from 'twitter-api-scraper'
import * as path from "path";
import {TweetValue} from "twitter-api-scraper/dist/types/searchResults";
import AvatarCommand from "./Commands/Misc/AvatarCommand";
import PatCommand from "./Commands/Misc/PatCommand";
import ImageManager from "./Api/ImageManager";
import HugCommand from "./Commands/Misc/HugCommand";
import WinkCommand from "./Commands/Misc/WinkCommand";
import FacePalmCommand from "./Commands/Misc/FacePalmCommand";

export  class Main extends Client{
    private readonly config: Config;
    private readonly client: Client;
    private readonly prefix: string = "!/";
    private commandMap: CommandFactory;
    private readonly dataFolder: string;
    private static instance: Main;
    private VoteManager: VoteManager;
    private LanguageManager: LanguageManager;
    private radioManager: RadioManager;

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildVoiceStates]});
        this.rest = new REST({version: '10'});
        Main.instance = this;
        this.dataFolder = path.join(path.dirname(__dirname),"resources\\");
        this.config = new Config(this.dataFolder + "config.yml", "yaml", {"token": "", "prefix": "/"});
        console.log(this.config.getAll())
        this.client = this;
        this.loadApi();
        this.start();
    }

    public loadApi(): void{
        this.commandMap = new CommandFactory(this.client);
        this.VoteManager = new VoteManager(this);
        new ImageManager(this);
        //this.LanguageManager = new LanguageManager(this);
        this.loadCommands();
       // this.radioManager = new RadioManager(this);
        //this.queueMusicManager = new QueueMusicManager(this);
    }

    public loadCommands(): void{
        const commandsMap = this.commandMap;
        commandsMap.registerCommands(new AvatarCommand(), false);
        commandsMap.registerCommands(new PatCommand(), false);
        commandsMap.registerCommands(new HugCommand(), false);
        commandsMap.registerCommands(new FacePalmCommand(), false);
        commandsMap.registerCommands(new WinkCommand(), false);

    }

    public start(): void{
        this.client.once('ready', () => {
            this.rest.put(Routes.applicationCommands(this.user.id), {body: []}).catch(() => {});
            console.log("ready:\n"  + this.client.user.username  + "#" + this.client.user.discriminator)
            this.commandMap.reloadCommandSlash();
        });
        console.log(this.config.get("token"))
        this.client.login(this.config.get("token"));
        this.rest.setToken(this.token)
    }
    public static UUID4(): string{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public getVoteManager(): VoteManager{
        return this.VoteManager;
    }

    public getRadioManager(): RadioManager{
        return this.radioManager;
    }

    public getDataFolder() :string{
        return this.dataFolder;
    }

    public getConfig(): Config{
        return this.config;
    }

    public static getInstance(): Main{
        return this.instance;
    }
    destroy() {

    }
}

const instance  = new Main();


