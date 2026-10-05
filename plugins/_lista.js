import fs from 'fs'
import path from 'path'

const DB_FOLDER = './src/database/listas'

if (!fs.existsSync(DB_FOLDER)) fs.mkdirSync(DB_FOLDER, { recursive: true })

let handler = async (m, { conn, text }) => {
    const chatId = m.chat // ID del grupo para separar listas
    const db = path.join(DB_FOLDER, `${chatId}.json`)

    // Crear archivo del grupo si no existe
    if (!fs.existsSync(db)) fs.writeFileSync(db, JSON.stringify([]))

    let data = JSON.parse(fs.readFileSync(db))

    // Fecha y día de Perú
    let now = new Date()
    let fecha = now.toLocaleDateString('es-PE', { timeZone: 'America/Lima', weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
    let diaSemana = now.toLocaleDateString('es-PE', { timeZone: 'America/Lima', weekday: 'long' }).toLowerCase()

    let diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

    const react = async (text) => {
        try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
    }

    //.verlista = MOSTRAR TODOS LOS DÍAS LUNES A SÁBADO
    if (m.message?.extendedTextMessage?.text?.includes('verlista') || m.text?.includes('verlista')) {
        await react('📋')
        let tabla =
`‧˚꒰👛୭ *_𝐋 𝐈 𝐒 𝐓 𝐀 𝐒𝐄𝐌𝐀𝐍𝐀𝐋_*

╭───REGISTROS ꒰📅꒱────╮
꒰🌼꒱ Periodo: Lunes a Sábado
꒰🍨꒱ Actualizado: ${fecha}
╰─────── ݁ ˖Ი𐑼⋆────╯
`

        diasSemana.forEach(dia => {
            let anotadosDelDia = data.filter(v => v.dia.toLowerCase().includes(dia))
            tabla += `\n╭───${dia.toUpperCase()} ꒰🍧꒱────╮\n`

            if (anotadosDelDia.length === 0) {
                tabla += `꒰🍨꒱ Sin anotados aún\n╰─────── ݁ ˖Ი𐑼⋆────╯\n`
            } else {
                anotadosDelDia.forEach((v, i) => {
                    tabla += `‧˚꒰🌼୭ ${i+1}. ${v.nombre} [${v.rol}]\n`
                    tabla += `꒰📱꒱ ${v.numero}\n`
                    tabla += `꒰📅꒱ ${v.dia}\n\n`
                })
                tabla += `╰─────── ݁ ˖Ი𐑼⋆────╯\n`
            }
        })
        tabla += `\n‧˚꒰👛୭ Total: ${data.length} registros ✨`
        return conn.sendMessage(m.chat, { text: tabla.trim() }, { quoted: m })
    }

    //.lista = ANOTAR
    if (m.message?.extendedTextMessage?.text?.includes('lista') || m.text?.includes('lista')) {
        if (!diasSemana.includes(diaSemana)) {
            await react('⛔')
            let fueraHorario =
`‧˚꒰👛୭ *_𝐅𝐔𝐄𝐑𝐀 𝐃𝐄 𝐇𝐎𝐑𝐀𝐑𝐈𝐎_*

╭───AVISO ꒰⛔꒱────╮
꒰🍧꒱ Solo se puede anotar de
꒰🌼꒱ Lunes a Sábado preciosa
╰─────── ݁ ˖Ი𐑼⋆────╯`
            return conn.sendMessage(m.chat, { text: fueraHorario }, { quoted: m })
        }

        if (!text) {
            await react('❌')
            let formato =
`‧˚꒰👛୭ *_𝐋 𝐈 𝐒 𝐓 𝐀_*

╭───FORMATO ꒰📝꒱────╮
꒰🍨꒱ Envía: Nombre/Numero/Rol
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───EJEMPLO ꒰🌼꒱────╮
꒰🌼꒱ fetsy/618282/bot
╰─────── ݁ ˖Ი𐑼⋆────╯`
            return conn.sendMessage(m.chat, { text: formato }, { quoted: m })
        }

        let [nombre, numero, rol] = text.split('/').map(v => v.trim())
        if (!nombre ||!numero ||!rol) {
            await react('❌')
            let faltan =
`‧˚꒰👛୭ *_𝐅𝐀𝐋𝐓𝐀𝐍 𝐃𝐀𝐓𝐎𝐒_*

╭───FORMATO ꒰🍧꒱────╮
꒰🍨꒱ Nombre/Numero/Rol
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───EJEMPLO ꒰🌼꒱────╮
꒰🌼꒱ fetsy/618282/bot
╰─────── ݁ ˖Ი𐑼⋆────╯`
            return conn.sendMessage(m.chat, { text: faltan }, { quoted: m })
        }

        let yaAnotado = data.find(v => v.numero === numero && v.dia === fecha)
        if (yaAnotado) {
            await react('⚠️')
            let duplicado =
`‧˚꒰👛୭ *_𝐘𝐀 𝐀𝐍𝐎𝐓𝐀𝐃𝐎_*

╭───AVISO ꒰⚠️꒱────╮
꒰🍧꒱ ${nombre} ya fue anotado hoy
꒰🌼꒱ ${fecha}
╰─────── ݁ ˖Ი𐑼⋆────╯`
            return conn.sendMessage(m.chat, { text: duplicado }, { quoted: m })
        }

        data.push({ nombre, numero, rol, dia: fecha })
        fs.writeFileSync(db, JSON.stringify(data, null, 2))
        await react('✅')

        let ok =
`‧˚꒰👛୭ *_𝐀 𝐍 𝐎 𝐓 𝐀 𝐃 𝐎_*

╭───DATOS ꒰📋꒱────╮
‧˚꒰👧🏻୭ Nombre: ${nombre}
‧˚꒰📱୭ Número: ${numero}
‧˚꒰💼୭ Rol: ${rol}
‧˚꒰📅୭ Día: ${fecha}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Anotado con éxito preciosa ✨`
        return conn.sendMessage(m.chat, { text: ok }, { quoted: m })
    }
}

handler.help = ['lista nombre/numero/rol', 'verlista']
handler.tags = ['grupo']
handler.command = /^(lista|verlista)$/i
handler.group = true
export default handler