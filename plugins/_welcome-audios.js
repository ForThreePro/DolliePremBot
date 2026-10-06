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
      return m.reply(
`‧˚꒰👛୭ *_𝐀 𝐔 𝐃 𝐈 𝐎 𝐆𝐔𝐀𝐑𝐃𝐀𝐃𝐎_*

╭───AUDIO ꒰🎵꒱────╮
‧˚꒰🎵୭ Tipo: ${type}
‧˚꒰✅୭ Estado: Guardado correctamente 💅
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Se reproducirá cuando ocurra el evento 💌`)
    }

    // Si manda un link
    if (args[0] && args[0].startsWith('http')) {
      chat[`audio${type}`] = args[0]
      return m.reply(
`‧˚꒰👛୭ *_𝐋 𝐈 𝐍 𝐊 𝐆𝐔𝐀𝐑𝐃𝐀𝐃𝐎_*

╭───AUDIO ꒰🔗꒱────╮
‧˚꒰🎵୭ Tipo: ${type}
‧˚꒰🔗୭ Link: ${args[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Audio de ${type} configurado ✨`)
    }

    return m.reply(
`‧˚꒰👛୭ *_𝐀 𝐔 𝐃 𝐈 𝐎 ${type.toUpperCase()}_*

╭───USO ꒰🩰꒱────╮
꒰🍨꒱ ${usedPrefix}${command} + responder a audio
꒰🍨꒱ ${usedPrefix}${command} <link del audio>
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Guarda un audio para ${type} preciosa 💌`)
  }

  // DEL AUDIO
  if (command.startsWith('delaudio')) {
    if (!chat[`audio${type}`]) {
      return m.reply(
`‧˚꒰👛୭ *_𝐀 𝐔 𝐃 𝐈 𝐎_*

꒰🍧꒱ No hay audio de ${type} configurado`)
    }
    delete chat[`audio${type}`]
    await m.reply(
`‧˚꒰👛୭ *_𝐀 𝐔 𝐃 𝐈 𝐎 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐃𝐎_*

╭───AUDIO ꒰🗑️꒱────╮
‧˚꒰🗑️୭ Tipo: ${type}
‧˚꒰❌୭ Estado: Eliminado
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Ya no se reproducirá ✨`)
  }
}

handler.help = ['audiowelcome', 'audiobye', 'audiokick', 'delaudiowelcome', 'delaudiobye', 'delaudiokick']
handler.tags = ['config']
handler.command = /^(audio(welcome|bye|kick)|delaudio(welcome|bye|kick))$/i
handler.group = true
handler.admin = true

export default handler