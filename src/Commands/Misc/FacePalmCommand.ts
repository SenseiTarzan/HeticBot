import {ICommand} from "../Command";
import {ApplicationCommandOptionBase} from "@discordjs/builders";
import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandUserOption, User} from "discord.js";
import fetch from "node-fetch";
import ImageManager from "../../Api/ImageManager";

export default class FacePalmCommand extends ICommand{
    constructor() {
        super("face-palm", "Permet de faire une tape sur la tête");
    }

    getOptions(): ApplicationCommandOptionBase[] {
        return [];
    }

    async execute(user: User, interaction: ChatInputCommandInteraction, args: Array<any>): Promise<void> {
        let facePalmFetch : {link: string} = {link: ""};
        try {
            facePalmFetch = await (await fetch(ImageManager.getInstance().getImage('face-palm').url)).json()
        }catch (e) {
            await interaction.reply({content: "L'api n'est plus disponible"});
            return ;
        }
        if (facePalmFetch.link === ""){
            await interaction.reply({content: "L'api n'est plus disponible"});
            return;
        }
        let message = `se tape sur la tête`;
        await interaction.reply({embeds: [
            new EmbedBuilder()
                .setImage(facePalmFetch.link)
                .setAuthor({ name: user.username, iconURL: user.avatarURL()})
                .setDescription(message)
                .setColor("Gold")
            ]});
    }
}