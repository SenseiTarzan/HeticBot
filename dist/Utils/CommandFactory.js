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
const discord_js_1 = require("discord.js");
const Command_1 = require("../Commands/Command");
const Main_1 = require("../Main");
const builders_1 = require("@discordjs/builders");
class CommandFactory {
    constructor(client) {
        this.commands = new discord_js_1.Collection();
        CommandFactory.instance = this;
        CommandFactory.prefix = "/";
        client.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand())
                return;
            if (!(interaction instanceof discord_js_1.ChatInputCommandInteraction))
                return;
            // @ts-ignore
            if (interaction.user.bot)
                return;
            //const args: string[] = message..slice(prefix.length).trim().split(/ +/);
            // @ts-ignore
            if (this.hasCommand(interaction.commandName)) {
                // @ts-ignore
                const commands = this.getCommand(interaction.commandName);
                if (commands instanceof Command_1.ICommand) {
                    // @ts-ignore
                    yield commands.execute(interaction.user, interaction, []);
                    return;
                }
            }
        }));
    }
    static getPrefix() {
        return this.prefix;
    }
    static getInstance() {
        return this.instance;
    }
    /**
     * Permet de d'erengistre des Commands Discord
     * @param Command
     * @param override
     * @returns
     */
    registerCommands(Command, override = false) {
        const CommandName = Command.getName();
        const CommandAlias = Command.getAlias();
        if (!this.hasCommand(CommandName)) {
            this.commands.set(CommandName, Command);
            console.log(`Command ${CommandFactory.prefix}${CommandName} a été enregistre`);
        }
        else if (override) {
            this.commands.set(CommandName, Command);
            console.log(`Command ${CommandFactory.prefix}${CommandName} a été enregistre`);
            return;
        }
        else {
            console.log(`Vous ne pouvez pas enregistre ${CommandName} car il est deja existante`);
        }
        CommandAlias.forEach((alias) => {
            if (!this.hasCommand(alias)) {
                console.log(`Command ${CommandFactory.prefix}${CommandName} a été enregistre avec avec l'alias: ${alias}`);
                this.commands.set(alias, Command);
            }
            else {
                console.log(`Vous ne pouvez pas enregistre ${alias} car il est deja existante`);
            }
        });
    }
    reloadCommandSlash() {
        const slashCommandsList = [];
        this.commands.forEach((value, key) => {
            const slashCommandBuilder = new discord_js_1.SlashCommandBuilder().setName(key.toLowerCase()).setDescription(value.getDescription());
            value.getOptions().forEach(value1 => {
                if (value1 instanceof builders_1.SlashCommandBooleanOption) {
                    slashCommandBuilder.addBooleanOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandAttachmentOption) {
                    slashCommandBuilder.addAttachmentOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandUserOption) {
                    slashCommandBuilder.addUserOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandChannelOption) {
                    slashCommandBuilder.addChannelOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandRoleOption) {
                    slashCommandBuilder.addRoleOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandMentionableOption) {
                    slashCommandBuilder.addMentionableOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandIntegerOption) {
                    slashCommandBuilder.addIntegerOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandNumberOption) {
                    slashCommandBuilder.addNumberOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandIntegerOption) {
                    slashCommandBuilder.addIntegerOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandStringOption) {
                    slashCommandBuilder.addStringOption(value1);
                }
            });
            value.getSubArguements().forEach((value1, key1) => {
                CommandFactory.subCommandsCreation(slashCommandBuilder, value1);
            });
            slashCommandsList.push(slashCommandBuilder);
        });
        Main_1.Main.getInstance().rest.put(discord_js_1.Routes.applicationCommands(Main_1.Main.getInstance().user.id), { body: slashCommandsList }).catch(() => { });
    }
    static subCommandsCreation(slashCommandBuilder, commands) {
        commands.getSubArguements().forEach((value, key) => {
            const slashCommandSubBuilder = new discord_js_1.SlashCommandSubcommandBuilder().setName(key.toLowerCase()).setDescription(value.getDescription());
            value.getOptions().forEach(value1 => {
                if (value1 instanceof builders_1.SlashCommandBooleanOption) {
                    slashCommandSubBuilder.addBooleanOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandAttachmentOption) {
                    slashCommandSubBuilder.addAttachmentOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandUserOption) {
                    slashCommandSubBuilder.addUserOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandChannelOption) {
                    slashCommandSubBuilder.addChannelOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandRoleOption) {
                    slashCommandSubBuilder.addRoleOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandMentionableOption) {
                    slashCommandSubBuilder.addMentionableOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandIntegerOption) {
                    slashCommandSubBuilder.addIntegerOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandNumberOption) {
                    slashCommandSubBuilder.addNumberOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandIntegerOption) {
                    slashCommandSubBuilder.addIntegerOption(value1);
                }
                else if (value1 instanceof discord_js_1.SlashCommandStringOption) {
                    slashCommandSubBuilder.addStringOption(value1);
                }
            });
            slashCommandBuilder.addSubcommand(slashCommandSubBuilder);
        });
    }
    /**
     * Donne true si la commands existe sinon false
     * @param CommandName
     * @returns
     */
    hasCommand(CommandName) {
        return this.commands.has(CommandName);
    }
    /**
     * donnes la Classe de la commande si elle existe sinon null
     * @param CommandName
     * @returns
     */
    getCommand(CommandName) {
        try {
            return this.commands.get(CommandName);
        }
        catch (error) {
            return null;
        }
    }
    getAllCommands() {
        try {
            return this.commands;
        }
        catch (error) {
            return [];
        }
    }
}
exports.default = CommandFactory;
//# sourceMappingURL=CommandFactory.js.map