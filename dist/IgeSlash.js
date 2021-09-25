"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
class IgeCommand {
    name;
    category;
    description;
    aliases;
    usage;
    example;
    permission;
    /**
     * @param {SlashOptions} slashOptions
     */
    constructor(slashOptions) {
        if (!slashOptions.name)
            throw new Error(Errrors_1.default.MISSING_CMD_NAME);
        if (!slashOptions.category)
            throw new Error(Errrors_1.default.MISSING_CMD_CAT);
        if (!slashOptions.usage)
            throw new Error(Errrors_1.default.MISSING_CMD_USAGE);
        if (!slashOptions.permission)
            slashOptions.permission = "everyone";
        this.name = slashOptions.name;
        this.category = slashOptions.category;
        this.description = slashOptions?.description;
        this.aliases = slashOptions?.aliases;
        this.usage = slashOptions.usage;
        this.example = slashOptions?.example;
        this.permission = slashOptions.permission;
    }
}
exports.default = IgeCommand;
module.exports = IgeCommand;
