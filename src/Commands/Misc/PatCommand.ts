import {ICommand} from "../Command";
import {ApplicationCommandOptionBase} from "@discordjs/builders";
import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandUserOption, User} from "discord.js";
import fetch from "node-fetch";
import ImageManager from "../../Api/ImageManager";

export default class PatCommand extends ICommand{
    constructor() {
        super("pat", "Permet de faire une tape sur la tête");
    }

    getOptions(): ApplicationCommandOptionBase[] {
        return [new SlashCommandUserOption().setName("member").setDescription("tape le nom du membre")];
    }

    async execute(user: User, interaction: ChatInputCommandInteraction, args: Array<any>): Promise<void> {
        let patFetch : {link: string} = {link: ""};
        try {
            patFetch = await (await fetch(ImageManager.getInstance().getImage('pat').url)).json()
        }catch (e) {
            await interaction.reply({content: "L'api n'est plus disponible"});
            return ;
        }
        if (patFetch.link === ""){
            await interaction.reply({content: "L'api n'est plus disponible"});
            return;
        }
        const member = interaction.options.get('member');
        const bot = interaction.client.user;
        let author  ={ name: bot.username, iconURL: bot.avatarURL()};
        let message = `t'as fait une tape sur la tête\n<@${user.id}>`;
        if (member !== null && member.user !== null) {
            author = { name: user.username, iconURL: user.avatarURL()};
             message = `t'as fait une tape sur la tête\n<@${member.user.id}>`;
        }
        await interaction.reply({embeds: [
            new EmbedBuilder()
                .setImage(patFetch.link)
                .setAuthor(author)
                .setDescription(message)
                .setColor("Gold")
            ]});
    }
}