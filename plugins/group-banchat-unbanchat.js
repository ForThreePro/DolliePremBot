let handler = async (m, { conn, isOwner, isAdmin, isROwner, command }) => {
  if (!m.isGroup) return
  let chat = global.db.data.chats[m.chat]
  let type = command.toLowerCase()

  if (!(isAdmin || isOwner || isROwner)) {
    return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Solo admins pueden usar este comando preciosa`, m)
  }

  switch (type) {
    case 'banchat': case 'banearchat':
      if (chat.isBanned) return m.reply(`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Este chat ya está baneado`)
      chat.isBanned = true
      await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐂 𝐇 𝐀 𝐓 𝐁 𝐀 𝐍_*

╭───ESTADO ꒰🚫꒱────╮
‧˚꒰🍧୭ Estado: Bot desactivado
‧˚꒰🍧୭ Nota: No responderé comandos
‧˚꒰👧🏻୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Hasta que sea desbloqueado 🔒`, m, { mentions: [m.sender] })
      break

    case 'unbanchat': case 'desbanearchat':
      if (!chat.isBanned) return m.reply(`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Este chat no está baneado`)
      chat.isBanned = false
      await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐂 𝐇 𝐀 𝐓 𝐔 𝐍 𝐁 𝐀 𝐍_*

╭───ESTADO ꒰🌀꒱────╮
‧˚꒰🌼୭ Estado: Bot activado
‧˚꒰🌼୭ Nota: Comandos disponibles
‧˚꒰👧🏻୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Pueden usarme con normalidad 💌`, m, { mentions: [m.sender] })
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