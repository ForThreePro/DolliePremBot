let handler = async (m, { conn }) => {
    try {
        await m.react('🔗')
        let link = await conn.groupInviteCode(m.chat)

        let texto = `𝐃𝐎𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *LINK DEL GRUPO* 」─╮
│ 🔗 *Invitación:*
│ https://chat.whatsapp.com/${link}
╰─────────────

├─「 *NOTAS IMPORTANTES* 」─
│ ⚡ *Solo admins pueden resetear el link*
│ ⚡ *No lo compartas con desconocidos*
╰─────────────
> *Cuida tu grupo* 💌`

        await conn.reply(m.chat, texto, m)
    } catch (e) {
        await m.react('❌')
        m.reply(`𝐃𝐎𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ❌ *Error:* No pude obtener el link. ¿Soy admin?`)
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup', 'grouplink']
handler.group = true
handler.admin = true

export default handler