import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  let loadMsg = await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓 🩰\n\n⏳ *Cargando menú...*`, m)

  let uptime = process.uptime() * 1000
  let _uptime = clockString(uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let totalcmd = Object.values(global.plugins).filter(p => p.help &&!p.disabled).length

  let fecha = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Lima'
  }).split(',')
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

  // DISEÑO DOLLS ORIGINAL
  const catDesign = {
    fun: { icon: '🦩', name: 'FUN' },
    owner: { icon: '💎', name: 'OWNER' },
    group: { icon: '🛍️', name: 'GRUPOS' },
    admin: { icon: '🎡', name: 'GRUPOS' },
    config: { icon: '🎀', name: 'CONFIG' },
    downloader: { icon: '🪩', name: 'DESCARGAS' },
    tools: { icon: '🪷', name: 'TOOLS' },
    search: { icon: '🌄', name: 'SEARCH' },
    diversión: { icon: '🧋', name: 'DIVERSIÓN' },
    ff: { icon: '🌟', name: 'FREE FIRE' },
    ia: { icon: '🩰', name: 'INTELIGENCIA ARTIFICIAL' },
    main: { icon: '🪞', name: 'MAIN' },
    info: { icon: '🌷', name: 'INFO' },
    sticker: { icon: '🎐', name: 'STIKERS' },
    ai: { icon: '👘', name: 'AI' },
    otros: { icon: '🤍', name: 'MISC' }
  }

  let menu = `(🌷)" _𝐌𝐄𝐍𝐔́ 𝐃𝐎𝐋𝐋𝐈𝐄_. 🩰

¡𝐃𝐄𝐒𝐂𝐔𝐁𝐑𝐄 𝐈𝐍𝐂𝐑𝐄𝐈́𝐁𝐋𝐄𝐒 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒!!

(🪞).¡¡ *𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀*!!
(🌷). @${m.sender.split('@')[0]}

> \`\` ${fecha[0].trim()}, ${fecha[1].trim()}│ Hora: ${hora} \`\`

`

  for (let category in groups) {
    let design = catDesign[category] || { icon: '✨', name: category.toUpperCase() }
    menu += `╭───${design.name}${design.icon}────╮\n`
    for (let cmd of groups[category]) {
      menu += `│ ${design.icon} ${usedPrefix}${cmd}\n`
    }
    menu += `╰─────── ୨୧ ────╯\n\n`
  }

  menu += `───────୨୧──────
 🪞 *BOT:* 𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓
 🌸 *Creador:* 𝐃𝐨𝐥𝐥𝐢𝐞 𝐭𝐞𝐚𝐦🌼
 🦩 *Versión:* 3.0.0 Premium Edition

> 𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓 al servicio del chat`

  await conn.sendMessage(m.chat, { delete: loadMsg.key })
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.evogb.win/n4InsB.jpg' }, // pon tu logo de dollie aquí
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