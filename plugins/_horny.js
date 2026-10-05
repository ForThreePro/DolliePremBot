import fetch from 'node-fetch'

let handler = async (m, { conn, participants }) => {
    let defaultImg = 'https://files.evogb.win/n4InsB.jpg'
    let defaultBg = 'https://files.evogb.win/7BY3Yv.jpg'
    let key = 'proyectsV2'

    const getAvatar = async (jid) => {
        try {
            let url = await conn.profilePictureUrl(jid, 'image')
            if(url && url.startsWith('https')) return url
        } catch {}
        return defaultImg
    }

    const getName = async (jid) => {
        let name = jid.split('@')[0]
        try {
            let n = await conn.getName(jid)
            if(n && n!== 'undefined') name = n
        } catch {}
        return name
    }

    const react = async (text) => {
        try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
    }

    // ===== HORNY =====
    if (m.message?.extendedTextMessage?.text?.includes('horny') || m.text?.includes('horny')) {
        let who = m.mentionedJid[0] || m.quoted?.sender || m.sender
        let pp = await getAvatar(who)
        let apiUrl = `https://api.stellarwa.xyz/generate/horny?avatar=${encodeURIComponent(pp)}&key=${key}`
        try {
            await react('😏')
            await m.reply(
`‧˚꒰👛୭ *_𝐇 𝐎 𝐑 𝐍 𝐘_*

╭───GENERANDO ꒰🔥꒱────╮
꒰🌼꒱ Creando imagen coqueta...
꒰🍨꒱ Para @${who.split('@')[0]} ✨
╰─────── ݁ ˖Ი𐑼⋆────╯`
            )
            let res = await fetch(apiUrl, { timeout: 20000 })
            let buffer = await res.buffer()
            await conn.sendMessage(m.chat, {
                image: buffer,
                caption:
`‧˚꒰👛୭ *_𝐇 𝐎 𝐑 𝐍 𝐘_*

╭───RESULTADO ꒰😏꒱────╮
‧˚꒰😏୭ @${who.split('@')[0]} está así ahora mismo 🔥
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Que traviesa 👛`,
                mentions: [who]
            })
        } catch (e) {
            await react('❌')
            m.reply(
`‧˚꒰👛୭ *_𝐇 𝐎 𝐑 𝐍 𝐘_*

꒰🍧꒱ Error al generar mi reina`
            )
        }
    }

    // ===== SHIP =====
    if (m.message?.extendedTextMessage?.text?.includes('ship') || m.text?.includes('ship')) {
        if (!m.isGroup) return m.reply(
`‧˚꒰👛୭ *_𝐒 𝐇 𝐈 𝐏_*

꒰🍧꒱ Solo funciona en grupos preciosa`
        )
        let members = participants.map(u => u.id)
        if (members.length < 2) return m.reply(
`‧˚꒰👛୭ *_𝐒 𝐇 𝐈 𝐏_*

꒰🍧꒱ Necesitan mínimo 2 personas`
        )
        let user1, user2
        if (m.mentionedJid.length >= 2) { user1 = m.mentionedJid[0]; user2 = m.mentionedJid[1] }
        else { user1 = members[Math.floor(Math.random() * members.length)]; user2 = members[Math.floor(Math.random() * members.length)]; while(user1 === user2) user2 = members[Math.floor(Math.random() * members.length)] }

        await react('💘')
        await conn.sendMessage(m.chat, {
            text:
`‧˚꒰👛୭ *_𝐒 𝐇 𝐈 𝐏_*

╭───CALCULANDO ꒰💘꒱────╮
꒰🌼꒱ @${user1.split('@')[0]} + @${user2.split('@')[0]}
꒰🍨꒱ Viendo si hay química...
╰─────── ݁ ˖Ი𐑼⋆────╯`,
            mentions: [user1, user2]
        })
        try {
            let avatar1 = await getAvatar(user1); let avatar2 = await getAvatar(user2)
            let apiUrl = `https://api.stellarwa.xyz/generate/ship?avatar1=${encodeURIComponent(avatar1)}&avatar2=${encodeURIComponent(avatar2)}&background=${encodeURIComponent(defaultBg)}&key=${key}`
            let res = await fetch(apiUrl, { timeout: 20000 }); let buffer = await res.buffer()
            let porcentaje = Math.floor(Math.random() * 101)
            let explicacion = porcentaje < 20? `Hay 0 química 😅` : porcentaje < 40? `Poca compatibilidad 💛` : porcentaje < 60? `Hay algo ahí ✨` : porcentaje < 80? `Buena conexión ❤️` : porcentaje < 100? `Compatibilidad altísima 💖` : `100% ALMAS GEMELAS 💍`
            await conn.sendMessage(m.chat, {
                image: buffer,
                caption:
`‧˚꒰👛୭ *_𝐒 𝐇 𝐈 𝐏 𝐑𝐄𝐒𝐔𝐋𝐓_*

╭───COMPATIBILIDAD ꒰💘꒱────╮
‧˚꒰💘୭ @${user1.split('@')[0]} + @${user2.split('@')[0]}
‧˚꒰💘୭ ${porcentaje}%
‧˚꒰🍨୭ ${explicacion}
╰─────── ݁ ˖Ი𐑼⋆────╯`,
                mentions: [user1, user2]
            })
        } catch (e) {
            await react('❌')
            m.reply(
`‧˚꒰👛୭ *_𝐒 𝐇 𝐈 𝐏_*

꒰🍧꒱ Error al generar mi reina`
            )
        }
    }

    // ===== SECURITY =====
    if (m.message?.extendedTextMessage?.text?.includes('security') || m.text?.includes('security')) {
        let who = m.mentionedJid[0] || m.quoted?.sender || m.sender
        let pp = await getAvatar(who)
        let createdTimestamp = Date.now()
        let apiUrl = `https://api.stellarwa.xyz/generate/security?avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(defaultBg)}&createdTimestamp=${createdTimestamp}&key=${key}`
        await react('🔍')
        await m.reply(
`‧˚꒰👛୭ *_𝐒 𝐄 𝐁𝐔𝐒𝐂𝐀_*

╭───GENERANDO ꒰🚨꒱────╮
꒰🌼꒱ Creando cartel para @${who.split('@')[0]}...
╰─────── ݁ ˖Ი𐑼⋆────╯`, { mentions: [who] })
        try {
            let res = await fetch(apiUrl, { timeout: 30000 }); let buffer = await res.buffer()
            await conn.sendMessage(m.chat, {
                image: buffer,
                caption:
`‧˚꒰👛୭ *_𝐒 𝐄 𝐁𝐔𝐒𝐂𝐀_*

╭───CARTEL ꒰💰꒱────╮
‧˚꒰🚨୭ @${who.split('@')[0]}
‧˚꒰💰୭ Recompensa: 1,000,000$ 💅
╰─────── ݁ ˖Ი𐑼⋆────╯`,
                mentions: [who]
            })
        } catch (e) {
            await react('❌')
            m.reply(
`‧˚꒰👛୭ *_𝐒 𝐄 𝐁𝐔𝐒𝐂𝐀_*

꒰🍧꒱ Error al generar mi reina`
            )
        }
    }

    // ===== RANK2 =====
    if (m.message?.extendedTextMessage?.text?.includes('rank') || m.text?.includes('rank')) {
        let who = m.mentionedJid[0] || m.quoted?.sender || m.sender
        let name = await getName(who)
        let pp = await getAvatar(who)
        let level = Math.floor(Math.random() * 100) + 1
        let rank = Math.floor(Math.random() * 500) + 1
        let currxp = Math.floor(Math.random() * 5000)
        let needxp = currxp + Math.floor(Math.random() * 2000) + 1000
        let apiUrl = `https://api.stellarwa.xyz/generate/rank2?username=${encodeURIComponent(name)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(defaultBg)}&level=${level}&rank=${rank}&currxp=${currxp}&needxp=${needxp}&key=${key}`
        await react('📊')
        await m.reply(
`‧˚꒰👛୭ *_𝐑 𝐀 𝐍 𝐊_*

╭───GENERANDO ꒰📊꒱────╮
꒰🌼꒱ Creando tarjetita para @${who.split('@')[0]}...
╰─────── ݁ ˖Ი𐑼⋆────╯`, { mentions: [who] })
        try {
            let res = await fetch(apiUrl, { timeout: 30000 }); let buffer = await res.buffer()
            await conn.sendMessage(m.chat, {
                image: buffer,
                caption:
`‧˚꒰👛୭ *_𝐑 𝐀 𝐍 𝐊_*

╭───ESTADÍSTICAS ꒰🎮꒱────╮
‧˚꒰👧🏻୭ @${who.split('@')[0]}
‧˚꒰🌼୭ Nivel: ${level}
‧˚꒰🏷️୭ Rank: #${rank}
‧˚꒰✨୭ XP: ${currxp}/${needxp}
╰─────── ݁ ˖Ი𐑼⋆────╯`,
                mentions: [who]
            })
        } catch (e) {
            await react('❌')
            m.reply(
`‧˚꒰👛୭ *_𝐑 𝐀 𝐍 𝐊_*

꒰🍧꒱ Error al generar mi reina`
            )
        }
    }
}

handler.help = ['horny @tag', 'ship @tag1 @tag2', 'security @tag', 'rank @tag']
handler.tags = ['diversión']
handler.command = ['horny', 'ship', 'security', 'rank']
export default handler