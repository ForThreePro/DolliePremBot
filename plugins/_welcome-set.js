let handler = async (m, { conn, args, command, usedPrefix }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  let type = command.replace('set', '').replace('del', '')
  let text = args.join(' ')

  // SET
  if (command.startsWith('set')) {
    if (!text) return m.reply(
`‧˚꒰👛୭ *_𝐒 𝐄 𝐓 ${type.toUpperCase()}_*

╭───USO ꒰🩰꒱────╮
꒰🍨꒱ ${usedPrefix}${command} <texto>
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───VARIABLES ꒰🌼꒱────╮
‧˚꒰👧🏻୭ @user = Menciona al usuario
‧˚꒰👥୭ @group = Nombre del grupo
‧˚꒰📝୭ @desc = Descripción del grupo
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Ejemplo: ${usedPrefix}${command} Hola @user a @group 💌`)

    chat[`custom${type.charAt(0).toUpperCase() + type.slice(1)}`] = text
    await m.reply(
`‧˚꒰👛୭ *_𝐌 𝐄 𝐍 𝐒 𝐀 𝐉 𝐄 𝐆𝐔𝐀𝐑𝐃𝐀𝐃𝐎_*

╭───INFO ꒰✅꒱────╮
‧˚꒰✅୭ Tipo: ${type}
‧˚꒰💌୭ Estado: Personalizado
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───VISTA PREVIA ꒰🍨꒱────╮
꒰🌼꒱ ${text}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Se usará cuando ocurra el evento ✨`)
  }

  // DEL
  if (command.startsWith('del')) {
    if (!chat[`custom${type.charAt(0).toUpperCase() + type.slice(1)}`]) {
      return m.reply(
`‧˚꒰👛୭ *_𝐀 𝐕 𝐈 𝐒 𝐎_*

꒰🍧꒱ No hay ${type} personalizado configurado`)
    }
    delete chat[`custom${type.charAt(0).toUpperCase() + type.slice(1)}`]
    await m.reply(
`‧˚꒰👛୭ *_𝐌 𝐄 𝐍 𝐒 𝐀 𝐉 𝐄 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐃𝐎_*

╭───INFO ꒰🗑️꒱────╮
‧˚꒰🗑️୭ Tipo: ${type}
‧˚꒰❌୭ Estado: Eliminado
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Volvió al mensaje por defecto 💌`)
  }
}

handler.help = ['setwelcome', 'setbye', 'setkick', 'delwelcome', 'delbye', 'delkick']
handler.tags = ['config']
handler.command = /^(setwelcome|setbye|setkick|delwelcome|delbye|delkick)$/i
handler.group = true
handler.admin = true

export default handler