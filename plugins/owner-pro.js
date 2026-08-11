import { exec } from "child_process"

let handler = async (m, { conn, command }) => {
    const owner = "@dollie.bot"

    // 1. RESET
    if (command === 'reset') {
        await m.react('🔄')
        await m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *REINICIANDO* 」─╮
│ 🔄 *Estado:* Reiniciando sistema
│ ⏳ *Por favor espere...*
╰─────────────
> *Iniciando de nuevo* 💌`)
        process.send('reset')
    }

    // 2. AUTOADMIN
    if (command === 'autoadmin') {
        try {
            await m.react('👑')
            await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'promote')
            await m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *AUTOADMIN* 」─╮
│ 👑 *Estado:* Admin asignado
│ ✅ *Ya tengo permisos en este grupo*
╰─────────────
> *Puedo administrar correctamente* ✨`)
        } catch (e) {
            await m.react('❌')
            m.reply(`𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

> ❌ *Error:* No pude asignarme admin. 
> Revisa que ya no sea admin o que tengas permisos`)
        }
    }

    // 3. UPDATE / ACTUALIZAR / FIX
    if (command === 'update' || command === 'actualizar' || command === 'fix') {
        if (m.react) await m.react('🌀')

        await conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ACTUALIZANDO* 」─╮
│ 🌀 *Estado:* Bajando cambios del repositorio
╰─────────────
> *Espere un momento* 💌`, m)

        exec('git pull', async (err, stdout, stderr) => {
            if (err) {
                if (m.react) await m.react('❌')
                return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ERROR* 」─╮
│ ❌ *Fallo en la actualización*
╰─────────────

\`\`${err.message}\`\`

> *Contacta a:* ${owner}`, m)
            }

            if (stdout.includes('Already up to date.')) {
                if (m.react) await m.react('✅')
                return conn.reply(m.chat, `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ACTUALIZADO* 」─╮
│ ✅ *El sistema ya está actualizado*
│ 📦 *Versión:* Más reciente
╰─────────────
> *No hay cambios nuevos* ✨`, m)
            }

            if (m.react) await m.react('✅')
            return conn.reply(m.chat, `𝐃𝐎𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ACTUALIZACIÓN EXITOSA* 」─╮
│ ✅ *Cambios aplicados correctamente*
╰─────────────

├─「 *DETALLES* 」─
\`\`${stdout}\`\`
╰─────────────
> *Sistema actualizado* 💌`, m)
        })
    }
}

handler.help = ['reset', 'autoadmin', 'update']
handler.tags = ['owner']
handler.command = ['reset', 'autoadmin', 'update', 'actualizar', 'fix']
handler.rowner = true

export default handler