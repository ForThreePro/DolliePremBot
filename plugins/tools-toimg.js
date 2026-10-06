let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m

  let isSticker = q.mtype === 'stickerMessage' || (q.mimetype || '').includes('webp')

  if (!isSticker) {
    return m.reply('‧˚꒰👛୭ *_𝐓 𝐎  𝐈 𝐌 𝐆_*\n\n꒰🍧꒱ Responde a un sticker para convertirlo preciosa')
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } })

    let media = await q.download()

    await conn.sendMessage(
      m.chat,
      {
        image: media,
        caption: '‧˚꒰👛୭ *_𝐓 𝐎 𝐈 𝐌 𝐆_*\n\n꒰🍨꒱ Sticker convertido 💅'
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error(e)
    m.reply('‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*\n\n꒰🍧꒱ No pude convertir el sticker')
  }

}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = ['toimg','stickerimg','simg']

export default handler