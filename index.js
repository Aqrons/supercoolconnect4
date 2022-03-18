const { channelMention } = require("@discordjs/builders")
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const { token } = require('./config.json');


var gameStart = false;
var queue = [undefined, undefined]
var board = [ ["|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>","|"],
              ["|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>","|"],
              ["|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>","|"],
              ["|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>","|"],
              ["|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>","|"],
              ["|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>", "|<:blank:954191658403127307>","|"],
              [" 1️⃣","  2️⃣"," 3️⃣"," 4️⃣"," 5️⃣", " 6️⃣"]];




client.once('ready', () => {
    console.log(`Online!`)
})

client.on('messageCreate', message => {
    if(message.author.bot) return;
    queuing(message.author.tag, message.channel, message.content) //Function controlls queue, 
    connect4(message.channel, message.channel.content);
})


function connect4(Channel, Content){
    if(gameStart === true){
        Channel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`);
        gameStart = undefined;
    }
}


function queuing(authorTag, Channel, Content)//message.author.tag, message.channel, message.content
{
    if(queue[0] === undefined && Content === "-queue" ){
        queue[0] = authorTag
        Channel.send(`${authorTag} has queued! 1/2`)
        console.log(`${queue[0]} has queued 1/2`)
    } else if(queue[0] != undefined && queue[1] === undefined && authorTag != queue[0] && Content === "-queue"){
        queue[1] = authorTag
        Channel.send(`${authorTag} has queued! 2/2`)
        console.log(`${queue[0]} has queued 2/2`)
    }
    if(authorTag === queue[0] && Content === "-dequeue"){
        queue[0] = queue[1];
        queue[1] = undefined;
        Channel.send("You have dequeued successfully!")
    } else if(authorTag === queue[1] && Content === "-dequeue"){
        queue[1] = undefined;
        Channel.send("You have dequeued successfully!")
    }

    if(queue[0] != undefined && queue[1] != undefined && gameStart === false){
        Channel.send(`Queue is full! Game is starting...`)
        gameStart = true
    }
    console.table(queue)
}

client.login(token);