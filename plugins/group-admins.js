const handler = async (m, { conn, command }) => {
  if (!m.mentionedJid[0] &&!m.quoted) {
    let texto = `🤍 *MANUAL DULCE* 🤍

*Uso:*
.${command} @user → Para ${command === 'promote' || command === 'promover' || command === 'daradmin'? 'promover' : 'degradar'}
.${command} → Responde al mensaje del user

> *Solo admins pueden usarlo* 🌸`
    return m.reply(texto, m.chat)
  }

  let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
  let action = command === 'promote' || command === 'promover' || command === 'daradmin'? 'promote' : 'demote'

  let msgAccion = action === 'promote'
  ? `🤍 *ASCENSO DULCE* 🤍

╭─「 *CORONACION* 」─╮
│ *𝐔𝐒𝐔𝐀𝐑𝐈𝐎* : @${user.split('@')[0]}
│ *𝐄𝐒𝐓𝐀𝐃𝐎* : ✅ *𝐀𝐇𝐎𝐑𝐀 𝐄𝐒 𝐀𝐃𝐌𝐈𝐍*
│ *𝐏𝐑𝐎𝐌𝐎𝐕𝐈𝐃𝐎 𝐏𝐎𝐑* : @${m.sender.split('@')[0]}
╰─────────────

├─「 *NUEVOS PODERES* 」─
│ ✨ Expulsar y Promover
│ ✨ Editar info del grupo
│ ✨ Cambiar ajustes
│ ✨ Mandar anuncios
╰─────────────

> *Con grandes poderes vienen grandes dulzuras* 🌸`
    : `🤍 *DESCENSO DULCE* 🤍

╭─「 *DEGRADACION* 」─╮
│ *𝐔𝐒𝐔𝐀𝐑𝐈𝐎* : @${user.split('@')[0]}
│ *𝐄𝐒𝐓𝐀𝐃𝐎* : ❌ *𝐘𝐀 𝐍𝐎 𝐄𝐒 𝐀𝐃𝐌𝐈𝐍*
│ *𝐃𝐄𝐆𝐑𝐀𝐃𝐀𝐃𝐎 𝐏𝐎𝐑* : @${m.sender.split('@')[0]}
╰─────────────

├─「 *PODERES REMOVIDOS* 」─
│ 🚫 Expulsar y Promover
│ 🚫 Editar info del grupo
│ 🚫 Cambiar ajustes
│ 🚫 Mandar anuncios
╰─────────────

> *Todo poder vuelve a su origen* 🌸`

  await m.react(action === 'promote'? '👑' : '📉')
  await conn.groupParticipantsUpdate(m.chat, [user], action)
  m.reply(msgAccion, m.chat, { mentions: [user, m.sender] })
}

handler.help = ['promote @user', 'demote @user']
handler.tags = ['grupos']
handler.command = /^(promote|promover|daradmin|demote|degradar|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler