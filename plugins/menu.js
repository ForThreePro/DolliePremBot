
import os from 'os'

let handler = async (m, { conn, usedPrefix }) => {
  let loadMsg = await conn.reply(m.chat, `‧˚꒰👛୭ *_𝐂 𝐀 𝐑 𝐆 𝐀 𝐍 𝐃 𝐎_*\n\n꒰⏳꒱ Cargando menú...`, m)

  let uptime = process.uptime() * 1000
  let totalreg = Object.keys(global.db.data.users).length

  let fecha = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Lima'
  })
  let hora = new Date().toLocaleTimeString('es-PE', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    timeZone: 'America/Lima'
  })

  let help = Object.values(global.plugins).filter(p => p.help &&!p.disabled)
  let groups = {}
  for (let plugin of help) {
    let category = plugin.tags? plugin.tags[0] : 'otros'
    if (!groups[category]) groups[category] = []
    if (Array.isArray(plugin.help)) groups[category].push(...plugin.help)
    else groups[category].push(plugin.help)
  }

  const catDesign = {
    tools: { icon: '🌼', name: 'TOOLS', pref: '꒰🌼꒱' },
    fun: { icon: '🏷️', name: 'FUN', pref: '‧˚꒰🏷️୭' },
    owner: { icon: '🌤️', name: 'OWNER', pref: '‧˚꒰🌤️୭' },
    group: { icon: '🍄', name: 'GRUPOS', pref: '‧˚꒰🍄୭' },
    grupos: { icon: '💌', name: 'GRUPOS', pref: '‧˚꒰💌୭' },
    admin: { icon: '🍄', name: 'GRUPOS', pref: '‧˚꒰🍄୭' },
    config: { icon: '🍨', name: 'CONFIG', pref: '꒰🍨꒱' },
    downloader: { icon: '🍯', name: 'DESCARGAS', pref: '‧˚꒰🍯୭' },
    search: { icon: '👧🏻', name: 'SEARCH', pref: '‧꒰👧🏻୭' },
    diversión: { icon: '🎪', name: 'DIVERSIÓN', pref: '꒰🎪꒱' },
    buscador: { icon: '🪩', name: 'BUSCADOR', pref: '‧˚꒰🪩୭' },
    ff: { icon: '🔴', name: 'FREEFIRE', pref: '꒰🔴꒱' },
    ia: { icon: '🩰', name: 'AI', pref: '‧˚꒰🩰୭' },
    ai: { icon: '🩰', name: 'AI', pref: '‧˚꒰🩰୭' },
    main: { icon: '🦢', name: 'MAIN', pref: '‧˚꒰🦢୭' },
    info: { icon: '🎨', name: 'INFO', pref: '‧˚꒰🎨୭' },
    serbot: { icon: '⛲', name: 'SERBOT', pref: '‧˚꒰⛲୭' },
    sticker: { icon: '🍰', name: 'STIKERS', pref: '‧˚꒰🍰୭' },
    grupo: { icon: '👛', name: 'GRUPO', pref: '‧˚꒰👛୭' },
    otros: { icon: '✨', name: 'OTROS', pref: '‧˚꒰✨୭' }
  }

  let menu =
`‧˚꒰👛୭ *_𝐌 𝐄 𝐍 𝐔́ 𝐃 𝐎 𝐋 𝐋 𝐈 𝐄_*

¡𝐃𝐄𝐒𝐂𝐔𝐁𝐑𝐄 𝐈𝐍𝐂𝐑𝐄𝐈́𝐁𝐋𝐄𝐒 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒!!

꒰🍧꒱.*꒰𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀 ୭*
꒰🍨꒱.*꒰ @${m.sender.split('@')[0]} ୭*

> \`\` ${fecha} │ Hora: ${hora} \`\`

`

  for (let category in groups) {
    let design = catDesign[category] || { icon: '✨', name: category.toUpperCase(), pref: '‧˚꒰✨୭' }
    menu += `╭───${design.name} ꒰${design.icon}꒱────╮\n`
    for (let cmd of groups[category]) {
      menu += `${design.pref} ${usedPrefix}${cmd}\n`
    }
    menu += `╰─────── ݁ ˖Ი𐑼⋆────╯\n\n`
  }

  menu +=
`─────── ꒰🍨꒱───────

꒰ *BOT:* 𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓
꒰ *Creador:* 𝐃𝐨𝐥𝐥𝐲𝐒🌼
꒰ *Versión:* 3.0.0 Premium

> 𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓 al servicio del chat`

  await conn.sendMessage(m.chat, { delete: loadMsg.key })
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.evogb.win/n4InsB.jpg' },
    caption: menu,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['menu', 'help', 'menú']
handler.tags = ['info']
handler.command = /^(menu|help|menú)$/i

function clockString(ms) {
  let h = isNaN(ms)? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--' : Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}

export default handler