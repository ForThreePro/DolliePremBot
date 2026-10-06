let handler = async (m, { conn, command }) => {

    let isClose
    let estado
    let icon
    let react

    if (command === 'abrir') {
        isClose = 'not_announcement'
        estado = 'ABIERTO 🔓'
        icon = '✅'
        react = '🔓'
    } 
    if (command === 'cerrar') {
        isClose = 'announcement'
        estado = 'CERRADO 🔒'
        icon = '🚫'
        react = '🔒'
    }

    await conn.groupSettingUpdate(m.chat, isClose)
    await m.react(react)

    await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐆 𝐑 𝐔 𝐏 𝐎 ${estado}_*

╭───ESTADO ꒰${react}꒱────╮
‧˚꒰${icon}୭ Estado: El grupo fue ${estado.toLowerCase()}
‧˚꒰👧🏻୭ Por: @${m.sender.split('@')[0]}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Configuración actualizada 💅`, m, {
        mentions: [m.sender]
    })
}

handler.help = ['abrir', 'cerrar']
handler.tags = ['grupos']
handler.command = ['abrir', 'cerrar']
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler