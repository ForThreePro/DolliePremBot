let handler = async (m, { conn, args, command, usedPrefix }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  let type = command.replace('set', '').replace('del', '')
  let text = args.join(' ')

  // SET
  if (command.startsWith('set')) {
    if (!text) return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *SET ${type.toUpperCase()}* 」─╮
│ 🪄 *Uso:* ${usedPrefix}${command} <texto>
╰─────────────

├─「 *VARIABLES* 」─
│ 👤 *@user* = Menciona al usuario
│ 👥 *@group* = Nombre del grupo  
│ 📝 *@desc* = Descripción del grupo
╰─────────────
> *Ejemplo:* ${usedPrefix}${command} Hola @user a @group 💌`)

    chat[`custom${type.charAt(0).toUpperCase() + type.slice(1)}`] = text
    await m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *MENSAJE GUARDADO* 」─╮
│ ✅ *Tipo:* ${type}
│ 💌 *Estado:* Personalizado
╰─────────────

├─「 *VISTA PREVIA* 」─
│ ${text}
╰─────────────
> *Se usará cuando ocurra el evento* ✨`)
  }

  // DEL
  if (command.startsWith('del')) {
    if (!chat[`custom${type.charAt(0).toUpperCase() + type.slice(1)}`]) {
      return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *No hay un ${type} personalizado configurado*`)
    }
    delete chat[`custom${type.charAt(0).toUpperCase() + type.slice(1)}`]
    await m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *MENSAJE ELIMINADO* 」─╮
│ 🗑️ *Tipo:* ${type}
│ ❌ *Estado:* Eliminado
╰─────────────
> *Volvió al mensaje por defecto* 💌`)
  }
}

handler.help = ['setwelcome', 'setbye', 'setkick', 'delwelcome', 'delbye', 'delkick']
handler.tags = ['config']
handler.command = /^(setwelcome|setbye|setkick|delwelcome|delbye|delkick)$/i
handler.group = true
handler.admin = true

export default handler