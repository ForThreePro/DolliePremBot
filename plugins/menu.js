import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  let loadMsg = await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n⏳ *Cargando menú...*\n> Iniciando sistema`, m)

  let taguser = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
  let img = { url: 'https://files.evogb.win/VTW5WO.jpg' }

  let uptime = process.uptime() * 1000
  let _uptime = clockString(uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let totalcmd = Object.values(global.plugins).filter(p => p.help &&!p.disabled).length
  let start = performance.now()
  let end = performance.now()
  let ping = (end - start).toFixed(2)

  let owner = global.owner?.[0]?.[0] || '51927174369'
  let ownerTag = `@${owner}`
  let numBot = conn.user.jid.split('@')[0]

  let help = Object.values(global.plugins).filter(p => p.help &&!p.disabled)
  let groups = {}
  for (let plugin of help) {
    let category = plugin.tags? plugin.tags[0] : 'otros'
    if (!groups[category]) groups[category] = []
    if (Array.isArray(plugin.help)) groups[category].push(...plugin.help)
    else groups[category].push(plugin.help)
  }

  // 1 EMOJI POR CATEGORÍA
  const icons = {
    search: '🔍', download: '⬇️', game: '🎮', rpg: '⚔️',
    config: '⚙️', group: '👥', owner: '👑', info: 'ℹ️',
    fun: '😂', anime: '🌸', sticker: '🧩', tools: '🛠️',
    nsfw: '🔞', audio: '🎵', prem: '🍃', otros: '📁'
  }

  const categoryNames = {
    search: 'BÚSQUEDA', download: 'DESCARGAS', game: 'JUEGOS', rpg: 'RPG',
    config: 'CONFIG', group: 'GRUPOS', owner: 'OWNER', info: 'INFO',
    fun: 'DIVERSIÓN', anime: 'ANIME', sticker: 'STICKERS', tools: 'HERRAMIENTAS',
    nsfw: 'NSFW', audio: 'AUDIO', prem: 'PREM', otros: 'OTROS'
  }

  let menu = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ESTADO* 」─╮
│ 🩰 *Versión:* 3.0
│ 🩰 *Estado:* En línea • ${_uptime}
│ 🩰 *Ping:* ${ping}ms
╰─────────────

├─「 *USUARIO* 」─
│ ✨ @${taguser.split('@')[0]}
│ 💌 *Bienvenida al sistema*
╰─────────────

├─「 *INFORMACIÓN* 」─
│ 👥 *Usuarios:* ${totalreg}
│ 📦 *Comandos:* ${totalcmd}
│ 👑 *Owner:* ${ownerTag}
│ 📱 *Número:* +${numBot}
╰─────────────

├─「 *SISTEMA* 」─
│ 🌌 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}gb
│ 📅 *${new Date().toLocaleDateString('es', {weekday: 'long', timeZone: 'America/Lima'})}*
│ 🕐 *${new Date().toLocaleTimeString('es', {timeZone: 'America/Lima'})}*
╰─────────────
> *Usa ${usedPrefix} antes de cada comando* 💌

`

  for (let category in groups) {
    let icon = icons[category] || '📁'
    let catName = categoryNames[category] || category.toUpperCase()
    menu += `╭─「 ${icon} ${catName} 」─╮\n`
    for (let cmd of groups[category]) {
      menu += `│ ${icon} ${usedPrefix}${cmd}\n`
    }
    menu += `╰─────────────\n\n`
  }

  menu += `> *𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓* • Hecho con cariño 🩰`

  await conn.sendMessage(m.chat, { delete: loadMsg.key })
  await conn.sendMessage(m.chat, {
    image: img,
    caption: menu,
    mentions: [taguser, owner]
  }, { quoted: m })
}

handler.help = ['menu', 'help', 'menú']
handler.tags = ['info']
handler.command = /^(menu|help|menú)$/i

export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--' : Math.floor(ms / 60000) % 60
  return [h, m].map(v => v.toString().padStart(2, 0)).join('h ') + 'm'
}