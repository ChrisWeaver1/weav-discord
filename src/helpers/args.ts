import { ArgParseOptions } from "..";

export class ArgsModel {
    values: ArgParseOptions[] = [];

    getExists(name: string) : boolean {
        let element = this.values.find(o => o.name == name);
        if (!element) return false;
        else return element.exists;
    }

    getValue(name: string) : string {
        let element = this.values.find(o => o.name == name);
        if (!element) return undefined;
        else return element.value;
    }    

}

export function ParseArgs(message: string, ArgOptions: ArgParseOptions[]) : ArgsModel {
    let model = new ArgsModel();
    let flags = [];
    for(let x = 0; x < ArgOptions.length; x++) {
        for(let b = 0; b < ArgOptions[x].flags.length; b++) {
            flags.push(ArgOptions[x].flags[b]);
        }
    }
    
    for(let i = 0; i < ArgOptions.length; i++) {
        let Option : ArgParseOptions = {
            name: ArgOptions[i].name,
            getValue: ArgOptions[i].getValue,
            flags: ArgOptions[i].flags
        }
        model.values.push(Option);

        if (!ArgExists(Option.flags, message)) {
            Option.exists = false;
            continue;
        }

        Option.exists = true;

        if (Option.getValue) {
            let value = ArgGetValue(Option.flags, message);
            if (flags.indexOf(value) >= 0) { 
                continue;
            }
            else {
                Option.value = value
                continue;
            }
        }
        else {
            continue;
        }
    }

    return model;
}

/**
 * searches given message for flags and finds the value, associated with it.
 * the value is the next word (or string surrounded by quote marks) after a flag
 * @param flags flag values used to search for this arg. i.e. ['-h', '--help']. flags can't contain spaces
 * @param message message to search on
 * 
 */
function ArgGetValue(flags: String[], message: string) : string {
    for (var i = 0; i < flags.length; i++) {
        let flag = flags[i];
        if (message.indexOf(' '+flag+' ') >= 0) {
            let index = message.indexOf(' '+flag+' ');
            let messageSplit = message.split(' ');
            let splitIndex = messageSplit.indexOf(flag.valueOf());
            if (messageSplit[splitIndex+1]) {
                if (messageSplit[splitIndex+1] 
                    && !messageSplit[splitIndex+1].startsWith("'")) {
                    return messageSplit[splitIndex+1];
                }
                else {
                    let messageSplitOnQuote = message.split("'");
                    for (let x = 0; x < messageSplitOnQuote.length; x++) {
                        let splitIndex = messageSplitOnQuote[x].indexOf(' '+flag+' ');
                        if (splitIndex >= 0) {
                            return messageSplitOnQuote[x+1];
                        }
                    }
                }
            }
        }
    }
    return;
}

/**
 * searches given message for flags
 * @param flags flag values used to search for this arg. i.e. ['-h', '--help']. flags can't contain spaces
 * @param message message to search on
 * 
 */
function ArgExists(flags: String[], message: string) : boolean {
    for (var i = 0; i < flags.length; i++) {
        let flag = flags[i];
        let messasgeSplit = message.split(' ');
        let indexOf = messasgeSplit.indexOf(flag.valueOf()) 
        if (indexOf >= 0) {
            return true;
        }
    }
    return false;
}



