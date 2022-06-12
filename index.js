const settings= require("./settings.json")
console.log(settings.showContext);
/**
 * console.logs very easy-to-read messages to the console. 
 * 
 * @param {String} msg The message body
 * @param {Error} error You must pass through a newly created Error to log the line from which the call was made
 * @param {Number} [severity] A number ranging in 1-5 on how serious the bug may be. Defaults to 1
 * @param {Boolean} [isClient] A boolean value on if the log was called on the client side, or server side. Defaults to client
 */
module.exports.print=(msg,error,severity=1,isClient=true)=>{
    if (settings.toUpper) msg.toUpperCase()
    var Context=""
    var SeverityMsg=""
    if (settings.showContext){
        switch (isClient){
            case false:
                (settings.useEmojis) ? Context="[🖥️]" : Context="[SERVER]"
                break;
            default:
                (settings.useEmojis) ? Context="[👨‍💻]" : Context="[CLIENT]";
                break;
        }  
    }
    var stack = error.stack.toString().split(/\r\n|\n/)[1].split(" ");
    stack=stack[stack.length-1]
    var Origin=`[${stack.slice(1,stack.length-1).slice(stack.lastIndexOf("\\"),stack.length)}]`
    if (msg === '') {
        msg = '"👨‍💻"';
    }
    console.log(`${Context} ${SeverityMsg} ${Origin}`);  
}
/*
🖥️
function Module.Print(Severity,Origin,Message)
	local SeverityMsg
	if Severity ==0 then
		SeverityMsg=" [ LOG/📜 ] "
	elseif Severity ==1 then
		SeverityMsg=" [ NONE/❔ ] "
	elseif Severity ==2 then
		SeverityMsg=" [ LOW/⚠️ ] "
	elseif Severity ==3 then
		SeverityMsg=" [ MINOR/❗ ] "
	elseif Severity ==4 then
		SeverityMsg=" [ MAJOR/❗❗ ] "
	elseif Severity ==5 then
		SeverityMsg=" [ CRITICAL/❗❗❗ ] "
	else
		SeverityMsg=" [ NONE/❔ ] "
	end
	if typeof(Message)==table then
		return "[👨‍💻]"..SeverityMsg.."[ " ..Origin.." ]: ",Message
	else
		Message=string.upper(Message)
		return "[👨‍💻]"..SeverityMsg.."[ " ..Origin.." ]: "..Message
	end
end
*/