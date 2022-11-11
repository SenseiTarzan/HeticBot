import {
  ApplicationCommand,
  BitFieldResolvable,
  CacheType,
  ChatInputCommandInteraction,
  Client,
  Collection,
  Interaction,
  Routes,
  SlashCommandAttachmentOption,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption, SlashCommandStringOption,
  SlashCommandSubcommandBuilder,
  SlashCommandUserOption
} from "discord.js";
import {ICommand, SubCommand} from "../Commands/Command";
import {Main} from "../Main";
import {SlashCommandBooleanOption} from "@discordjs/builders";

export type ChannelTypeResolvable = BitFieldResolvable<ChannelType, bigint>;

export type ChannelType =
    | 'ALL'
    | 'DM'
    | 'GUILD_NEWS'
    | 'GUILD_TEXT'
    | 'GUILD_NEWS_THREAD'
    | 'GUILD_PUBLIC_THREAD'
    | 'GUILD_PRIVATE_THREAD';

export default class CommandFactory {
  private commands: Collection<string, ICommand>;
  private static prefix: string;
  private static instance: CommandFactory;
  constructor(client: Client) {
    this.commands = new Collection<string, ICommand>();
    CommandFactory.instance = this;
    CommandFactory.prefix = "/";
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (!(interaction instanceof ChatInputCommandInteraction)) return;
      // @ts-ignore
        if (interaction.user.bot) return;
      //const args: string[] = message..slice(prefix.length).trim().split(/ +/);
      // @ts-ignore
      if (this.hasCommand(interaction.commandName)) {
        // @ts-ignore
        const commands: Commands | null = this.getCommand(interaction.commandName);
        if (commands instanceof ICommand) {

          // @ts-ignore
          await commands.execute(interaction.user, interaction, []);
          return;
        }

      }
    });
  }

  public static getPrefix(): string{
    return  this.prefix;
  }
  public static getInstance(): CommandFactory{
    return  this.instance;
  }


  /**
   * Permet de d'erengistre des Commands Discord
   * @param Command
   * @param override
   * @returns
   */
  public registerCommands(Command: ICommand, override: boolean = false): void {
    const CommandName: string = Command.getName();
    const CommandAlias: string[] = Command.getAlias();
    if (!this.hasCommand(CommandName)) {
      this.commands.set(CommandName, Command);
      console.log(`Command ${CommandFactory.prefix}${CommandName} a été enregistre`);
    } else if (override) {
        this.commands.set(CommandName, Command);

        console.log(`Command ${CommandFactory.prefix}${CommandName} a été enregistre`);
        return;
      }else{
      console.log(
        `Vous ne pouvez pas enregistre ${CommandName} car il est deja existante`
      );
    }
    CommandAlias.forEach((alias) => {
      if (!this.hasCommand(alias)) {
        console.log(`Command ${CommandFactory.prefix}${CommandName} a été enregistre avec avec l'alias: ${alias}`);
        this.commands.set(alias, Command);
      } else {
        console.log(
          `Vous ne pouvez pas enregistre ${alias} car il est deja existante`
        );
      }
    });
  }

  public reloadCommandSlash(): void {
    const slashCommandsList = [];
    this.commands.forEach((value, key) => {

      const slashCommandBuilder = new SlashCommandBuilder().setName(key.toLowerCase()).setDescription(value.getDescription());
      value.getOptions().forEach(value1 => {
        if (value1 instanceof SlashCommandBooleanOption) {
          slashCommandBuilder.addBooleanOption(value1);
        } else if (value1 instanceof SlashCommandAttachmentOption) {
          slashCommandBuilder.addAttachmentOption(value1);
        } else if (value1 instanceof SlashCommandUserOption) {
          slashCommandBuilder.addUserOption(value1);
        } else if (value1 instanceof SlashCommandChannelOption) {
          slashCommandBuilder.addChannelOption(value1);
        } else if (value1 instanceof SlashCommandRoleOption) {
          slashCommandBuilder.addRoleOption(value1);
        } else if (value1 instanceof SlashCommandMentionableOption) {
          slashCommandBuilder.addMentionableOption(value1);
        } else if (value1 instanceof SlashCommandIntegerOption) {
          slashCommandBuilder.addIntegerOption(value1);
        } else if (value1 instanceof SlashCommandNumberOption) {
          slashCommandBuilder.addNumberOption(value1);
        } else if (value1 instanceof SlashCommandIntegerOption) {
          slashCommandBuilder.addIntegerOption(value1);
        } else if (value1 instanceof SlashCommandStringOption) {
          slashCommandBuilder.addStringOption(value1);
        }
      });
      value.getSubArguements().forEach((value1, key1) => {
        CommandFactory.subCommandsCreation(slashCommandBuilder, value1);
      })
      slashCommandsList.push(slashCommandBuilder)
    })
       Main.getInstance().rest.put(Routes.applicationCommands(Main.getInstance().user.id), {body: slashCommandsList}).catch(() => {});


  }

  public static subCommandsCreation(slashCommandBuilder: SlashCommandBuilder, commands: ICommand){
    commands.getSubArguements().forEach((value, key) => {
      const slashCommandSubBuilder = new SlashCommandSubcommandBuilder().setName(key.toLowerCase()).setDescription(value.getDescription());

        value.getOptions().forEach(value1 => {
          if (value1 instanceof SlashCommandBooleanOption) {
            slashCommandSubBuilder.addBooleanOption(value1);
          }else if (value1 instanceof SlashCommandAttachmentOption) {
            slashCommandSubBuilder.addAttachmentOption(value1);
          }else if (value1 instanceof SlashCommandUserOption) {
            slashCommandSubBuilder.addUserOption(value1);
          }else if (value1 instanceof SlashCommandChannelOption) {
            slashCommandSubBuilder.addChannelOption(value1);
          }else if (value1 instanceof SlashCommandRoleOption) {
            slashCommandSubBuilder.addRoleOption(value1);
          }else if (value1 instanceof SlashCommandMentionableOption) {
            slashCommandSubBuilder.addMentionableOption(value1);
          }else if (value1 instanceof SlashCommandIntegerOption) {
            slashCommandSubBuilder.addIntegerOption(value1);
          }else if (value1 instanceof SlashCommandNumberOption) {
            slashCommandSubBuilder.addNumberOption(value1);
          }else if (value1 instanceof SlashCommandIntegerOption) {
            slashCommandSubBuilder.addIntegerOption(value1);
          }else if (value1 instanceof SlashCommandStringOption) {
            slashCommandSubBuilder.addStringOption(value1);
          }
        })
          slashCommandBuilder.addSubcommand(slashCommandSubBuilder);

    })
  }

  /**
   * Donne true si la commands existe sinon false
   * @param CommandName
   * @returns
   */
  public hasCommand(CommandName: string): boolean {
    return this.commands.has(CommandName);
  }
  /**
   * donnes la Classe de la commande si elle existe sinon null
   * @param CommandName
   * @returns
   */
  public getCommand(CommandName: string): ICommand | null {
    try {
      return this.commands.get(CommandName);
    } catch (error) {
      return null;
    }
  }

  public getAllCommands(): Collection<string, ICommand> | []{
    try {
      return this.commands
    } catch (error) {
      return [];
    }
  }
}
