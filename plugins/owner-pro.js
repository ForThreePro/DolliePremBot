import { exec } from "child_process"

const OWNER_NUMBER = "5218621029907@s.whatsapp.net" // +52 1 862 102 9907
const OWNER_NUMBER2 = "528621029907@s.whatsapp.net" // por si viene sin el 1

let handler = async (m, { conn, command }) => {
    // Solo tu número puede usar esto
    if (![OWNER_NUMBER, OWNER_NUMBER2].includes(m.sender)) return

    const owner = "@dollie.bot"

    // 1. RESET
    if (command === 'reset') {
        await m.react('🔄')
        await m.reply(
`‧˚꒰👛୭ *_𝐑 𝐄 𝐈 𝐍 𝐈 𝐂 𝐈 𝐀 𝐍 𝐃 𝐎_*

╭───RESET ꒰🔄꒱────╮
‧˚꒰🌼୭ Estado: Reiniciando sistema
‧˚꒰⏳୭ Por favor espere...
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Iniciando de nuevo 💅`)
        process.send('reset')
    }

    // 2. AUTOADMIN
    if (command === 'autoadmin') {
        try {
            await m.react('👑')
            await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'promote')
            await m.reply(
`‧˚꒰👛୭ *_𝐀 𝐔 𝐓 𝐎 𝐀 𝐃 𝐌 𝐈 𝐍_*

╭───ADMIN ꒰👑꒱────╮
‧˚꒰🌼୭ Estado: Admin asignado
‧˚꒰🌼୭ Ya tengo permisos en este grupo
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Puedo administrar correctamente ✨`)
        } catch (e) {
            await m.react('❌')
            m.reply(
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

꒰🍧꒱ No pude asignarme admin
꒰🍧꒱ Revisa que ya no sea admin o que tengas permisos`)
        }
    }

    // 3. UPDATE / ACTUALIZAR / FIX
    if (command === 'update' || command === 'actualizar' || command === 'fix') {
        if (m.react) await m.react('🌀')

        await conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐀 𝐂 𝐓 𝐔 𝐀 𝐋 𝐈 𝐙 𝐀 𝐍 𝐃 𝐎_*

╭───UPDATE ꒰🌀꒱────╮
‧˚꒰🌼୭ Estado: Bajando cambios del repo
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Espere un momento preciosa`, m)

        exec('git pull', async (err, stdout, stderr) => {
            if (err) {
                if (m.react) await m.react('❌')
                return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐄 𝐑 𝐑 𝐎 𝐑_*

╭───FALLO ꒰❌꒱────╮
‧˚꒰🌼୭ Fallo en la actualización
╰─────── ݁ ˖Ი𐑼⋆────╯

\`\`${err.message}\`\`

꒰🍧꒱ Contacta a: ${owner}`, m)
            }

            if (stdout.includes('Already up to date.')) {
                if (m.react) await m.react('✅')
                return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐀 𝐂 𝐓 𝐔 𝐀 𝐋 𝐈 𝐙 𝐀 𝐃 𝐎_*

╭───UP TO DATE ꒰✅꒱────╮
‧˚꒰🌼୭ El sistema ya está actualizado
‧˚꒰🌼୭ Versión: Más reciente
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ No hay cambios nuevos ✨`, m)
            }

            if (m.react) await m.react('✅')
            return conn.reply(m.chat,
`‧˚꒰👛୭ *_𝐀 𝐂 𝐓 𝐔 𝐀 𝐋 𝐈 𝐙 𝐀 𝐂 𝐈 𝐎 𝐍_*

╭───EXITOSA ꒰✅꒱────╮
‧˚꒰🌼୭ Cambios aplicados correctamente
╰─────── ݁ ˖Ი𐑼⋆────╯

╭───DETALLES ꒰📦꒱────╮
\`\`${stdout}\`\`
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍨꒱ Sistema actualizado 💅`, m)
        })
    }
}

handler.help = ['reset', 'autoadmin', 'update']
handler.tags = ['owner']
handler.command = ['reset', 'autoadmin', 'update', 'actualizar', 'fix']
handler.rowner = true

export default handler