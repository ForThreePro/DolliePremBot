import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  let loadMsg = await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n⏳ *Cargando menú...*`, m)

  let name = await conn.getName(m.sender)
  let uptime = process.uptime() * 1000
  let _uptime = clockString(uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let totalcmd = Object.values(global.plugins).filter(p => p.help &&!p.disabled).length
  let start = performance.now()
  let end = performance.now()
  let ping = (end - start).toFixed(2)

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

  // CATEGORÍAS COQUETAS SIN EMOJI POR DEFECTO
  const catDesign = {
    config: { icon: '⚙️', name: 'CONFIG' },
    fun: { icon: '🎠', name: 'FUN' },
    love: { icon: '💗', name: 'LOVE' },
    scanner: { icon: '🌸', name: 'SCANNER' },
    tools: { icon: '🌸', name: 'TOOLS' },
    ff: { icon: '🛩️', name: 'FF' },
    search: { icon: '🔎', name: 'SEARCH' },
    download: { icon: '🩰', name: 'DOWNLOADER' },
    group: { icon: '🛍️', name: 'GRUPOS' },
    admin: { icon: '🎨', name: 'GRUPOS 2' },
    wel: { icon: '⭐', name: 'GROUP' },
    ia: { icon: '🎐', name: 'INTELIGENCIA ARTIFICIAL' },
    main: { icon: '🎈', name: 'MAIN' },
    info: { icon: '🌸', name: 'INFOR' },
    owner: { icon: '🥇', name: 'OWNER' },
    sticker: { icon: '🪅', name: 'STIKERS' },
    otros: { icon: '✨', name: 'EXTRAS' } // <- CAMBIO COQUETA
  }

  let menu = `╭─🎀─ *『 𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓*─🎀─╮
│ ✨ *HOLA* @${m.sender.split('@')[0]}💞 💫
│
│ 🎀 *Prefijo:* [ ${usedPrefix} ]
│ ⏰ *Activo:* ${_uptime}
│
├─❒ *ESTADÍSTICAS* ❒
│ 📊 *Comandos:* ${totalcmd}
│ 👥 *Usuarios:* ${totalreg}
│
├─❒ *FECHA Y HORA* ❒
│ 📅 *Día:* ${fecha[0]}
│ 📆 *Fecha:*${fecha[1]}
│ 🕐 *Hora:* ${hora}
│
`

  for (let category in groups) {
    let design = catDesign[category] || { icon: '💖', name: 'MISC' } // <- CAMBIO COQUETA
    menu += `╭───${design.icon}${design.name}────╮\n`
    for (let cmd of groups[category]) {
      menu += `│ ${design.icon} ${usedPrefix}${cmd}\n`
    }
    menu += `╰─────── ୨୧ ────╯\n\n`
  }

  menu += `╭────────────────╮
│ 🎀 *BOT:* 𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓
│ 🌸 *Creador:* 𝐃𝐨𝐥𝐥𝐢𝐞 𝐭𝐞𝐚𝐦👑
│ ✨ *Versión:* 3.0.0 Premium Edition
│
│ > *“𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓 al servicio del chat”* 💝
╰────────────────╯`

  await conn.sendMessage(m.chat, { delete: loadMsg.key })
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.evogb.win/fw2NBP.jpg' },
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