import Discord from 'discord.js';

import fetchWikiLink from './fetchWikiLink';

const client = new Discord.Client();

interface Command {
    name: string;
    aliases: string[];
}

interface Bot {
    PREFIX: string;
    commands: Command[];
}

const bot: Bot = {
    PREFIX: '!',
    commands: [
        {
            name: 'shitpost',
            aliases: ['shit'],
        },
    ],
};

const checkCommand = (bot: Bot, arg: string | undefined): string => {
    if (!arg) return '';
    for (let command of bot.commands) {
        if (command.name === arg) return command.name;
        for (let alias of command.aliases) {
            if (alias === arg) return command.name;
        }
    }
    return '';
};

client.once('ready', () => {
    client?.user?.setActivity(process.env.BOT_STATUS || 'ANDREW', {
        type: 'WATCHING',
        url: 'https://www.twitch.tv/monstercat',
    });
    console.log('UwU ready to Wiki-Chan');
});

client.on('message', (message) => {
    if (!message.content.startsWith(bot.PREFIX)) return;
    const args = message.content.trim().split(/^([^ +]*?)\s* +\s*/);
    if (args.length > 1) args.shift();
    const arg = args.shift()?.substr(1);
    const command = checkCommand(bot, arg);

    switch (command) {
        case `shitpost`:
            message.delete();
            fetchWikiLink((link) => {
                message.channel.send(link).then((msg) => {
                    msg.delete({ timeout: 5000 });
                });
            });
    }
});

client.login(process.env.BOT_TOKEN);
