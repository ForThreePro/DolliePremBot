let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐃 𝐄 𝐋 𝐄 𝐓 𝐄_*

╭───USO ꒰🗑️꒱────╮
꒰🍨꒱ Responde al mensaje que quieres borrar
꒰🍨꒱ Ejemplo: ${usedPrefix + command}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Debes responder a un mensaje para borrarlo preciosa`, m)

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