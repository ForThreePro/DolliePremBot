let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(args[0])
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()

  if (!args[0]) return m.reply(
`‧˚꒰👛୭ *_𝐂 𝐎 𝐍 𝐅 𝐈 𝐆_*

╭───USO ꒰⚙️꒱────╮
꒰🍨꒱ ${usedPrefix + command} on
꒰🍨꒱ ${usedPrefix + command} off
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🌼꒱ Ejemplo: ${usedPrefix + command} on`)

  let fail = false
  switch (type) {
    case 'subbots': case 'serbot':
      if (!isROwner) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo Owner preciosa`, m); fail = true; break }
      bot.jadibotmd = isEnable
      break
    case 'antispam':
      if (!isOwner) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo Owner`, m); fail = true; break }
      bot.antiSpam = isEnable
      break
    case 'antilink':
      if (m.isGroup &&!isAdmin) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo admins`, m); fail = true; break }
      chat.antiLink = isEnable
      break
    case 'antibot':
      if (m.isGroup &&!isAdmin) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo admins`, m); fail = true; break }
      chat.antiBot = isEnable
      break
    case 'modoadmin':
      if (m.isGroup &&!isAdmin) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo admins`, m); fail = true; break }
      chat.modoadmin = isEnable
      break
    case 'nsfw': case 'antinopor':
      if (m.isGroup &&!isAdmin) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo admins`, m); fail = true; break }
      chat.nsfw = isEnable
      break
    case 'audios':
      chat.audios = isEnable
      break
    case 'welcome': case 'bienvenida':
      if (m.isGroup &&!isAdmin) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo admins`, m); fail = true; break }
      chat.bienvenida = isEnable
      break
    case 'autoread': case 'autoleer':
      if (!isROwner) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo Owner`, m); fail = true; break }
      global.opts['autoread'] = isEnable
      break
    case 'antiprivado':
      if (!isOwner) { return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo Owner`, m); fail = true; break }
      bot.antiPrivate = isEnable
      break
    default:
      return
  }

  if (fail) return

  let catalogoImg = { url: 'https://files.evogb.win/n4InsB.jpg' }

  let estadoTexto = isEnable? 'Activado' : 'Desactivado'
  let estadoEmoji = isEnable? '🟢' : '🔴'

  let statusTxt =
`‧˚꒰👛୭ *_𝐄 𝐒 𝐓 𝐀 𝐃 𝐎 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐃𝐎_*

╭───CONFIG ꒰${estadoEmoji}꒱────╮
‧˚꒰⚙️୭ Función: ${type}
‧˚꒰📊୭ Estado: ${estadoTexto} ${estadoEmoji}
‧˚꒰👧🏻୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Cambio aplicado correctamente 💌`

  await conn.sendMessage(m.chat, {
    image: catalogoImg,
    caption: statusTxt,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['antilink', 'antibot', 'modoadmin', 'subbots', 'nsfw', 'audios', 'antiprivado', 'antispam', 'autoread', 'welcome'].map(v => v + ' on/off')
handler.tags = ['config']
handler.command = ['subbots', 'serbot', 'antispam', 'antilink', 'antibot', 'modoadmin', 'nsfw', 'antinopor', 'audios', 'autoleer', 'autoread', 'antiprivado', 'welcome', 'bienvenida']

export default handler