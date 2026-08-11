let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let mentionedJid = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    if (!mentionedJid) return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *EXPULSAR USUARIO* 」─╮
│ 🪄 *Uso:* ${usedPrefix + command} @user
│ 🪞 *Uso:* ${usedPrefix + command} + responder
╰─────────────
> *Solo admins pueden usarlo*`, m)

    try {
        let groupMetadata = await conn.groupMetadata(m.chat)
        let ownerGroup = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
        let ownerBot = global.owner[0][0] + '@s.whatsapp.net'

        let user = participants.find(p => p.id === mentionedJid)
        let isAdmin = user?.admin

        if (mentionedJid === conn.user.jid) return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> 🤖 *No puedo eliminarme a mí misma*`, m)
        if (mentionedJid === ownerGroup) return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> 🩸 *No puedo expulsar al propietario del grupo*`, m)
        if (mentionedJid === ownerBot) return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> 🦠 *No puedo expulsar al dueño del bot*`, m)
        if (isAdmin) return conn.reply(m.chat, `𝐃𝐎𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *No puedo expulsar a un administrador*`, m)

        await m.react('👢')
        await conn.groupParticipantsUpdate(m.chat, [mentionedJid], 'remove')

        conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *USUARIO EXPULSADO* 」─╮
│ 👢 *Usuario:* @${mentionedJid.split('@')[0]}
│ 👑 *Por:* @${m.sender.split('@')[0]}
╰─────────────
> *Ha sido removido del grupo* 💌`, m, { mentions: [mentionedJid, m.sender] })
    } catch (e) {
        await m.react('❌')
        conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ❌ *Se ha producido un problema*\n> *Error:* ${e.message}`, m)
    }
}

handler.help = ['kick @user']
handler.tags = ['grupos']
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler