import {ICommand} from "../Command";
import {ApplicationCommandOptionBase} from "@discordjs/builders";
import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandUserOption, User} from "discord.js";
import fetch from "node-fetch";
import ImageManager from "../../Api/ImageManager";

export default class HugCommand extends ICommand{
    constructor() {
        super("hug", "Permet de faire un câlin");
    }

    getOptions(): ApplicationCommandOptionBase[] {
        return [new SlashCommandUserOption().setName("member").setDescription("tape le nom du membre")];
    }

    async execute(user: User, interaction: ChatInputCommandInteraction, args: Array<any>): Promise<void> {
        let hugFetch : {link: string} = {link: ""};
        try {
            hugFetch = await (await fetch(ImageManager.getInstance().getImage('hug').url)).json()
        }catch (e) {
            await interaction.reply({content: "L'api n'est plus disponible"});
            return ;
        }
        if (hugFetch.link === ""){
            await interaction.reply({content: "L'api n'est plus disponible"});
            return;
        }
        const member = interaction.options.get('member');
        const bot = interaction.client.user;
        let author  ={ name: bot.username, iconURL: bot.avatarURL()};
        let message = `t'as fait un câlin \n<@${user.id}>`;
        if (member !== null && member.user !== null) {
            author = { name: user.username, iconURL: user.avatarURL()};
             message = `t'as fait un câlin\n<@${member.user.id}>`;
        }
        await interaction.reply({embeds: [
            new EmbedBuilder()
                .setImage(hugFetch.link)
                .setAuthor(author)
                .setDescription(message)
                .setColor("Gold")
            ]});
    }
}