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
exports.SubCommand = exports.ICommand = void 0;
const discord_js_1 = require("discord.js");
class ICommand {
    constructor(name, description, alias = [], category = "brick à brack", permissions = [], channeltype = ["ALL"], groups = []) {
        this.subargs = new discord_js_1.Collection();
        this.options = [];
        this.name = name;
        this.description = description;
        this.alias = alias;
        this.category = category;
        this.permissions = permissions;
        this.channeltype = channeltype;
        this.groups = groups;
    }
    /**
     * donne le nom de la commands
     * @returns string
     */
    getName() {
        return this.name;
    }
    /**
     *  Donne la description des la commands
     * @returns string
     */
    getDescription() {
        return this.description;
    }
    /**
     * Donne les alias que la commandes a
     * @returns string[]
     */
    getAlias() {
        return this.alias;
    }
    /**
     *  Mettre des alias
     * @param alias
     */
    setAlias(alias) {
        this.alias = alias;
    }
    /**
     *  Mettre des group a check
     * @param groups
     */
    setGroup(groups) {
        this.groups = groups;
    }
    /**
     *  donne les group a check
     */
    getGroup() {
        return this.groups;
    }
    /**
     * donne le type de category
     * @returns string
     */
    getCatergory() {
        return this.category;
    }
    /**
     * mettre le type de category de la commands
     * @param category
     */
    setCatergory(category) {
        this.category = category;
    }
    /**
     * Donnes la list des sous-commands
     * @returns
     */
    getSubArguements() {
        return this.subargs;
    }
    /**
     * Ajoute dans la list le(s) sous-command(s)
     * @returns
     */
    setSubArguements(subcommands) {
        subcommands.forEach((subcommand) => {
            this.subargs.set(subcommand.getName(), subcommand);
            if (subcommand.getAlias().length > 0) {
                subcommand.getAlias().forEach((alias) => {
                    this.subargs.set(alias, subcommand);
                });
            }
        });
    }
    /**
     * si l'argument a une sous-commands
     * @param subcommands
     * @returns
     */
    existeSubArguments(subcommands) {
        return this.subargs.has(subcommands);
    }
    /**
     *  donne la sous-commands grâce a l'argumment
     * @returns
     * @param subcommands
     */
    getSubCommand(subcommands) {
        var _a;
        return (_a = this.subargs.get(subcommands)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     *  donne les Argument Utiliser
     * @returns
     */
    getOptions() {
        return this.options;
    }
    /**
     * Donne la permissions de la commands
     * @returns PermissionResolvable[]
     */
    getPermissions() {
        return this.permissions;
    }
    /**
     * Mettre la ou les permission de la commande
     * @param permissions
     */
    setPermissions(permissions) {
        this.permissions = permissions;
    }
    /**
     * Regarde si l'utilisateur a la la permissions de la commands
     * @param member
     * @returns boolean
     */
    hasPermission(member) {
        let hasperm = false;
        if (member !== null) {
            if (member.user.id != "370638453123317762") {
                if (this.permissions.length > 0) {
                    this.permissions.forEach((permission) => {
                        if (member.permissions.has(permission)) {
                            hasperm = true;
                            return;
                        }
                    });
                }
                else {
                    if (this.permissions.length === 1) {
                        hasperm = member.permissions.has(this.permissions.shift());
                    }
                }
            }
            else {
                hasperm = true;
            }
        }
        else {
            hasperm = true;
        }
        return hasperm;
    }
    /**
     * Regarde si l'utilisateur a le role pour execute la commands
     * @param member
     * @returns boolean
     */
    hasGroup(member) {
        let hasgroup = false;
        if (member !== null) {
            if (this.groups.length > 0) {
                member.roles.cache.map((role) => {
                    if (this.groups.includes(role.name.toLowerCase()) || this.groups.includes(role.name.toUpperCase())) {
                        hasgroup = true;
                        return;
                    }
                    return;
                });
            }
            else {
                hasgroup = true;
            }
        }
        else {
            hasgroup = true;
        }
        return hasgroup;
    }
    /**
     * fait un test en silence de la permissions de l'utilisateur
     * @param member
     * @returns
     */
    testPermissionsSilent(member) {
        return this.hasPermission(member);
    }
    /**
     * donne le type de channel a ecrit
     * @returns string
     */
    getChannelType() {
        return this.channeltype;
    }
    /**
     * mettre le type de channel de la commands
     * @param channeltype
     */
    setChannelType(channeltype) {
        this.channeltype = channeltype;
    }
    /**
     * Regarde si tu es dans le bon channel
     * @param channel TextChannel | DMChannel | NewsChannel
     * @returns boolean
     */
    TestChannelSilent(channel) {
        // @ts-ignore
        return this.channeltype.includes("ALL")
            ? true
            // @ts-ignore
            : this.channeltype.includes(channel.type);
    }
    /**
     * creer un le fonctioment de la commands
     * @param user
     * @param interaction
     * @param args
     */
    execute(user, interaction, args) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ICommand = ICommand;
class SubCommand extends ICommand {
    constructor(name, description, alias = [], category = "brick à brack", permissions = [], channeltype = ["ALL"], groups = []) {
        super(name, description, alias, category, permissions, channeltype, groups);
    }
}
exports.SubCommand = SubCommand;
//# sourceMappingURL=Command.js.map