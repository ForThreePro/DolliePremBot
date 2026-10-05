import axios from 'axios'
import FormData from 'form-data'
import { downloadContentFromMessage } from "@whiskeysockets/baileys"

// CONFIG API STELLAR
const api = {
    url: 'https://api.stellarwa.xyz',
    key: 'proyectsV2' // Solo esta key
}

function generateUniqueFilename(mime) {
  const ext = mime.split('/')[1] || 'jpg'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${id}.${ext}`
}

async function uploadToUguu(buffer, mime) {
  const body = new FormData()
  body.append('files[]', buffer, generateUniqueFilename(mime))
  const res = await axios.post('https://uguu.se/upload.php', body, {
    headers: body.getHeaders(),
    timeout: 30000
  })
  const url = res.data?.files?.[0]?.url
  if (!url) throw 'No se pudo subir a Uguu'
  return url
}

async function upscaleImage(url) {
  const apiUrl = `${api.url}/tools/upscale?url=${encodeURIComponent(url)}&key=${api.key}`
  const res = await axios.get(apiUrl, { responseType: 'arraybuffer', timeout: 60000 })
  if (!res.data) throw 'Stellar HD no devolvió imagen'
  return Buffer.from(res.data)
}

async function removeBgFromUrl(url) {
  const apiUrl = `${api.url}/tools/removebg?url=${encodeURIComponent(url)}&key=${api.key}`
  const res = await axios.get(apiUrl, { responseType: 'arraybuffer', timeout: 60000 })
  if (!res.data) throw 'Stellar RemoveBG no devolvió imagen'
  return Buffer.from(res.data)
}

let handler = async (m, { conn, usedPrefix, command }) => {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''

    if (!mime) return m.reply(
`‧˚꒰👛୭ *_𝐑 𝐄 𝐌 𝐎 𝐕 𝐄 𝐁 𝐆_*

꒰🍧꒱ ¡𝐎𝐨𝐩𝐬! 𝐍𝐨 𝐯𝐞𝐨 𝐧𝐚𝐝𝐚
꒰🍨꒱.*꒰ Responde a una imagen linda ୭*

> ꒰🌼꒱ Usa: ${usedPrefix + command} + imagen`
    )
    if (!/image\/(jpe?g|png)/.test(mime)) {
      return m.reply(
`‧˚꒰👛୭ *_𝐑 𝐄 𝐌 𝐎 𝐕 𝐄 𝐁 𝐆_*

꒰🍧꒱ ¡𝐄𝐫𝐫𝐨𝐫𝐜𝐢𝐭𝐨!
꒰🍨꒱ Solo acepto JPG / PNG preciosa

╰─────── ݁ ˖Ი𐑼⋆────╯`
      )
    }

    try {
      await m.react('⏳')

      // Proceso: Descargar > Uguu > HD > Uguu > RemoveBG
      const buffer = await q.download()
      const uploadedUrl = await uploadToUguu(buffer, mime)
      const hdBuffer = await upscaleImage(uploadedUrl)
      const hdUrl = await uploadToUguu(hdBuffer, 'image/png')
      const finalBuffer = await removeBgFromUrl(hdUrl)

      // Enviar imagen PNG sin fondo
      await conn.sendMessage(m.chat, {
        image: finalBuffer,
        caption:
`‧˚꒰👛୭ *_𝐑 𝐄 𝐒 𝐔 𝐋 𝐓 𝐀 𝐃 𝐎_*

╭───TOOLS ꒰🌼꒱────╮
꒰🌼꒱ Calidad: HD 2x
꒰🌼꒱ Fondo: Eliminado ✨
꒰🌼꒱ Key: proyectsV2
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Listo mi reina 👛`
      }, { quoted: m })

      // Enviar también como documento
      await conn.sendMessage(m.chat, {
        document: finalBuffer,
        fileName: 'nobg.png',
        mimetype: 'image/png',
        caption:
`‧˚꒰🍨꒱ Documento PNG sin fondo`
      }, { quoted: m })

      await m.react('✅')

    } catch (err) {
      await m.react('❌')
      await m.reply(
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

꒰🍧꒱ Ups! Algo salió mal
꒰🍨꒱ Error: ${err.message || err}

╰─────── ݁ ˖Ი𐑼⋆────╯`
      )
    }
}

handler.help = ['removebg', 'rbg', 'nobg']
handler.tags = ['tools', 'ai']
handler.command = /^(removebg|rbg|nobg)$/i
export default handler