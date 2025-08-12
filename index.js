const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const axios = require("axios");
require("dotenv").config();

// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Dad Jokes API configuration
const DAD_JOKES_API = "https://icanhazdadjoke.com";
const USER_AGENT =
  "DadJokes Discord Bot (https://github.com/pratyush0898/DadJokes-discord-bot.git)";

// Fetch a random dad joke
async function getRandomJoke() {
  try {
    const response = await axios.get(DAD_JOKES_API, {
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching joke:", error);
    return null;
  }
}

// Fetch a specific joke by ID
async function getJokeById(jokeId) {
  try {
    const response = await axios.get(`${DAD_JOKES_API}/j/${jokeId}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching specific joke:", error);
    return null;
  }
}

// Search for jokes
async function searchJokes(term, limit = 10) {
  try {
    const response = await axios.get(`${DAD_JOKES_API}/search`, {
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
      params: {
        term: term,
        limit: Math.min(limit, 30), // API max is 30
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching jokes:", error);
    return null;
  }
}

// Create an embed for jokes
function createJokeEmbed(jokeData, searchTerm = null) {
  const embed = new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("🤣 Dad Joke")
    .setDescription(jokeData.joke)
    .setFooter({
      text: `ID: ${jokeData.id} | icanhazdadjoke.com`,
      iconURL: "https://icanhazdadjoke.com/static/smile.svg",
    })
    .setTimestamp();

  if (searchTerm) {
    embed.setTitle(`🔍 Dad Joke (Search: "${searchTerm}")`);
  }

  return embed;
}

// Bot ready event
client.once("ready", async () => {
  console.log(`✅ ${client.user.tag} is online and ready!`);

  // Set bot status
  client.user.setActivity("dad jokes | /joke", { type: "LISTENING" });

  // Register slash commands
  const commands = [
    new SlashCommandBuilder()
      .setName("joke")
      .setDescription("Get a random dad joke"),

    new SlashCommandBuilder()
      .setName("jokeid")
      .setDescription("Get a specific joke by ID")
      .addStringOption((option) =>
        option.setName("id").setDescription("The joke ID").setRequired(true)
      ),

    new SlashCommandBuilder()
      .setName("search")
      .setDescription("Search for dad jokes")
      .addStringOption((option) =>
        option.setName("term").setDescription("Search term").setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("limit")
          .setDescription("Number of results (1-10)")
          .setMinValue(1)
          .setMaxValue(10)
      ),

    new SlashCommandBuilder()
      .setName("help")
      .setDescription("Show bot commands and information"),
  ];

  try {
    console.log("🔄 Registering slash commands...");
    await client.application.commands.set(commands);
    console.log("✅ Slash commands registered successfully!");
  } catch (error) {
    console.error("❌ Error registering slash commands:", error);
  }
});

// Handle slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "joke":
        await interaction.deferReply();
        const randomJoke = await getRandomJoke();

        if (randomJoke) {
          const embed = createJokeEmbed(randomJoke);
          await interaction.editReply({ embeds: [embed] });
        } else {
          await interaction.editReply(
            "❌ Sorry, I couldn't fetch a joke right now. Try again later!"
          );
        }
        break;

      case "jokeid":
        await interaction.deferReply();
        const jokeId = interaction.options.getString("id");
        const specificJoke = await getJokeById(jokeId);

        if (specificJoke) {
          const embed = createJokeEmbed(specificJoke);
          await interaction.editReply({ embeds: [embed] });
        } else {
          await interaction.editReply(
            `❌ Couldn't find a joke with ID: \`${jokeId}\`. Please check the ID and try again.`
          );
        }
        break;

      case "search":
        await interaction.deferReply();
        const searchTerm = interaction.options.getString("term");
        const limit = interaction.options.getInteger("limit") || 5;
        const searchResults = await searchJokes(searchTerm, limit);

        if (searchResults && searchResults.results.length > 0) {
          const jokes = searchResults.results.slice(0, limit);
          const embed = new EmbedBuilder()
            .setColor("#FFD700")
            .setTitle(`🔍 Dad Jokes Search: "${searchTerm}"`)
            .setDescription(
              `Found ${searchResults.total_jokes} joke(s). Showing ${jokes.length}:`
            )
            .setFooter({
              text: `Page ${searchResults.current_page} of ${searchResults.total_pages} | icanhazdadjoke.com`,
            })
            .setTimestamp();

          jokes.forEach((joke, index) => {
            embed.addFields({
              name: `${index + 1}. ID: ${joke.id}`,
              value: joke.joke,
              inline: false,
            });
          });

          await interaction.editReply({ embeds: [embed] });
        } else {
          await interaction.editReply(
            `❌ No jokes found for "${searchTerm}". Try a different search term!`
          );
        }
        break;

      case "help":
        const helpEmbed = new EmbedBuilder()
          .setColor("#FFD700")
          .setTitle("🤖 DadJokes Bot Help")
          .setDescription(
            "A Discord bot that brings you the best dad jokes from icanhazdadjoke.com!"
          )
          .addFields(
            { name: "📝 Commands", value: "\u200B", inline: false },
            { name: "/joke", value: "Get a random dad joke", inline: true },
            {
              name: "/jokeid <id>",
              value: "Get a specific joke by ID",
              inline: true,
            },
            {
              name: "/search <term> [limit]",
              value: "Search for jokes (1-10 results)",
              inline: true,
            },
            { name: "/help", value: "Show this help message", inline: true },
            {
              name: "🔗 Links",
              value: "[icanhazdadjoke.com](https://icanhazdadjoke.com)",
              inline: false,
            }
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter({ text: "Made with ❤️ using icanhazdadjoke.com API" })
          .setTimestamp();

        await interaction.reply({ embeds: [helpEmbed] });
        break;
    }
  } catch (error) {
    console.error("Error handling interaction:", error);
    const errorMessage = "❌ An error occurred while processing your request.";

    if (interaction.deferred) {
      await interaction.editReply(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Handle message commands (optional - for backwards compatibility)
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // Simple text commands
  if (
    content === "!joke" ||
    content === "dad joke" ||
    content.includes("tell me a joke")
  ) {
    getRandomJoke().then((joke) => {
      if (joke) {
        const embed = createJokeEmbed(joke);
        message.reply({ embeds: [embed] });
      } else {
        message.reply("❌ Sorry, I couldn't fetch a joke right now!");
      }
    });
  }
});

// Error handling
client.on("error", (error) => {
  console.error("Discord client error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

// Login to Discord
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("❌ DISCORD_TOKEN is not set in the environment variables!");
  process.exit(1);
}

client.login(token);
