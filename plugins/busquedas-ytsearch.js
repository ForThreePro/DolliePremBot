import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(
`‧˚꒰👛୭ *_𝐁 𝐔 𝐒 𝐐 𝐔 𝐄 𝐃 𝐀_*

꒰🍧꒱ ¿Qué deseas buscar en YouTube?
꒰🍨꒱ Ejemplo: ${m.prefix}ytsearch king nasir`)

    await m.react('🔍')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(text)}`)
        if (!data.data || data.data.length === 0) {
            await m.react('❌')
            return m.reply(
`‧˚꒰👛୭ *_𝐁 𝐔 𝐒 𝐐 𝐔 𝐄 𝐃 𝐀_*

꒰🍧꒱ No encontré resultados para: ${text}`)
        }

        let res = data.data.slice(0, 5).map((v, i) => 
`╭───${i+1} ꒰🎬꒱────╮
‧˚꒰🎵୭ ${v.title}
‧˚꒰⏳୭ Duración: ${v.duration} | 👁️ Vistas: ${v.views}
‧˚꒰👧🏻୭ Canal: ${v.author}
‧˚꒰🔗୭ ${v.url}
╰─────── ݁ ˖Ი𐑼⋆────╯`).join('\n\n')

        let caption =
`‧˚꒰👛୭ *_𝐓 𝐎 𝐏 𝟓_*

╭───BUSCANDO ꒰🔍꒱────╮
꒰🌼꒱ ${text}
╰─────── ݁ ˖Ი𐑼⋆────╯

${res}

꒰🍨꒱ Tip: Usa .ytmp4 o .ytmp3 con el link 💌`

        m.reply(caption)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

꒰🍧꒱ Error al buscar en YouTube`)
    }
}

handler.help = ['yts <busqueda>']
handler.tags = ['search']
handler.command = /^(yts|ytsearch)$/i

export default handler