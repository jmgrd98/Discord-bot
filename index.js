// Require the necessary discord.js classes
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');

// Environment variables
const env = require('dotenv');
env.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

// Importing commands
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    }
    else{
    console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes.`);
    }
}
console.log(client.commands)

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);