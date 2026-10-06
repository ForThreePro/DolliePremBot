const handler = async (m, { conn, command }) => {
  if (!m.mentionedJid[0] &&!m.quoted) {
    let texto =
`‧˚꒰👛୭ *_𝐌 𝐀 𝐍 𝐔 𝐀 𝐋_*

╭───USO ꒰🌼꒱────╮
꒰🍨꒱.${command} @user → Para ${command === 'promote' || command === 'promover' || command === 'daradmin'? 'promover' : 'degradar'}
꒰🍨꒱.${command} → Responde al mensaje del user
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Solo admins preciosa`
    return m.reply(texto, m.chat)
  }

  let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
  let action = command === 'promote' || command === 'promover' || command === 'daradmin'? 'promote' : 'demote'

  let msgAccion = action === 'promote'
 ? `‧˚꒰👛୭ *_𝐀 𝐒 𝐂 𝐄 𝐍 𝐒 𝐎_*

╭───CORONACIÓN ꒰👑꒱────╮
‧˚꒰👧🏻୭ Usuario: @${user.split('@')[0]}
‧˚꒰✅୭ Estado: AHORA ES ADMIN 💅
‧˚꒰🌼୭ Promovido por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───NUEVOS PODERES ꒰✨꒱────╮
‧˚꒰🌼୭ Expulsar y Promover
‧˚꒰🌼୭ Editar info del grupo
‧˚꒰🌼୭ Cambiar ajustes
‧˚꒰🌼୭ Mandar anuncios
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Con grandes poderes vienen grandes dulzuras ✨`
    : `‧˚꒰👛୭ *_𝐃 𝐄 𝐒 𝐂 𝐄 𝐍 𝐒 𝐎_*

╭───DEGRADACIÓN ꒰📉꒱────╮
‧˚꒰👧🏻୭ Usuario: @${user.split('@')[0]}
‧˚꒰❌୭ Estado: YA NO ES ADMIN
‧˚꒰🌼୭ Degradado por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───PODERES REMOVIDOS ꒰🚫꒱────╮
‧˚꒰🍧୭ Expulsar y Promover
‧˚꒰🍧୭ Editar info del grupo
‧˚꒰🍧୭ Cambiar ajustes
‧˚꒰🍧୭ Mandar anuncios
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Todo poder vuelve a su origen`

  await m.react(action === 'promote'? '👑' : '📉')
  await conn.groupParticipantsUpdate(m.chat, [user], action)
  m.reply(msgAccion, m.chat, { mentions: [user, m.sender] })
}

handler.help = ['promote @user', 'demote @user']
handler.tags = ['grupos']
handler.command = /^(promote|promover|daradmin|demote|degradar|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler