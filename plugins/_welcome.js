import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin &&!isOwner) return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*

꒰🍧꒱ Solo admins pueden usar este comando preciosa`, m)
  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  if (/on/i.test(args[0])) {
    chat.bienvenida = true
    await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐁 𝐈 𝐄 𝐍 𝐕 𝐄 𝐍 𝐈 𝐃 𝐀_*

╭───ESTADO ꒰🟢꒱────╮
‧˚꒰🌼୭ Activada con audios 💅
╰─────── ݁ ˖Ი𐑼⋆────╯`, m)
  } else if (/off/i.test(args[0])) {
    chat.bienvenida = false
    await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐁 𝐈 𝐄 𝐍 𝐕 𝐄 𝐍 𝐈 𝐃 𝐀_*

╭───ESTADO ꒰🔴꒱────╮
‧˚꒰🍧꒱ Desactivada
╰─────── ݁ ˖Ი𐑼⋆────╯`, m)
  } else {
    await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐁 𝐈 𝐄 𝐍 𝐕 𝐄 𝐍 𝐈 𝐃 𝐀_*

╭───USO ꒰🩰꒱────╮
꒰🍨꒱ ${m.prefix}bienvenida on/off
╰─────── ݁ ˖Ი𐑼⋆────╯`, m)
  }
}

handler.help = ['bienvenida <on/off>']
handler.tags = ['config']
handler.command = /^(bienvenida|welcome|bye)$/i
handler.group = true
handler.admin = true

handler.before = async function (m, { conn, groupMetadata }) {
  if (!m.messageStubType ||!m.isGroup) return!0
  const chat = global.db?.data?.chats?.[m.chat]
  if (!chat ||!chat.bienvenida) return!0

  const userJid = m.messageStubParameters?.[0] || m.participant
  if (!userJid) return!0

  const DEFAULT_IMG = 'https://files.evogb.win/n4InsB.jpg' // TU FOTO DOLLIE
  let imgBuffer = null

  // PASO 1: Intentar obtener foto del usuario
  try {
    let userPP = await conn.profilePictureUrl(userJid, 'image')
    let res = await fetch(userPP)
    imgBuffer = await res.buffer()
  } catch {
    // PASO 2: Si falla, usar tu foto dollie default
    try {
      let res = await fetch(DEFAULT_IMG)
      imgBuffer = await res.buffer()
    } catch {
      imgBuffer = null
    }
  }

  const userTag = `@${userJid.split('@')[0]}`
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'Sin descripción'
  const membersCount = groupMetadata.participants.length

  let txt = '', audio = null

  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_PARTICIPANT_ADD:
      audio = chat.audiowelcome
      txt = chat.customWelcome? chat.customWelcome.replace(/@user/gi, userTag).replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc) :
`‧˚꒰👛୭ *_𝐍 𝐔 𝐄 𝐕 𝐀 𝐃 𝐎 𝐋 𝐋 𝐈 𝐄_*

╭───WELCOME ꒰💖꒱────╮
‧˚꒰👧🏻୭ ${userTag} llegó a ${groupName} 💅
‧˚꒰🌼୭ Somos: ${membersCount} dollies ✨
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Bienvenida preciosa 👛`
      break

    case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
      audio = chat.audiobye
      txt = chat.customBye? chat.customBye.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
`‧˚꒰👛୭ *_𝐒 𝐄 𝐅 𝐔 𝐄_*

╭───BYE ꒰🥺꒱────╮
‧˚꒰🍧୭ ${userTag} salió de ${groupName}
‧˚꒰🌼୭ Quedamos: ${membersCount}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Se nos fue una dollie 💔`
      break

    case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
      audio = chat.audiokick
      txt = chat.customKick? chat.customKick.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
`‧˚꒰👛୭ *_𝐄 𝐗 𝐏 𝐔 𝐋 𝐒 𝐀 𝐃 𝐀_*

╭───KICK ꒰😢꒱────╮
‧˚꒰🍧୭ ${userTag} fue removida de ${groupName}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🌼꒱ Bye bye preciosa 👋`
      break
  }

  if (txt) {
    // PASO 3: Mandar SIEMPRE con imagen si se pudo descargar
    if (imgBuffer) {
      await conn.sendMessage(m.chat, { image: imgBuffer, caption: txt, mentions: [userJid] })
    } else {
      await conn.sendMessage(m.chat, { text: txt, mentions: [userJid] })
    }

    if (audio) {
      if (Buffer.isBuffer(audio)) {
        await conn.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg', ptt: false })
      } else if (typeof audio === 'string' && audio.startsWith('http')) {
        await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg', ptt: false })
      }
    }
  }
  return!0
}

export default handler