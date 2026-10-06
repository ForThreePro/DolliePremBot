let mutedUsers = new Set()

let handler = async (m, { conn, command, participants }) => {
    let mentionedJid = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false
    if (!mentionedJid) return m.reply(
`‧˚꒰👛୭ *_𝐌 𝐔 𝐓 𝐄_*

╭───USO ꒰🔇꒱────╮
꒰🍨꒱ ${usedPrefix || '.'}mute @user
꒰🍨꒱ ${usedPrefix || '.'}unmute @user
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Etiqueta a alguien o responde a un mensaje preciosa`)

    let isUserAdmin = participants.find(p => p.id === mentionedJid)?.admin
    if (isUserAdmin) return m.reply(`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ No puedes mutear a un administrador`)
    if (mentionedJid === conn.user.jid) return m.reply(`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ No puedo mutearme a mí misma`)

    if (command === "mute") {
        if (mutedUsers.has(mentionedJid)) return m.reply(`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Este usuario ya está muteado`)
        mutedUsers.add(mentionedJid)
        await m.react('🔇')
        conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐔 𝐒 𝐔 𝐀 𝐑 𝐈 𝐎 𝐌 𝐔 𝐓 𝐄 𝐀 𝐃 𝐎_*

╭───MUTE ꒰🔇꒱────╮
‧˚꒰👧🏻୭ Usuario: @${mentionedJid.split('@')[0]}
‧˚꒰🌼୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Sus mensajes serán eliminados 💌`, m, { mentions: [mentionedJid, m.sender] })
    } else if (command === "unmute") {
        if (!mutedUsers.has(mentionedJid)) return m.reply(`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*\n\n꒰🍧꒱ Este usuario no está muteado`)
        mutedUsers.delete(mentionedJid)
        await m.react('🔊')
        conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐔 𝐒 𝐔 𝐀 𝐑 𝐈 𝐎 𝐃 𝐄 𝐒 𝐌 𝐔 𝐓 𝐄 𝐀 𝐃 𝐎_*

╭───UNMUTE ꒰🔊꒱────╮
‧˚꒰👧🏻୭ Usuario: @${mentionedJid.split('@')[0]}
‧˚꒰🌼୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Ya puede volver a escribir 💅`, m, { mentions: [mentionedJid, m.sender] })
    }
}

handler.before = async (m, { conn }) => {
    if (mutedUsers.has(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key })
        } catch (e) {
            console.error(e)
        }
    }
}

handler.help = ['mute @user', 'unmute @user']
handler.tags = ['grupos']
handler.command = /^(mute|unmute)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler