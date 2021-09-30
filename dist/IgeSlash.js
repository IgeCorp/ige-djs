"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
class IgeCommand {
    name;
    description;
    aliases;
    usage;
    example;
    permission;
    guildOnly;
    /**
     * @param {SlashOptions} slashOptions
     */
    constructor(slashOptions) {
        if (!slashOptions.name)
            throw new Error(Errrors_1.default.MISSING_CMD_NAME);
        if (!slashOptions.usage)
            throw new Error(Errrors_1.default.MISSING_CMD_USAGE);
        if (!slashOptions.permission)
            slashOptions.permission = "everyone";
        if (!slashOptions.guildOnly)
            slashOptions.guildOnly = false;
        this.name = slashOptions.name;
        this.description = slashOptions?.description;
        this.aliases = slashOptions?.aliases;
        this.usage = slashOptions.usage;
        this.example = slashOptions?.example;
        this.permission = slashOptions.permission;
        this.guildOnly = slashOptions.guildOnly;
    }
}
exports.default = IgeCommand;
module.exports = IgeCommand;
