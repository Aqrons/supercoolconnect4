const { channelMention } = require("@discordjs/builders")
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const { token } = require('./config.json');

var gameStart = false;
var queue = [undefined, undefined] //Two users
var turnRY = "red"; //Current user's turn (Red or Yellow)
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
    gameStarter(message.channel, message.content, message);
    runGame(message.content, message.channel);
    console.log("")
})


function gameStarter(Channel, Content, Message){
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
        if(gameStart === undefined)return;
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
        gameStart = true
        console.log("Game starting!")
        turnRY = queue[0]
    }
    console.table(queue)
}

function runGame(msgContent,msgChannel){
    var circle = 0;
    if(gameStart != undefined) return;


    if(turnRY === "Red"){
        color = ":red_circle:"
    } else {
        color = ":yellow_circle:"
    }

        if(msgContent === "1"){
            for(var i = 6; i >= 0; i--){
                if(board[i][0] === "|<:blank:954191658403127307>" ){
                    board[i][0] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "2"){
            for(var i = 6; i >= 0; i--){
                if(board[i][1] === "|<:blank:954191658403127307>" ){
                    board[i][1] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "3"){
            for(var i = 6; i >= 0; i--){
                if(board[i][2] === "|<:blank:954191658403127307>" ){
                    board[i][2] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "4"){
            for(var i = 6; i >= 0; i--){
                if(board[i][3] === "|<:blank:954191658403127307>" ){
                    board[i][3] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "5"){
            for(var i = 6; i >= 0; i--){
                if(board[i][4] === "|<:blank:954191658403127307>" ){
                    board[i][4] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "6"){
            for(var i = 6; i >= 0; i--){
                if(board[i][5] === "|<:blank:954191658403127307>" ){
                    board[i][5] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }

        console.table(board)
        if(turnRY === "Red"){
            turnRY = "Yellow"
        } else {
            turnRY = "Red"
        }
}


client.login(token);