"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errrors_1 = __importDefault(require("./utils/Errrors"));
/**
 * @example
 * ```js
 * const { IgeSlash } = require("@igecorp/ige-djs");
 *
 * class ping extends IgeSlash {
 *     constructor() {
 *         super({
 *             name: "ping",
 *             description: "Get the bot latency",
 *             type: "MESSAGE",
 *             options: null,
 *             defaultPermission: false
 *             guildOnly: true
 *         })
 *     }
 * }
 * ```
 */
class IgeSlash {
    name;
    description;
    type;
    options;
    defaultPermission;
    guildOnly;
    /**
     * @param {SlashOptions} slashOptions The slash command options.
     */
    constructor(slashOptions) {
        if (!slashOptions)
            throw new Error(Errrors_1.default.MISSING_SLASH_OPTIONS);
        if (!slashOptions.name)
            throw new TypeError(Errrors_1.default.MISSING_SLASH_NAME);
        if (!slashOptions.description)
            throw new TypeError(Errrors_1.default.MISSING_SLASH_DESC);
        this.name = slashOptions.name;
        this.description = slashOptions.description;
        this.type = slashOptions?.type || "CHAT_INPUT";
        this.options = slashOptions?.options;
        this.defaultPermission = slashOptions?.defaultPermission || true;
        this.guildOnly = slashOptions?.guildOnly || false;
    }
}
exports.default = IgeSlash;
module.exports = IgeSlash;
