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
    if(message.author.bot)return;

    queuing(message.author.tag, message.channel, message.content, message) //Function controlls queue, 
    connect4(message.channel, message.channel.content, message);
})


function connect4(Channel, Content, Message){
    if(gameStart === true){
        gameStart = undefined;
        Channel.send(`Queue is full! Game is starting...`)
        .then(Message => {
            setTimeout(() => Message.edit(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`), 1000)
          })
    }
}


function queuing(authorTag, Channel, Content, Message)//message.author.tag, message.channel, message.content, message
{
    if(queue[0] === undefined && Content === "-queue" ){
        queue[0] = authorTag
        Message.delete();
        Channel.send(`${authorTag} has queued! 1/2`)
        .then(Message => {
            setTimeout(() => Message.delete(), 5000)
          })
        console.log(`${queue[0]} has queued 1/2`)
    } else if(queue[0] != undefined && queue[1] === undefined && authorTag != queue[0] && Content === "-queue"){
        queue[1] = authorTag
        Message.delete();
        Channel.send(`${authorTag} has queued! 2/2`)
        .then(Message => {
            setTimeout(() => Message.delete(), 5000)
          })
        console.log(`${queue[0]} has queued 2/2`)
    }
    if(authorTag === queue[0] && Content === "-dequeue"){
        queue[0] = queue[1];
        queue[1] = undefined;
        Channel.send("You have dequeued successfully!")
        .then(Message => {
            setTimeout(() => Message.delete(), 5000)
          })
    } else if(authorTag === queue[1] && Content === "-dequeue"){
        queue[1] = undefined;
        Channel.send("You have dequeued successfully!")
        .then(Message => {
            setTimeout(() => Message.delete(), 5000)
          })
    }

    if(queue[0] != undefined && queue[1] != undefined && gameStart === false){
    Message.react(`6️⃣`);
        // })
        gameStart = true
    }
    console.table(queue)
}



client.login(token);