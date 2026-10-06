let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let mentionedJid = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    if (!mentionedJid) return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐊 𝐈 𝐂 𝐊_*

╭───USO ꒰👢꒱────╮
꒰🍨꒱ ${usedPrefix + command} @user
꒰🍨꒱ ${usedPrefix + command} + responder al mensaje
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Solo admins preciosa`, m)

    try {
        let groupMetadata = await conn.groupMetadata(m.chat)
        let ownerGroup = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
        let ownerBot = global.owner[0][0] + '@s.whatsapp.net'

        let user = participants.find(p => p.id === mentionedJid)
        let isAdmin = user?.admin

        if (mentionedJid === conn.user.jid) return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ No puedo eliminarme a mí misma`, m)
        if (mentionedJid === ownerGroup) return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ No puedo expulsar al propietario del grupo`, m)
        if (mentionedJid === ownerBot) return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ No puedo expulsar al dueño del bot`, m)
        if (isAdmin) return conn.reply(m.chat, `‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ No puedo expulsar a un administrador`, m)

        await m.react('👢')
        await conn.groupParticipantsUpdate(m.chat, [mentionedJid], 'remove')

        conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐔 𝐒 𝐔 𝐀 𝐑 𝐈 𝐎 𝐄 𝐗 𝐏 𝐔 𝐋 𝐒 𝐀 𝐃 𝐎_*

╭───KICK ꒰👢꒱────╮
‧˚꒰👧🏻୭ Usuario: @${mentionedJid.split('@')[0]}
‧˚꒰🌼୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Ha sido removido del grupo 💌`, m, { mentions: [mentionedJid, m.sender] })
    } catch (e) {
        await m.react('❌')
        conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

꒰🍧꒱ Se ha producido un problema
꒰🌼꒱ ${e.message}`, m)
    }
}

handler.help = ['kick @user']
handler.tags = ['grupos']
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler