const { channelMention } = require("@discordjs/builders")
const fs = require('fs')
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const { token } = require('./config.json');
var gameStart = false; //Checks if game has started
var queue = [undefined, undefined] //Two users
var turnRY = "Red"; //Current user's turn (Red or Yellow)
var circle = undefined;//Current the color of the circle
var pRed = undefined;// Player Red
var pYellow = undefined;//Player Yellow
var empty = "|<:blank:954191658403127307>"//The blank emoji displayed
var board = [ [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [" 1️⃣","  2️⃣"," 3️⃣"," 4️⃣"," 5️⃣", " 6️⃣"]];


client.once('ready', () => {
    console.log(`Online!`)
})

client.on('messageCreate', message => {
    console.log(pRed)
    console.log(pYellow)
    if(message.author.bot)return;
    queuing(message.author.tag, message.channel, message.content, message); //Function controlls queue, 
    gameStarter(message.channel);
    runGame(message.content, message.channel,message.author.tag);
})


function gameStarter(Channel){
    if(gameStart === true){
        gameStart = undefined;
        Channel.send(`Queue is full! Game is starting...`)
        .then(Message => {
            setTimeout(() => Message.edit(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`), 100)
          })
    }
}


function queuing(authorTag, Channel, Content, Message)// queuing code (message.author.tag, message.channel, message.content, message)
{
        if(gameStart === undefined)return;
    if(queue[0] === undefined && (Content === "-queue" || Content === "-q")){
        queue[0] = authorTag
        Message.delete();
        Channel.send(`${authorTag} has queued! 1/2`)
    } else if(queue[0] != undefined && queue[1] === undefined && authorTag != queue[0] && (Content === "-queue" || Content === "-q")){
        queue[1] = authorTag
        Message.delete();
        Channel.send(`${authorTag} has queued! 2/2`)
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
        pRed = queue[0]
        pYellow = queue[1]
        gameStart = true;
    }
}

function runGame(msgContent,msgChannel,msgAuthor){
    if((gameStart != undefined) || (turnRY === "Red" && msgAuthor === pYellow) || (turnRY === "Yellow" && msgAuthor === pRed)) return;
        if((msgContent === "-ff" || msgContent === "-quit") && msgAuthor === pRed){
            msgChannel.send("Red has quit, Yellow wins!")
            gameOver();
        }else if((msgContent === "-ff" || msgContent === "-quit") && msgAuthor === pYellow){
            msgChannel.send("Yellow has quit, Red wins!")
            gameOver();
        }
    if(msgContent === "1" || msgContent === "2" || msgContent === "3" || msgContent === "4" || msgContent === "5" || msgContent === "6"){
        if(turnRY === "Red"){
            color = ":red_circle:"
        } else {
            color = ":yellow_circle:"
        }
        if(msgContent === "1"){
            for(var i = 6; i >= 0; i--){
                if(board[i][0] === empty ){
                    board[i][0] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    changeTurn();
                    break;
                }
            }
        }else if(msgContent === "2"){
            for(var i = 6; i >= 0; i--){
                if(board[i][1] === empty ){
                    board[i][1] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    changeTurn();
                    break;
                }
            }
        }else if(msgContent === "3"){
            for(var i = 6; i >= 0; i--){
                if(board[i][2] === empty ){
                    board[i][2] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    changeTurn();
                    break;
                }
            }
        }else if(msgContent === "4"){
            for(var i = 6; i >= 0; i--){
                if(board[i][3] === empty ){
                    board[i][3] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    changeTurn();
                    break;
                }
            }
        }else if(msgContent === "5"){
            for(var i = 6; i >= 0; i--){
                if(board[i][4] === empty ){
                    board[i][4] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    changeTurn();
                    break;
                }
            }
        }else if(msgContent === "6"){
            for(var i = 6; i >= 0; i--){
                if(board[i][5] === empty ){
                    board[i][5] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    changeTurn();
                    break;
                }
            }
        }
        if(color === ":red_circle:"){
            checkWinHorizontal(msgChannel,msgAuthor,":red_circle:");
            checkWinVertical(msgChannel,msgAuthor,":red_circle:");
            checkWinOppDiagonal(msgChannel,msgAuthor,":red_circle:");
            checkWinDiagonal(msgChannel,msgAuthor,":red_circle:");
            checkDraw(msgChannel,msgAuthor);
        }else if(color === ":yellow_circle:"){
            checkWinHorizontal(msgChannel,msgAuthor,":yellow_circle:");
            checkWinVertical(msgChannel,msgAuthor,":yellow_circle:");
            checkWinOppDiagonal(msgChannel,msgAuthor,":yellow_circle:");
            checkWinDiagonal(msgChannel,msgAuthor,":yellow_circle:");
            checkDraw(msgChannel,msgAuthor);
        }
    }
}
function changeTurn(){
    if(turnRY === "Red"){
        turnRY = "Yellow"
    } else {
        turnRY = "Red"
    }
}

function checkWinHorizontal(msgChannel,authorTag,circleColor){ //checks for horizontal win
    for(var i = 0; i < 6; i++){
        if(board[i][5] === `|${circleColor}` && board[i][4] === `|${circleColor}` && board[i][3] === `|${circleColor}` && board[i][2] === `|${circleColor}`){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if(board[i][4] === `|${circleColor}` && board[i][3] === `|${circleColor}` && board[i][2] ===`|${circleColor}` && board[i][1] === `|${circleColor}`){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if((board[i][3] === `|${circleColor}` && board[i][2] === `|${circleColor}` && board[i][1] === `|${circleColor}` && board[i][0] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }
    }
}
function checkWinVertical(msgChannel,authorTag,circleColor){ //check for vertical win
    for(var i = 0; i < 6; i++){
        if(board[5][i] === `|${circleColor}` && board[4][i] === `|${circleColor}` && board[3][i] === `|${circleColor}` && board[2][i] === `|${circleColor}`){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if((board[4][i] === `|${circleColor}` && board[3][i] === `|${circleColor}` && board[2][i] === `|${circleColor}` && board[1][i] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if(board[3][i] === `|${circleColor}` && board[2][i] === `|${circleColor}` && board[1][i] === `|${circleColor}` && board[0][i] === `|${circleColor}`){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }
        }
    }
function checkWinOppDiagonal(msgChannel,authorTag,circleColor){ //checks for \ win
    for(var i = 0; i < 3; i++){
        if((board[5][i + 0] === `|${circleColor}` && board[4][i + 1] === `|${circleColor}` && board[3][i + 2] === `|${circleColor}` && board[2][i + 3] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if(board[4][i + 0] === `|${circleColor}` && board[3][i + 1] === `|${circleColor}` && board[2][i + 2] === `|${circleColor}` && board[1][i + 3] === `|${circleColor}`){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if((board[3][i + 0] === `|${circleColor}` && board[2][i + 1] === `|${circleColor}` && board[1][i + 2] === `|${circleColor}` && board[0][i + 3] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }
    }
}
function checkWinDiagonal(msgChannel,authorTag,circleColor){//checks for / win
    for(var i = 0; i < 3; i++){
        if((board[5][i + 3] === `|${circleColor}` && board[4][i + 2] === `|${circleColor}` && board[3][i + 1] === `|${circleColor}` && board[2][i + 0] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if((board[4][i + 3] === `|${circleColor}` && board[3][i + 2] === `|${circleColor}` && board[2][i + 1] === `|${circleColor}` && board[1][i + 0] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }else if((board[3][i + 3] === `|${circleColor}` && board[2][i + 2] === `|${circleColor}` && board[1][i + 1] === `|${circleColor}` && board[0][i + 0] === `|${circleColor}`)){
            msgChannel.send(`${color} wins!`)
            msgChannel.send(":sunglasses:")
            gameOver();
            break;
        }
    }
}
function checkDraw(msgChannel,authorTag){
    if((board[0][0] != empty) && (board[0][1] != empty) && (board[0][2] != empty) && (board[0][3] != empty) && (board[0][4] != empty) && (board[0][5] != empty) && (board[1][0] != empty) && (board[1][1] != empty) && (board[1][2] != empty) && (board[1][3] != empty) && (board[1][4] != empty) && (board[1][5] != empty)&& (board[2][0] != empty)&& (board[2][1] != empty)&& (board[2][2] != empty)&& (board[2][3] != empty)&& (board[2][4] != empty)&& (board[2][5] != empty)&& (board[3][0] != empty)&& (board[3][1] != empty)&& (board[3][2] != empty)&& (board[3][3] != empty)&& (board[3][4] != empty)&& (board[3][5] != empty)&& (board[4][0] != empty)&& (board[4][1] != empty)&& (board[4][2] != empty)&& (board[4][3] != empty)&& (board[4][4] != empty) && (board[4][5] != empty)&& (board[5][0] != empty)&& (board[5][1] != empty)&& (board[5][2] != empty) && (board[5][3] !=empty) && (board[5][4] != empty) && (board[5][5] != empty)){
        msgChannel.send("Draw, Nobody wins!")
        gameOver();
      //checks for a draw
    }
}

function gameOver(){  
gameStart = false; //Checks if game has started
queue = [undefined, undefined] //Two users
turnRY = "Red"; //Current user's turn (Red or Yellow)
circle = undefined;//Current the color of the circle
pRed = undefined;// Player Red
pYellow = undefined;//Player Yellow
empty = "|<:blank:954191658403127307>"//The blank emoji displayed
board = [ [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [" 1️⃣","  2️⃣"," 3️⃣"," 4️⃣"," 5️⃣", " 6️⃣"]];



}

client.login(token);
