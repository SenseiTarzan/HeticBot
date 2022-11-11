import {ICommand} from "../Command";
import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandUserOption,
    User
} from "discord.js";
import {ApplicationCommandOptionBase} from "@discordjs/builders";

export default class AvatarCommand extends ICommand {

    public constructor() {
        super("avatar", "Permet de recuperer l'avatar d'un personne")
    }

    getOptions(): ApplicationCommandOptionBase[] {
        return [new SlashCommandUserOption().setName("member").setDescription("donner son pseudo").setRequired(false)];
    }

    async execute(user: User, message: ChatInputCommandInteraction, args: Array<any>): Promise<void> {
        const member = message.options.get('member');
        const bot = message.client.user;
        let avatarUrl = user.avatarURL({size: 512});
        if (member !== null) {
            avatarUrl = member.user.avatarURL({size: 512});
        }
        if (avatarUrl === null) return ;
        await message.reply({embeds: [new EmbedBuilder().setImage(avatarUrl).setAuthor({ name: bot.username, iconURL: bot.avatarURL()})]});
    }
}