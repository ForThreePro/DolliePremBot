import ytSearch from 'yt-search'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

> 🪄 *¿Qué quieres buscar?*
> 🪞 *Ejemplo:* ${m.prefix}google Goku ultra instinto`)

    await m.react('🔍')

    try {
        let search = await ytSearch(text)
        let results = search.videos.slice(0, 5)

        if (!results.length) {
            await m.react('❌')
            return m.reply('𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *No encontré resultados*')
        }

        let txt = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *RESULTADOS* 」─╮
│ 🪞 *Buscando:* ${text}
╰─────────────

${results.map((v, i) => {
            return `╭─ ${i + 1} ─╮
│ 🎬 *${v.title}*
│ ⏳ *Duración:* ${v.timestamp}
│ 👁️ *Vistas:* ${v.views.toLocaleString()}
│ 👤 *Canal:* ${v.author.name}
│ 🔗 ${v.url}
╰─────────`
        }).join('\n\n')}

> *Tip:* Usa .ytmp4 o .ytmp3 + el link 💌`

        await conn.reply(m.chat, txt, m)
        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *Error:* No se pudo realizar la búsqueda')
    }
}

handler.help = ['google <busqueda>']
handler.tags = ['search']
handler.command = /^google$/i

export default handler