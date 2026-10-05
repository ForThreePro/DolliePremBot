import ytsearch from "yt-search"
import fetch from "node-fetch"

const api = { url: 'https://api.stellarwa.xyz', key: 'proyectsV2' }

// FUNCION PARA REACCIONES
const react = async (conn, m, text) => {
  try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
}

const getBuffer = async (url) => {
    try {
        const res = await fetch(url)
        return Buffer.from(await res.arrayBuffer())
    } catch(e) {
        throw new Error('Error descargando el archivo')
    }
}

let handler = async (m, { conn, text, command }) => {
    if (!text) {
        let menuUso = 
`‧˚꒰👛୭ *_𝐏 𝐋 𝐀 𝐘 𝟏_*

╭───DESCARGAS꒰🍯꒱───╮
‧˚꒰🍯୭ 📝 Descarga audio de YT y TikTok
‧˚꒰🍯୭ 🎵 Envía en MP3 lindo
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───USO ꒰🍨꒱────╮
꒰🍨꒱ .${command} <nombre>
꒰🍨꒱ .ttmp3 <link de tiktok>
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───EJEMPLOS ꒰🌼꒱────╮
꒰🌼꒱ .play1 blinding lights
꒰🌼꒱ .ttmp3 https://www.tiktok.com/@user/video/123
╰─────── ݁ ˖Ი𐑼⋆────╯`
        return conn.sendMessage(m.chat, { text: menuUso }, { quoted: m })
    }

    await react(conn, m, '⏳')
    try {
        // ===== YOUTUBE =====
        if (command === 'play1') {
            await m.reply(
`‧˚꒰👛୭ *_𝐏 𝐋 𝐀 𝐘 𝟏_*

╭───BUSCANDO ꒰🔍꒱────╮
꒰🌼꒱ Buscando en YouTube...
꒰🍧꒱ Obteniendo audio...
꒰🍨꒱ Preparando descarga...
╰─────── ݁ ˖Ი𐑼⋆────╯`)

            const searchResult = await ytsearch(text)
            if (!searchResult.videos ||!searchResult.videos.length) throw new Error("No se encontró la canción.")
            const video = searchResult.videos[0]
            const { title, author, timestamp: duration, views, url, image } = video
            const vistas = (views || 0).toLocaleString()
            const canal = author?.name || author || "Desconocido"
            const thumbBuffer = await getBuffer(image)

            await conn.sendMessage(m.chat, {
                image: thumbBuffer,
                caption:
`‧˚꒰👛୭ *_𝐄 𝐍 𝐂 𝐎 𝐍 𝐓 𝐑 𝐀 𝐃 𝐎_*

╭───INFO ꒰🎵꒱────╮
‧˚꒰🎵୭ 📌 Título: ${title}
‧˚꒰🎵୭ 👤 Canal: ${canal}
‧˚꒰🎵୭ ⏱️ Duración: ${duration || '0:00'}
‧˚꒰🎵୭ 👁️ Vistas: ${vistas}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Enviando audio preciosa ✨`
            }, { quoted: m })

            const dlEndpoint = `${api.url}/dl/ytmp3?url=${encodeURIComponent(url)}&key=${api.key}`
            const resDl = await fetch(dlEndpoint).then(r => r.json())
            const dl = resDl?.data?.dl || resDl?.data?.download
            if (!dl) throw new Error('No se pudo descargar el audio de YT')
            const audioBuffer = await getBuffer(dl)

            await react(conn, m, '📥')
            await conn.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', fileName: `${title}.mp3`, ptt: false }, { quoted: m })
        }

        // ===== TIKTOK =====
        if (command === 'ttmp3' || command === 'tomp3' || command === 'tt') {
            await m.reply(
`‧˚꒰👛୭ *_𝐓 𝐓 𝐌 𝐏 𝟑_*

╭───PROCESANDO ꒰📱꒱────╮
꒰🌼꒱ Analizando link de TikTok...
꒰🍧꒱ Extrayendo audio...
꒰🍨꒱ Preparando descarga...
╰─────── ݁ ˖Ი𐑼⋆────╯`)

            const apiUrl = `${api.url}/dl/tiktokmp3?url=${encodeURIComponent(text)}&key=${api.key}`
            const res = await fetch(apiUrl).then(r => r.json())
            const data = res?.data || res?.result || res
            let dl = data?.download || data?.dl || data?.music || data?.play
            const title = data?.title || data?.desc || 'tiktok'
            const author = data?.author?.nickname || data?.author || 'Desconocido'
            const thumb = data?.cover || data?.thumbnail
            if (!dl) throw new Error('No se pudo descargar. Link mal o privado')

            const audioBuffer = await getBuffer(dl)
            const caption =
`‧˚꒰👛୭ *_𝐄 𝐍 𝐂 𝐎 𝐍 𝐓 𝐑 𝐀 𝐃 𝐎_*

╭───INFO ꒰📱꒱────╮
‧˚꒰📱୭ 📌 Título: ${title}
‧˚꒰📱୭ 👤 Autor: ${author}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Enviando audio preciosa ✨`

            if (thumb) {
                const thumbBuffer = await getBuffer(thumb)
                await conn.sendMessage(m.chat, { image: thumbBuffer, caption }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
            }

            await react(conn, m, '📥')
            await conn.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', fileName: `${title}.mp3`, ptt: false }, { quoted: m })
        }

        await react(conn, m, '✅')
    } catch (e) {
        await react(conn, m, '❌')
        let menuErr =
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

╭───ERROR ꒰❌꒱────╮
꒰🍧꒱ ${e.message}
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───SOLUCIÓN ꒰🌼꒱────╮
꒰🌼꒱ Verifica el nombre o link
꒰🌼꒱ El video debe ser público
╰─────── ݁ ˖Ი𐑼⋆────╯`
        return conn.sendMessage(m.chat, { text: menuErr }, { quoted: m })
    }
}

handler.help = ['play1 <nombre>', 'ttmp3 <link>']
handler.tags = ['descargas']
handler.command = /^(play1|ttmp3|tomp3|tt)$/i
handler.register = false
export default handler