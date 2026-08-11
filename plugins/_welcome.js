import { WAMessageStubType } from '@whiskeysockets/baileys'

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin &&!isOwner) return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ❌ *Solo admins pueden usar este comando*`, m)
  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  if (/on/i.test(args[0])) {
    chat.bienvenida = true
    await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *BIENVENIDA* 」─╮
│ 🟢 *Estado:* Activada
│ 🎵 *Audios:* Activados
╰─────────────
> *Ahora saludaré a los nuevos* 💌`, m)
  } else if (/off/i.test(args[0])) {
    chat.bienvenida = false
    await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *BIENVENIDA* 」─╮
│ 🔴 *Estado:* Desactivada
╰─────────────
> *No enviaré mensajes de entrada/salida* ✨`, m)
  } else {
    await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *BIENVENIDA* 」─╮
│ 🪄 *Uso:* ${m.prefix}bienvenida on
│ 🪄 *Uso:* ${m.prefix}bienvenida off
╰─────────────
> *Activa o desactiva los mensajes* 💌`, m)
  }
}

handler.help = ['bienvenida <on/off>']
handler.tags = ['config']
handler.command = /^(bienvenida|welcome|bye)$/i
handler.group = true
handler.admin = true

handler.before = async function (m, { conn, groupMetadata }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return!0
    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat ||!chat.bienvenida) return!0

    const userJid = m.messageStubParameters?.[0] || m.participant
    if (!userJid) return!0

    // 1. PRIMERO FOTO DEL USUARIO
    // 2. SI NO TIENE, USA LINK
    let pp
    try {
      pp = await conn.profilePictureUrl(userJid, 'image')
    } catch {
      pp = 'https://files.evogb.win/VTW5WO.jpg' // TU LINK DE FALLBACK
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
`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *NUEVO MIEMBRO* 」─╮
│ ✨ *${userTag}* se unió
│ 👥 *Grupo:* ${groupName}
│ 📊 *Miembro N°:* ${membersCount}
╰─────────────
> *Bienvenida al grupo* 💌`
        break

      case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
        audio = chat.audiobye
        txt = chat.customBye? chat.customBye.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *SE FUE* 」─╮
│ 👋 *${userTag}* salió
│ 👥 *Grupo:* ${groupName}
│ 📉 *Quedamos:* ${membersCount}
╰─────────────
> *Esperamos verte pronto* ✨`
        break

      case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
        audio = chat.audiokick
        txt = chat.customKick? chat.customKick.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *EXPULSADO* 」─╮
│ ⚠️ *${userTag}* fue eliminado
│ 👥 *Grupo:* ${groupName}
╰─────────────
> *Decisión de la administración* 💌`
        break
    }

    if (txt) {
      await conn.sendMessage(m.chat, {
        image: { url: pp }, // ya siempre es url
        caption: txt,
        mentions: [userJid]
      })

      if (audio) {
        if (Buffer.isBuffer(audio)) {
          await conn.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
        } else if (typeof audio === 'string' && audio.startsWith('http')) {
          await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
        }
      }
    }
  } catch (e) {
    console.error("Error en Bienvenida Audio:", e)
  }
  return!0
}

export default handler