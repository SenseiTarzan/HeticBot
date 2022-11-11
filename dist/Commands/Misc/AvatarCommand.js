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
class AvatarCommand extends Command_1.ICommand {
    constructor() {
        super("avatar", "Permet de recuperer l'avatar d'un personne");
    }
    getOptions() {
        return [new discord_js_1.SlashCommandUserOption().setName("member").setDescription("donner son pseudo").setRequired(false)];
    }
    execute(user, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = message.options.get('member');
            const bot = message.client.user;
            let avatarUrl = user.avatarURL({ size: 512 });
            if (member !== null) {
                avatarUrl = member.user.avatarURL({ size: 512 });
            }
            if (avatarUrl === null)
                return;
            yield message.reply({ embeds: [new discord_js_1.EmbedBuilder().setImage(avatarUrl).setAuthor({ name: bot.username, iconURL: bot.avatarURL() })] });
        });
    }
}
exports.default = AvatarCommand;
//# sourceMappingURL=AvatarCommand.js.map