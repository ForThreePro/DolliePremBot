let handler = async (m, { conn, isOwner, isAdmin, isROwner, command }) => {
  if (!m.isGroup) return
  let chat = global.db.data.chats[m.chat]
  let type = command.toLowerCase()

  if (!(isAdmin || isOwner || isROwner)) {
    return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ❌ *Solo admins pueden usar este comando*`, m)
  }

  switch (type) {
    case 'banchat': case 'banearchat':
      if (chat.isBanned) return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *Este chat ya se encuentra baneado*`)
      chat.isBanned = true
      await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *CHAT BANEADO* 」─╮
│ 🚫 *Estado:* Bot desactivado
│ 💬 *Nota:* No responderé comandos
│ 👑 *Por:* @${m.sender.split('@')[0]}
╰─────────────
> *Hasta que sea desbloqueado* 🔒`, m, { mentions: [m.sender] })
      break

    case 'unbanchat': case 'desbanearchat':
      if (!chat.isBanned) return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *Este chat no está baneado*`)
      chat.isBanned = false
      await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *CHAT DESBANEADO* 」─╮
│ 🌀 *Estado:* Bot activado
│ ⚡ *Nota:* Comandos disponibles
│ 👑 *Por:* @${m.sender.split('@')[0]}
╰─────────────
> *Pueden usarme con normalidad* 💌`, m, { mentions: [m.sender] })
      break

    default:
      return
  }
}

handler.help = ['banchat', 'unbanchat']
handler.tags = ['grupos']
handler.command = /^(banchat|banearchat|unbanchat|desbanearchat)$/i
handler.admin = true
handler.group = true

export default handler