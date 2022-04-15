const { channelMention } = require("@discordjs/builders")
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const { token } = require('./config.json');
var gameStart = false; //Checks if game has started
var queue = [undefined, undefined] //Two users
var turnRY = "Red"; //Current user's turn (Red or Yellow)
var circle = undefined;//Current the color of the circle
var pRed = undefined;// Player Red
var pYellow = undefined;//Player Yellow
var winner = undefined;
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
    if(message.author.bot)return;
    queuing(message.author.tag, message.channel, message.content, message) //Function controlls queue, 
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
        gameStart = true
        pRed = queue[0]
        pYellow = queue[1]
    }
}

function runGame(msgContent,msgChannel,msgAuthor){
    if((gameStart != undefined) || (turnRY === "Red" && msgAuthor === pYellow) || (turnRY === "Yellow" && msgAuthor === pRed)) return; //Surrender condition
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
        if(msgContent === "1"){ //Places the correct circle in the first column
            for(var i = 6; i >= 0; i--){
                if(board[i][0] === empty ){
                    board[i][0] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "2"){ //Places the correct circle in the second column
            for(var i = 6; i >= 0; i--){
                if(board[i][1] === empty ){
                    board[i][1] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "3"){ //Places the correct circle in the third column
            for(var i = 6; i >= 0; i--){
                if(board[i][2] === empty ){
                    board[i][2] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "4"){ //Places the correct circle in the fourth column
            for(var i = 6; i >= 0; i--){
                if(board[i][3] === empty ){
                    board[i][3] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "5"){ //Places the correct circle in the fifth column
            for(var i = 6; i >= 0; i--){
                if(board[i][4] === empty ){
                    board[i][4] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }else if(msgContent === "6"){ //Places the correct circle in the sixth column
            for(var i = 6; i >= 0; i--){
                if(board[i][5] === empty ){
                    board[i][5] = `|${color}`
                    msgChannel.send(`> ${board[0]}\n> ${board[1]}\n> ${board[2]}\n> ${board[3]}\n> ${board[4]}\n> ${board[5]}\n> ${board[6]}`)
                    break;
                }
            }
        }
        checkWin(msgChannel); //Checks for who won
        if(turnRY === "Red"){
            turnRY = "Yellow"
        } else {
            turnRY = "Red"
        }
    }
}

function checkWin(msgChannel){
    for(var i = 0; i < 6; i++){
        //checks for horizontal win
        if((board[i][5] === `|${color}` && board[i][4] === `|${color}` && board[i][3] === `|${color}` && board[i][2] === `|${color}`) || (board[i][4] === `|${color}` && board[i][3] === `|${color}` && board[i][2] ===`|${color}` && board[i][1] === `|${color}`) || (board[i][3] === `|${color}` && board[i][2] === `|${color}` && board[i][1] === `|${color}` && board[i][0] === `|${color}`)){
            msgChannel.send(`${color} wins!`)
            winner = (`${color}`)
            gameOver();
            break;
        }
        //check for vertical win
        if((board[5][i] === `|${color}` && board[4][i] === `|${color}` && board[3][i] === `|${color}` && board[2][i] === `|${color}`) || (board[4][i] === `|${color}` && board[3][i] === `|${color}` && board[2][i] === `|${color}` && board[1][i] === `|${color}`) || (board[3][i] === `|${color}` && board[2][i] === `|${color}` && board[1][i] === `|${color}` && board[0][i] === `|${color}`)){
            msgChannel.send(`${color} wins!`)
            winner = (`${color}`)
            gameOver();
            break;
        }
    }
    for(var i = 0; i < 3; i++){//checks for \ win
        if((board[5][i + 0] === `|${color}` && board[4][i + 1] === `|${color}` && board[3][i + 2] === `|${color}` && board[2][i + 3] === `|${color}`) || (board[4][i + 0] === `|${color}` && board[3][i + 1] === `|${color}` && board[2][i + 2] === `|${color}` && board[1][i + 3] === `|${color}`) || (board[3][i + 0] === `|${color}` && board[2][i + 1] === `|${color}` && board[1][i + 2] === `|${color}` && board[0][i + 3] === `|${color}`)){
            msgChannel.send(`${color} wins!`)
            winner = (`${color}`)
            gameOver();
            break;
        }
        if((board[5][i + 3] === `|${color}` && board[4][i + 2] === `|${color}` && board[3][i + 1] === `|${color}` && board[2][i + 0] === `|${color}`) || (board[4][i + 3] === `|${color}` && board[3][i + 2] === `|${color}` && board[2][i + 1] === `|${color}` && board[1][i + 0] === `|${color}`) || (board[3][i + 3] === `|${color}` && board[2][i + 2] === `|${color}` && board[1][i + 1] === `|${color}` && board[0][i + 0] === `|${color}`)){
            msgChannel.send(`${color} wins!`)
            winner = (`${color}`)
            gameOver();
            break;
          //checks for / win
        }
    }
    if((board[0][0] != empty) && (board[0][1] != empty) && (board[0][2] != empty) && (board[0][3] != empty) && (board[0][4] != empty) && (board[0][5] != empty) && (board[1][0] != empty) && (board[1][1] != empty) && (board[1][2] != empty) && (board[1][3] != empty) && (board[1][4] != empty) && (board[1][5] != empty)&& (board[2][0] != empty)&& (board[2][1] != empty)&& (board[2][2] != empty)&& (board[2][3] != empty)&& (board[2][4] != empty)&& (board[2][5] != empty)&& (board[3][0] != empty)&& (board[3][1] != empty)&& (board[3][2] != empty)&& (board[3][3] != empty)&& (board[3][4] != empty)&& (board[3][5] != empty)&& (board[4][0] != empty)&& (board[4][1] != empty)&& (board[4][2] != empty)&& (board[4][3] != empty)&& (board[4][4] != empty) && (board[4][5] != empty)&& (board[5][0] != empty)&& (board[5][1] != empty)&& (board[5][2] != empty) && (board[5][3] !=empty) && (board[5][4] != empty) && (board[5][5] != empty)){
        msgChannel.send("Draw, Nobody wins!")
        gameOver();
      //checks for a draw
    }
}


function gameOver(winner){
    gameStart = false;
    queue = [undefined, undefined] //Two users
    turnRY = winner; //Current user's turn (Red or Yellow)
    circle = undefined;//Current the color of the circle
    pRed = undefined;// Player Red
    pYellow = undefined;//Player Yellow
    board = [ [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [empty, empty, empty, empty, empty, empty,"|"],
              [" 1️⃣","  2️⃣"," 3️⃣"," 4️⃣"," 5️⃣", " 6️⃣"]];

}
client.login(token);
