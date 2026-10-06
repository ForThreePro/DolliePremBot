const handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
  try {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn);
      return;
    }

    const customMessage = args.join(' ') || '📢 INVOCACIÓN GENERAL'
    const groupMetadata = await conn.groupMetadata(m.chat).catch(() => ({ subject: 'Grupo', participants: [] }))
    const groupName = groupMetadata.subject

    const countryFlags = [
      { prefijo: '502', bandera: '🇬🇹' }, { prefijo: '503', bandera: '🇸🇻' },
      { prefijo: '504', bandera: '🇭🇳' }, { prefijo: '505', bandera: '🇳🇮' },
      { prefijo: '506', bandera: '🇨🇷' }, { prefijo: '507', bandera: '🇵🇦' },
      { prefijo: '591', bandera: '🇧🇴' }, { prefijo: '592', bandera: '🇬🇾' },
      { prefijo: '593', bandera: '🇪🇨' }, { prefijo: '595', bandera: '🇵🇾' },
      { prefijo: '598', bandera: '🇺🇾' }, { prefijo: '58', bandera: '🇻🇪' },
      { prefijo: '52', bandera: '🇲🇽' }, { prefijo: '54', bandera: '🇦🇷' },
      { prefijo: '57', bandera: '🇨🇴' }, { prefijo: '51', bandera: '🇵🇪' },
      { prefijo: '56', bandera: '🇨🇱' }, { prefijo: '55', bandera: '🇧🇷' },
      { prefijo: '34', bandera: '🇪🇸' }, { prefijo: '44', bandera: '🇬🇧' },
      { prefijo: '33', bandera: '🇫🇷' }, { prefijo: '49', bandera: '🇩🇪' },
      { prefijo: '39', bandera: '🇮🇹' }, { prefijo: '81', bandera: '🇯🇵' },
      { prefijo: '82', bandera: '🇰🇷' }, { prefijo: '86', bandera: '🇨🇳' },
      { prefijo: '91', bandera: '🇮🇳' }, { prefijo: '61', bandera: '🇦🇺' },
      { prefijo: '64', bandera: '🇳🇿' }, { prefijo: '1', bandera: '🇺🇸' },
      { prefijo: '7', bandera: '🇷🇺' }, { prefijo: '63', bandera: '🇵🇭' },
      { prefijo: '95', bandera: '🇲🇲' }
    ]

    const getCountryFlag = (mem) => {
      const rawJid = mem.jid || mem.id || ''
      const phoneNumber = rawJid.split('@')[0]
      const match3 = countryFlags.find(c => c.prefijo.length === 3 && phoneNumber.startsWith(c.prefijo))
      if (match3) return match3.bandera
      const match2 = countryFlags.find(c => c.prefijo.length === 2 && phoneNumber.startsWith(c.prefijo))
      if (match2) return match2.bandera
      const match1 = countryFlags.find(c => c.prefijo.length === 1 && phoneNumber.startsWith(c.prefijo))
      if (match1) return match1.bandera
      return '🚩'
    }

    const grouped = {}
    for (const mem of participants) {
      const flag = getCountryFlag(mem)
      if (!grouped[flag]) grouped[flag] = []
      grouped[flag].push(mem)
    }

    const orderedFlags = countryFlags.map(c => c.bandera).concat(['🚩'])

    let messageText =
`‧˚꒰👛୭ *_𝐈 𝐍 𝐕 𝐎 𝐂 𝐀 𝐂 𝐈 𝐎 𝐍_*

╭───GRUPO ꒰👥꒱────╮
‧˚꒰🌼୭ Grupo: ${groupName}
‧˚꒰🌼୭ Integrantes: ${participants.length}
‧˚꒰🍨୭ Mensaje: ${customMessage}
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───MIEMBROS ꒰🌍꒱────╮
`

    for (const flag of orderedFlags) {
      if (grouped[flag]) {
        for (const mem of grouped[flag]) {
          const realJid = mem.jid || mem.id || ''
          const displayNumber = realJid.split('@')[0]
          messageText += `${flag} @${displayNumber}\n`
        }
      }
    }

    messageText +=
`╰─────── ݁ ˖Ი𐑼⋆────╯
꒰🍨꒱ Mencionados por: @${m.sender.split('@')[0]} 💅`

    const imageUrl = 'https://files.evogb.win/n4InsB.jpg'

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: messageText,
      mentions: participants.map(a => a.jid || a.id)
    }, { quoted: m })

    await m.react('📢')

  } catch (error) {
    console.error("[ERROR EN TODOS]:", error)
    await m.react('❌')
    conn.reply(m.chat, `‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*\n\n꒰🍧꒱ Ocurrió un error preciosa`, m)
  }
}

handler.help = ['todos <texto>']
handler.tags = ['grupos']
handler.command = /^(todos|invocar|tagall)$/i
handler.admin = true
handler.group = true

export default handler