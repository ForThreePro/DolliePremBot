import ytSearch from 'yt-search'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(
`‧˚꒰👛୭ *_𝐁 𝐔 𝐒 𝐐 𝐔 𝐄 𝐃 𝐀_*

꒰🍧꒱ ¿Qué quieres buscar preciosa?
꒰🍨꒱ Ejemplo: ${m.prefix}google Goku ultra instinto`)

    await m.react('🔍')

    try {
        let search = await ytSearch(text)
        let results = search.videos.slice(0, 5)

        if (!results.length) {
            await m.react('❌')
            return m.reply(
`‧˚꒰👛୭ *_𝐁 𝐔 𝐒 𝐐 𝐔 𝐄 𝐃 𝐀_*

꒰🍧꒱ No encontré resultados`)
        }

        let txt =
`‧˚꒰👛୭ *_𝐑 𝐄 𝐒 𝐔 𝐋 𝐓 𝐀 𝐃 𝐎 𝐒_*

╭───BUSCANDO ꒰🔍꒱────╮
꒰🌼꒱ ${text}
╰─────── ݁ ˖Ი𐑼⋆────╯

${results.map((v, i) => {
            return `╭───${i + 1} ꒰🎬꒱────╮
‧˚꒰🎵୭ ${v.title}
‧˚꒰⏳୭ Duración: ${v.timestamp}
‧˚꒰👁️୭ Vistas: ${v.views.toLocaleString()}
‧˚꒰👧🏻୭ Canal: ${v.author.name}
‧˚꒰🔗୭ ${v.url}
╰─────── ݁ ˖Ი𐑼⋆────╯`
        }).join('\n\n')}

꒰🍨꒱ Tip: Usa .ytmp4 o .ytmp3 + el link 💌`

        await conn.reply(m.chat, txt, m)
        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply(
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

꒰🍧꒱ No se pudo realizar la búsqueda`)
    }
}

handler.help = ['google <busqueda>']
handler.tags = ['search']
handler.command = /^google$/i

export default handler