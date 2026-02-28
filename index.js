require("dotenv").config();
const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`✅ 로그인됨: ${client.user.tag}`);

  const channel = await client.channels.fetch(process.env.CHANNEL_ID);

  const button = new ButtonBuilder()
    .setCustomId("check_balance")
    .setLabel("잔액확인하기")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  await channel.send({
    content: "💰 **나의 잔액확인하기**",
    components: [row]
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "check_balance") {
    await interaction.reply({
      content: `💰 ${interaction.user} 님의 잔액은 0원입니다.`,
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
