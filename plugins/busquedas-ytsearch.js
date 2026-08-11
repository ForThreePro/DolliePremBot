import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

> 🪄 *¿Qué deseas buscar en YouTube?*
> 🪞 *Ejemplo:* ${m.prefix}ytsearch king nasir`)

    await m.react('🔍')
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(text)}`)
        if (!data.data || data.data.length === 0) {
            await m.react('❌')
            return m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ⚠️ *No encontré resultados para:* ${text}`)
        }

        let res = data.data.slice(0, 5).map((v, i) => 
`╭─ ${i+1} ─╮
│ 🎬 *${v.title}*
│ ⏳ *Duración:* ${v.duration} | 👁️ *Vistas:* ${v.views}
│ 👤 *Canal:* ${v.author}
│ 🔗 ${v.url}
╰─────────`).join('\n\n')

        let caption = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *TOP 5 RESULTADOS* 」─╮
│ 🪞 *Buscando:* ${text}
╰─────────────

${res}

> *Tip:* Usa .ytmp4 o .ytmp3 con el link 💌`

        m.reply(caption)
        await m.react('✅')
    } catch { 
        await m.react('❌')
        m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n> ❌ *Error al buscar en YouTube*`)
    }
}

handler.help = ['yts <busqueda>']
handler.tags = ['search']
handler.command = /^(yts|ytsearch)$/i

export default handler