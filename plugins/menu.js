import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  let loadMsg = await conn.reply(m.chat, `𝐃𝐎𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰\n\n⏳ *Cargando menú...*\n> Iniciando sistema`, m)

  let taguser = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
  let img = { url: 'https://files.evogb.win/VTW5WO.jpg' }

  let uptime = process.uptime() * 1000
  let _uptime = clockString(uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let totalcmd = Object.values(global.plugins).filter(p => p.help &&!p.disabled).length
  let start = performance.now()
  let end = performance.now()
  let ping = (end - start).toFixed(2)

  let owner = global.owner?.[0]?.[0] || '51930858072'
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
    search: '🔍', download: '🎈', game: '🍡', rpg: '🎯',
    config: '🪄', group: '🤍', owner: '🎀', info: '🫟',
    fun: '🪅', anime: '🌸', sticker: '🧩', tools: '⭐',
    nsfw: '🔞', audio: '🎵', prem: '🪞', otros: '📁'
  }

  const categoryNames = {
    search: '𝐏𝐫𝐞𝐦🔮', download: '𝐏𝐫𝐞𝐦𝐦🎈', game: '𝐏𝐫𝐞𝐦🎐', rpg: '𝐏𝐫𝐞𝐦🎯',
    config: '𝐂𝐎𝐍𝐅𝐈𝐆', group: '𝐏𝐫𝐞𝐦 🥇', owner: '𝐏𝐫𝐞𝐦𝐦🎀', info: '𝐏𝐫𝐞𝐦🫟',
    fun: '𝐏𝐫𝐞𝐦🎐', anime: '𝐀𝐍𝐈𝐌𝐄', sticker: '𝐏𝐫𝐞𝐦', tools: '𝐏𝐫𝐞𝐦',
    nsfw: '𝐍𝐒𝐅𝐖', audio: '𝐀𝐔𝐃𝐈𝐎', prem: '𝐏𝐫𝐞𝐦🪞', otros: '𝐎𝐓𝐑𝐎𝐒'
  }

  let menu = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

⤷ ┇ 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 ﹒ 𝟑.𝟎 𝐃𝐁𝐙
꒰ ◞⁺⊹ ．𝐞𝐬𝐭𝐚𝐝𝐨: *𝐄𝐍 𝐋𝐈𝐍𝐄𝐀* • ${_uptime}

 ꒱ ׁ. ᘏ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗔𝗖𝗧𝗜𝗩𝗢 ׅ 𝆬 ָ֢ ෆ
🫟 ࣪ ꕀ @${taguser.split('@')[0]} (𝐁𝐨𝐭). ˚. ᵎᵎ
> *𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 𝐚𝐥 𝐬𝐢𝐬𝐭𝐞𝐦𝐚 𝐝𝐨𝐥𝐬*

── *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍 𝐃𝐄𝐋 𝐁𝐎𝐓* ╏ 💥
*𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬*: ${totalreg} | *𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬*: ${totalcmd}
*𝐎𝐰𝐧𝐞𝐫*: ${ownerTag}
*𝐍𝐮𝐦𝐞𝐫𝐨*: +${numBot}

 🍥 : 𝖲𝖨𝖲𝖳𝖤𝖬𝖠 ﹙ 🌑 ﹚
> ﹒ 𝐑𝐀𝐌: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}𝐦𝐛 / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}𝐠𝐛
 ᶻ𝐳　*${new Date().toLocaleDateString('es', {weekday: 'long', timeZone: 'America/Lima'})}* ─ ${new Date().toLocaleTimeString('es', {timeZone: 'America/Lima'})}　⋌

© ❛ *𝐩𝐢𝐧𝐠*. ${ping}𝐦𝐬
🫟 ─ *𝐦𝐨𝐝𝐨:* 𝐩𝐮𝐛𝐥𝐢𝐜﹔

> ❍ 𝖴𝗌𝖺 (.) 𝖺𝗇𝗍𝖾𝗌 𝖽𝖾 𝖼𝖺𝖽𝖺 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗉𝖺𝗋𝖺 𝖺𝖼𝗍𝗂𝗏𝖺𝗋𝗅𝗈🪄
`

  for (let category in groups) {
    let icon = icons[category] || '📁'
    let catName = categoryNames[category] || category.toUpperCase()
    menu += `╭───${catName}────╮\n`
    for (let cmd of groups[category]) {
      menu += `${icon} ➛.${cmd}\n`
    }
    menu += `╰────── ୨୧ ────╯\n\n`
  }

  menu += `───────────
𝐃𝐎𝐋𝐈𝐄 𝐁𝐎𝐓. 🌼
🌟*𝐎𝐰𝐧𝐞𝐫*: ${ownerTag}
⭐*𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐨*: +${owner}
*𝐕𝐞𝐫𝐬𝐢𝐨𝐧*: 3.0 𝐃𝐁𝐙
*𝐏𝐨𝐰𝐞𝐫*: 𝐍𝐢𝐯𝐞𝐥 𝐃𝐢𝐨𝐬
> "𝑪𝒐𝒏𝒆́𝒄𝒕𝒂𝒕𝒆 𝒚 𝒅𝒆́𝒋𝒂𝒎𝒆 𝒆𝒏𝒅𝒖𝒍𝒛𝒂𝒍𝒕𝒆 𝒆𝒍 𝒅𝒊𝒂🌸"`

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