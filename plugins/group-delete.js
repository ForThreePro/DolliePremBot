let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ELIMINAR MENSAJE* 」─╮
│ 🪄 *Uso:* Responde al mensaje
│ 🪞 *Ejemplo:* ${usedPrefix + command}
╰─────────────
> *Debes responder a un mensaje para borrarlo*`, m)

try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
await m.react('🗑️')
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
 } catch {
await m.react('🗑️')
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}
}

handler.help = ['del @msg']
handler.tags = ['grupos']
handler.command = /^del(ete)?$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler