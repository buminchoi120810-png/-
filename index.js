require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`✅ 로그인됨: ${client.user.tag}`);

  const channel = await client.channels.fetch(process.env.CHANNEL_ID);

  // 📦 임베드 생성
  const embed = new EmbedBuilder()
    .setTitle("💰 나의 잔액확인하기")
    .setDescription("아래 버튼을 눌러 잔액을 확인하세요.")
    .setColor(0x2b2d31);

  const button = new ButtonBuilder()
    .setCustomId("check_balance")
    .setLabel("잔액확인하기")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  await channel.send({
    embeds: [embed],
    components: [row]
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "check_balance") {
    const balanceEmbed = new EmbedBuilder()
      .setDescription(`💰 ${interaction.user} 님의 잔액은 **0원** 입니다.`)
      .setColor(0x5865f2);

    await interaction.reply({
      embeds: [balanceEmbed],
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
