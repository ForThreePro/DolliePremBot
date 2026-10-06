import crypto from "crypto"
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"

let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐓 𝐎  𝐔 𝐑 𝐋_*

╭───ERROR ꒰❌꒱────╮
‧˚꒰🌼୭ Responde a un archivo
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───FORMATOS ꒰📦꒱────╮
‧˚꒰🌼୭ Imagen: JPG, PNG
‧˚꒰🌼୭ Video: MP4
‧˚꒰🌼୭ Audio: MP3, OGG
‧˚꒰🌼୭ Documento: PDF, ZIP
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Responde al archivo preciosa`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    let media = await q.download()
    let link = await myCloud(media)
    if (!link.url) throw new Error()

    let txt =
`‧˚꒰👛୭ *_𝐀 𝐑 𝐂 𝐇 𝐈 𝐕 𝐎_*

╭───SUBIDO ꒰✅꒱────╮
‧˚꒰🌼୭ Enlace generado
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───DETALLES ꒰🔗꒱────╮
‧˚꒰🌼୭ Link: ${link.url}
‧˚꒰🌼୭ ID: ${link.id || 'N/A'}
‧˚꒰🌼୭ Tamaño: ${formatBytes(media.length)}
‧˚꒰🌼୭ Servidor: evogb.win
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Archivo guardado en la nube 💅`

    await conn.sendFile(m.chat, media, 'dolls.' + link.url.split('.').pop(), txt, m)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

╭───FALLO ꒰❌꒱────╮
‧˚꒰🌼୭ No se pudo subir el archivo
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍧꒱ Intenta con otro archivo preciosa`, m)
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function myCloud(content) {
  const fileType = await fileTypeFromBuffer(content)
  const ext = fileType? fileType.ext : 'bin'
  const mime = fileType? fileType.mime : 'application/octet-stream'
  const formData = new FormData()
  formData.append("file", new Blob([content], { type: mime }), `${crypto.randomBytes(5).toString("hex")}.${ext}`)
  const response = await fetch("https://evogb.win/api/upload", { method: "POST", body: formData })
  if (!response.ok) throw new Error()
  return await response.json()
}

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = ['upp', 'tourl'];
export default handler