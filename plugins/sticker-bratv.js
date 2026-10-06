import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const fetchStickerVideo = async (text) => {
const response = await axios.get(`https://skyzxu-brat.hf.space/brat-animated`, { params: { text }, responseType: 'arraybuffer' })
if (!response.data) throw new Error('error al obtener el video de la api.')
return response.data
}

const handler = async (m, { conn, text }) => {
try {
text = m.quoted?.text || text
if (!text) return conn.sendMessage(m.chat, { text: `‧˚꒰👛୭ *_𝐁 𝐑 𝐀 𝐓 𝐕_*\n\n꒰🍧꒱ Responde a un mensaje o ingresa un texto preciosa` }, { quoted: m })

await m.react('🕒')
const videoBuffer = await fetchStickerVideo(text)

const stickerBuffer = await sticker(videoBuffer, false)
await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
await m.react('✅')

} catch (e) {
await m.react('❌')
conn.sendMessage(m.chat, { text: `‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*\n\n꒰🍧꒱ ${e.message}` }, { quoted: m })
}}

handler.tags = ['sticker']
handler.help = ['bratv']
handler.command = ['bratv']

export default handler