"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const discord_js_1 = require("discord.js");
const Config_1 = require("./Utils/Config");
const CommandFactory_1 = require("./Utils/CommandFactory");
const VoteManager_1 = require("./Api/VoteManager");
const path = require("path");
const AvatarCommand_1 = require("./Commands/Misc/AvatarCommand");
const PatCommand_1 = require("./Commands/Misc/PatCommand");
const ImageManager_1 = require("./Api/ImageManager");
const HugCommand_1 = require("./Commands/Misc/HugCommand");
const WinkCommand_1 = require("./Commands/Misc/WinkCommand");
const FacePalmCommand_1 = require("./Commands/Misc/FacePalmCommand");
class Main extends discord_js_1.Client {
    constructor() {
        super({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildBans, discord_js_1.GatewayIntentBits.GuildVoiceStates] });
        this.prefix = "!/";
        this.rest = new discord_js_1.REST({ version: '10' });
        Main.instance = this;
        this.dataFolder = path.join(path.dirname(__dirname), "resources\\");
        this.config = new Config_1.default(this.dataFolder + "config.yml", "yaml", { "token": "", "prefix": "/" });
        console.log(this.config.getAll());
        this.client = this;
        this.loadApi();
        this.start();
    }
    loadApi() {
        this.commandMap = new CommandFactory_1.default(this.client);
        this.VoteManager = new VoteManager_1.VoteManager(this);
        new ImageManager_1.default(this);
        //this.LanguageManager = new LanguageManager(this);
        this.loadCommands();
        // this.radioManager = new RadioManager(this);
        //this.queueMusicManager = new QueueMusicManager(this);
    }
    loadCommands() {
        const commandsMap = this.commandMap;
        commandsMap.registerCommands(new AvatarCommand_1.default(), false);
        commandsMap.registerCommands(new PatCommand_1.default(), false);
        commandsMap.registerCommands(new HugCommand_1.default(), false);
        commandsMap.registerCommands(new FacePalmCommand_1.default(), false);
        commandsMap.registerCommands(new WinkCommand_1.default(), false);
    }
    start() {
        this.client.once('ready', () => {
            this.rest.put(discord_js_1.Routes.applicationCommands(this.user.id), { body: [] }).catch(() => { });
            console.log("ready:\n" + this.client.user.username + "#" + this.client.user.discriminator);
            this.commandMap.reloadCommandSlash();
        });
        console.log(this.config.get("token"));
        this.client.login(this.config.get("token"));
        this.rest.setToken(this.token);
    }
    static UUID4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    getVoteManager() {
        return this.VoteManager;
    }
    getRadioManager() {
        return this.radioManager;
    }
    getDataFolder() {
        return this.dataFolder;
    }
    getConfig() {
        return this.config;
    }
    static getInstance() {
        return this.instance;
    }
    destroy() {
    }
}
exports.Main = Main;
const instance = new Main();
//# sourceMappingURL=Main.js.map