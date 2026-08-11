let handler = async (m, { conn, args, command, usedPrefix }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  // Detectar tipo: welcome / bye / kick
  let type = command.replace('audiowelcome','').replace('audiobye','').replace('audiokick','')
                .replace('delaudiowelcome','').replace('delaudiobye','').replace('delaudiokick','')

  if (command.includes('welcome')) type = 'welcome'
  if (command.includes('bye')) type = 'bye'
  if (command.includes('kick')) type = 'kick'

  // SET AUDIO
  if (command.startsWith('audio')) {
    // Si responde a un audio o manda audio
    if (mime && /audio/.test(mime)) {
      let buffer = await q.download()
      chat[`audio${type}`] = buffer
      return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *AUDIO GUARDADO* 」─╮
│ 🎵 *Tipo:* ${type}
│ ✅ *Estado:* Guardado correctamente
╰─────────────
> *Se reproducirá cuando ocurra el evento* 💌`)
    }

    // Si manda un link
    if (args[0] && args[0].startsWith('http')) {
      chat[`audio${type}`] = args[0]
      return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *LINK GUARDADO* 」─╮
│ 🎵 *Tipo:* ${type}
│ 🔗 *Link:* ${args[0]}
╰─────────────
> *Audio de ${type} configurado* ✨`)
    }

    return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *AUDIO ${type.toUpperCase()}* 」─╮
│ 🪄 *Uso:* ${usedPrefix}${command} + [responder a audio]
│ 🪄 *Uso:* ${usedPrefix}${command} <link del audio>
╰─────────────
> *Guarda un audio para ${type}* 💌`)
  }

  // DEL AUDIO
  if (command.startsWith('delaudio')) {
    if (!chat[`audio${type}`]) {
      return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *No hay un audio de ${type} configurado*`)
    }
    delete chat[`audio${type}`]
    await m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *AUDIO ELIMINADO* 」─╮
│ 🗑️ *Tipo:* ${type}
│ ❌ *Estado:* Eliminado
╰─────────────
> *Ya no se reproducirá audio* ✨`)
  }
}

handler.help = ['audiowelcome', 'audiobye', 'audiokick', 'delaudiowelcome', 'delaudiobye', 'delaudiokick']
handler.tags = ['config']
handler.command = /^(audio(welcome|bye|kick)|delaudio(welcome|bye|kick))$/i
handler.group = true
handler.admin = true

export default handler