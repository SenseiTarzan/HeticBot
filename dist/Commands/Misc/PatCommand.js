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
const Command_1 = require("../Command");
const discord_js_1 = require("discord.js");
const node_fetch_1 = require("node-fetch");
const ImageManager_1 = require("../../Api/ImageManager");
class PatCommand extends Command_1.ICommand {
    constructor() {
        super("pat", "Permet de faire une tape sur la tête");
    }
    getOptions() {
        return [new discord_js_1.SlashCommandUserOption().setName("member").setDescription("tape le nom du membre")];
    }
    execute(user, interaction, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let patFetch = { link: "" };
            try {
                patFetch = yield (yield (0, node_fetch_1.default)(ImageManager_1.default.getInstance().getImage('pat').url)).json();
            }
            catch (e) {
                yield interaction.reply({ content: "L'api n'est plus disponible" });
                return;
            }
            if (patFetch.link === "") {
                yield interaction.reply({ content: "L'api n'est plus disponible" });
                return;
            }
            const member = interaction.options.get('member');
            const bot = interaction.client.user;
            let author = { name: bot.username, iconURL: bot.avatarURL() };
            let message = `t'as fait une tape sur la tête\n<@${user.id}>`;
            if (member !== null && member.user !== null) {
                author = { name: user.username, iconURL: user.avatarURL() };
                message = `t'as fait une tape sur la tête\n<@${member.user.id}>`;
            }
            yield interaction.reply({ embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setImage(patFetch.link)
                        .setAuthor(author)
                        .setDescription(message)
                        .setColor("Gold")
                ] });
        });
    }
}
exports.default = PatCommand;
//# sourceMappingURL=PatCommand.js.map