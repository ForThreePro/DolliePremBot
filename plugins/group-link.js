let handler = async (m, { conn }) => {
    try {
        await m.react('🔗')
        let link = await conn.groupInviteCode(m.chat)

        let texto =
`‧˚꒰👛୭ *_𝐋 𝐈 𝐍 𝐊  𝐃𝐄𝐋  𝐆 𝐑 𝐔 𝐏 𝐎_*

╭───LINK ꒰🔗꒱────╮
‧˚꒰🌼୭ https://chat.whatsapp.com/${link}
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───NOTAS ꒰⚠️꒱────╮
‧˚꒰🍧୭ Solo admins pueden resetear el link
‧˚꒰🍧୭ No lo compartas con desconocidos
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Cuida tu grupo preciosa 💌`

        await conn.reply(m.chat, texto, m)
    } catch (e) {
        await m.react('❌')
        m.reply(`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*\n\n꒰🍧꒱ No pude obtener el link ¿Soy admin?`)
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup', 'grouplink']
handler.group = true
handler.admin = true

export default handler