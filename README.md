# 🤣 DadJokes Discord Bot

A fun Discord bot that serves dad jokes using the [icanhazdadjoke.com](https://icanhazdadjoke.com) API. Perfect for adding some humor to your Discord server!

## ✨ Features

- 🎲 **Random Jokes** - Get a random dad joke instantly
- 🔍 **Search Jokes** - Search for jokes by keyword
- 🆔 **Specific Jokes** - Get a joke by its ID
- 📱 **Slash Commands** - Modern Discord slash command support
- 💬 **Message Commands** - Simple text-based commands
- 🎨 **Rich Embeds** - Beautiful formatted joke displays
- ⚡ **Fast Response** - Quick API responses

## 🚀 Commands

### Slash Commands
- `/joke` - Get a random dad joke
- `/jokeid <id>` - Get a specific joke by ID
- `/search <term> [limit]` - Search for jokes (1-10 results)
- `/help` - Show bot information and commands

### Message Commands
- `!joke` - Get a random dad joke
- `dad joke` - Get a random dad joke
- `tell me a joke` - Get a random dad joke

## 📋 Prerequisites

Before running this bot, make sure you have:

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Discord account and server
- A Discord bot token

## 🛠️ Installation

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd dadjokes-discord-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## 🤖 Setting Up Your Discord Bot

### Creating a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name (e.g., "DadJokes")
3. Go to the "Bot" section
4. Click "Add Bot"
5. Copy the bot token and add it to your `.env` file

### Bot Permissions

Your bot needs the following permissions:
- `Send Messages`
- `Use Slash Commands`
- `Embed Links`
- `Read Message History`

### Inviting the Bot

1. Go to the "OAuth2" > "URL Generator" section
2. Select scopes: `bot` and `applications.commands`
3. Select the permissions listed above
4. Use the generated URL to invite the bot to your server

## 📁 Project Structure

```
dadjokes-discord-bot/
├── index.js          # Main bot file
├── package.json      # Project configuration
├── README.md         # This file
├── .env              # Environment variables (create this)
├── .gitignore        # Git ignore file
└── node_modules/     # Dependencies (auto-generated)
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes |

### Customization

You can customize the bot by modifying these values in `index.js`:

- `USER_AGENT` - Update with your project information
- Bot status/activity message
- Embed colors and styling
- Command descriptions

## 📊 API Information

This bot uses the [icanhazdadjoke.com](https://icanhazdadjoke.com) API:

- **Base URL**: `https://icanhazdadjoke.com`
- **Rate Limiting**: No authentication required, be respectful with requests
- **User Agent**: The bot sets a custom User-Agent header as requested by the API

### API Endpoints Used

- `GET /` - Random joke
- `GET /j/{joke_id}` - Specific joke
- `GET /search` - Search jokes

## 🐛 Troubleshooting

### Common Issues

1. **Bot doesn't respond**
   - Check if the bot token is correct
   - Ensure the bot has proper permissions
   - Check console for error messages

2. **Slash commands not appearing**
   - Wait a few minutes for Discord to sync commands
   - Try kicking and re-inviting the bot
   - Ensure bot has `applications.commands` scope

3. **"Couldn't fetch joke" errors**
   - Check your internet connection
   - Verify the API is accessible from your network
   - Check console logs for detailed error messages

### Error Messages

The bot includes comprehensive error handling and will show helpful messages when things go wrong.

## 📝 Development

### Scripts

- `npm start` - Run the bot
- `npm run dev` - Run with auto-restart (requires nodemon)

### Dependencies

- **discord.js**: Discord API wrapper
- **axios**: HTTP client for API requests
- **dotenv**: Environment variable management

## 🤝 Contributing

Feel free to contribute to this project! Here are some ways you can help:

1. Report bugs
2. Suggest new features
3. Submit pull requests
4. Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [icanhazdadjoke.com](https://icanhazdadjoke.com) for the amazing dad jokes API
- [discord.js](https://discord.js.org/) for the Discord API wrapper
- The Discord community for inspiration and support

## 📞 Support

If you need help or have questions:

1. Check the troubleshooting section above
2. Look at the console logs for error messages
3. Create an issue on GitHub
4. Join the Discord.js community for general Discord bot help

---

**Made with ❤️ and lots of dad jokes!** 🤣
