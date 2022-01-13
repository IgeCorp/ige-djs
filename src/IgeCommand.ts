import CommandOptions from "./utils/CommandOptions";
import Errors from "./utils/Errrors";

class IgeCommand {
    name: string;
    category: string;
    description?: string;
    aliases?: string[];
    usage: string[];
    example?: string[];
    permission?: string;
    botAllowed?: boolean;

    /**
     * All command options
     * @typedef {Object} CommandOptions
     * @property {string} name The command name.
     * @property {string} category The command category.
     * @property {string} [description=null] The command description.
     * @property {string[]} [aliases=null] The command aliases.
     * @property {string[]} usage The command usages.
     * @property {string[]} [example=null] The command example.
     * @property {string} [permission=null] The command permission.
     * @property {boolean} [botAllowed=false] Boolean value to define if a bot can use this command.
     */

    /**
     * Command paremeters
     * @param {CommandOptions} commandOptions The command options (name, category, usage, description, ...)
     * @returns {Promise<IgeCommand>}
     */
    constructor(commandOptions: CommandOptions) {
        if (!commandOptions) throw new Error(Errors.MISSING_CMD_OPTIONS);
        if (!commandOptions.name) throw new TypeError(Errors.MISSING_CMD_NAME);
        if (!commandOptions.category) throw new TypeError(Errors.MISSING_CMD_CAT);
        if (!commandOptions.usage) throw new TypeError(Errors.MISSING_CMD_USAGE);
        if (!commandOptions.permission) commandOptions.permission = "everyone";
        if (!commandOptions.botAllowed) commandOptions.botAllowed = false;

        /**
         * Command name
         * @type {string}
         */
        this.name = commandOptions.name;
        /**
         * Command category
         * @type {string}
         */
        this.category = commandOptions.category;
        /**
         * Command description
         * @type {string}
         */
        this.description = commandOptions?.description;
        /**
         * Command aliase(s)
         * @type {string[]}
         */
        this.aliases = commandOptions?.aliases;
        /**
         * Command usage(s)
         * @type {string[]}
         */
        this.usage = commandOptions.usage;
        /**
         * Command example(s)
         * @type {string[]}
         */
        this.example = commandOptions?.example;
        /**
         * Command permission
         * @type {string}
         */
        this.permission = commandOptions.permission;
        /**
         * Bot allowed or no
         * @type {boolean}
         */
        this.botAllowed = commandOptions.botAllowed;
    }
}

exports.IgeCommand = IgeCommand;