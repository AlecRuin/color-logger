const settings= JSON.parse(JSON.stringify(require("./settings.json")))
/**
 * console.logs very easy-to-read messages to the console. 
 * 
 * @param {String} msg The message body
 * @param {Error} error You must pass through a newly created Error to log the line from which the call was made
 * @param {Number} [severity] A number ranging in 1-5 on how serious the bug may be. Defaults to 0
 * @param {Boolean} [isClient] A boolean value on if the log was called on the client side, or server side. Defaults to client
 * @param {String} [environment] A string you may pass to differentiate whether app is on production or development. simply pass process.env.NODE_ENV to automate this. Defaults to development 
 */
module.exports.print=(msg,error,options={isClient:true,severity:0,environment:"development"})=>{
    if (settings.hideOnProduction && options.environment ==="production" && options.isClient==false) return null
    if (settings.toUpper && typeof msg==="string") msg.toUpperCase()
    if (typeof msg==="object") msg=JSON.stringify(msg)
    var Context=""
    var SeverityMsg=""
    if (settings.showContext){
        switch (options.isClient){
            case false:
                (settings.useEmojis) ? Context="[🖥️]" : Context="\x1b[34m[SERVER]"
                break;
            default:
                (settings.useEmojis) ? Context="[👨‍💻]" : Context="\x1b[32m[CLIENT]";
                break;
        }  
    }
    switch (options.severity){
        case 1:
            SeverityMsg=`\x1b[35m[${settings[1].keyword}${(settings.useEmojis) ? "/❔" :""}]`
            break;
        case 2:
            SeverityMsg=`\x1b[33m[${settings[2].keyword}${(settings.useEmojis) ? "/⚠️" :""}]`
            break;
        case 3:
            SeverityMsg=`\x1b[33m[${settings[3].keyword}${(settings.useEmojis) ? "/❗" :""}]`
            break;
        case 4:
            SeverityMsg=`\x1b[31m[${settings[4].keyword}${(settings.useEmojis) ? "/❗❗" :""}]`
            break;
        case 5:
            SeverityMsg=`\x1b[31m[${settings[5].keyword}${(settings.useEmojis) ? "/❗❗❗" :""}]`
            break;
        default:
            SeverityMsg=`\x1b[37m[${settings[0].keyword}${(settings.useEmojis) ? "/📜" :""}]`
            break;
    }
    var stack = error.stack.toString().split(/\r\n|\n/)[1].split(" ");
    stack=stack[stack.length-1]
    var filter
    (stack.search("/")===-1)?filter="\\":filter="/"
    var Origin=`[${stack.slice(1,stack.length-1).slice(stack.lastIndexOf(filter),stack.length)}]`
    if (!msg) throw new Error("Message not provided by ",Origin)
    if (msg === '') {
        msg = '"👨‍💻"';
    }
    console.log(`${Context} ${SeverityMsg}\x1b[0m \x1b[1m${msg} \x1b[30m${Origin}\x1b[0m`);  
}