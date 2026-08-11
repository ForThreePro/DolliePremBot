import fs from 'fs'
import os from 'os'
import * as googleTTS from 'google-tts-api'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { tmpdir } from 'os'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    await m.react('⏳')

    if (command === 'cleartmp') {
        const tmpPath = './tmp'
        if (fs.existsSync(tmpPath)) {
            fs.readdirSync(tmpPath).forEach(file => fs.unlinkSync(`${tmpPath}/${file}`))
        }
        let texto = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *LIMPIEZA* 」─╮
│ 🔥 *Estado:* Caché purificado
│ ✅ *Resultado:* Memoria liberada
╰─────────────

├─「 *NOTA* 」─
│ ⚡ *El bot está más ligero*
╰─────────────
> *He limpiado los archivos temporales* 💌`
        await m.react('✅')
        return m.reply(texto)
    }

    if (command === 'cpu') {
        let cpu = os.loadavg()[0].toFixed(2)
        let texto = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *CPU* 」─╮
│ 🌌 *Carga:* ${cpu}%
╰─────────────

├─「 *NOTA* 」─
│ ⚡ *Si supera 90% el bot va lento*
╰─────────────
> *Procesador monitoreado* ✨`
        await m.react('✅')
        return m.reply(texto)
    }

    if (command === 'ram') {
        const used = process.memoryUsage()
        let ram = (used.heapUsed / 1024 / 1024).toFixed(2)
        let texto = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *RAM* 」─╮
│ 🌌 *Uso:* ${ram} MB
╰─────────────

├─「 *NOTA* 」─
│ ⚡ *Memoria usada por el proceso*
╰─────────────
> *Todo bajo control* 💌`
        await m.react('✅')
        return m.reply(texto)
    }

    if (command === 'uptime') {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        let texto = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *UPTIME* 」─╮
│ 🌌 *Tiempo activo:* ${uptime}
╰─────────────

├─「 *NOTA* 」─
│ ⚡ *Desde que se inició el bot*
╰─────────────
> *Llevamos ${uptime} online* ✨`
        await m.react('✅')
        return m.reply(texto)
    }

    if (command === 'info') {
        let _muptime = process.uptime() * 1000
        let muptime = clockString(_muptime)
        const used = process.memoryUsage()
        let cpu = os.loadavg()[0].toFixed(2)
        let ram = (used.heapUsed / 1024 / 1024).toFixed(2)

        let texto = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *REPORTE DE SISTEMA* 」─╮
│ 🌌 *Uptime:* ${muptime}
│ 🌌 *RAM:* ${ram} MB
│ 🌌 *CPU:* ${cpu}%
╰─────────────

├─「 *DETALLES* 」─
│ ⚡ *Estado:* Operativo
│ ⚡ *Dev:* Sebastián Barboza
╰─────────────
> *Todos los sistemas al 100%* 💌`
        await m.react('✅')
        return m.reply(texto)
    }

    if (command === 'tts' || command === 'gtts' || command === 'ttss') {
        let q = m.quoted? m.quoted : m
        let txt = text || q.text || q.caption || q.body || ''

        if (!txt) {
            let texto = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *ERROR* 」─╮
│ ❌ *Falta texto*
╰─────────────

├─「 *USO* 」─
│ 🪄 ${usedPrefix}tts Hola, ¿cómo estás?
│ 🪞 *O responde a un mensaje*
╰─────────────
> *Dime qué quieres que diga* 💌`
            await m.react('❌')
            return m.reply(texto)
        }

        await m.react('🎙️')

        let lang = 'es'
        let url = googleTTS.getAudioUrl(txt, {
            lang: lang,
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        })

        let tmpFilePath = path.join(tmpdir(), `${Date.now()}.opus`)

        await new Promise((resolve, reject) => {
            ffmpeg(url)
              .audioCodec('libopus')
              .toFormat('opus')
              .outputOptions([
                    '-avoid_negative_ts make_zero',
                    '-ac 1',
                    '-b:a 64k'
                ])
              .on('end', () => resolve(true))
              .on('error', (err) => reject(err))
              .save(tmpFilePath)
        })

        let audioBuffer = fs.readFileSync(tmpFilePath)

        let caption = `𝐃𝐎𝐋𝐋𝐈𝐄 𝐁𝐎𝐓. 🩰

╭─「 *TEXT TO SPEECH* 」─╮
│ 🎙️ *Idioma:* Español
│ 🎙️ *Voz:* Google TTS
╰─────────────

├─「 *TEXTO* 」─
│ "${txt}"
╰─────────────
> *Tu texto convertido en audio* ✨`

        await conn.sendMessage(m.chat, {
            audio: audioBuffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: m })

        if (fs.existsSync(tmpFilePath)) fs.unlinkSync(tmpFilePath)
        await m.react('✅')
    }
}

function clockString(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return `${d}d ${h}h ${m}m ${s}s`
}

handler.help = ['cleartmp', 'cpu', 'ram', 'uptime', 'info', 'tts <texto>']
handler.tags = ['main', 'tools']
handler.command = /^(cleartmp|cpu|ram|uptime|info|g?tts|ttss)$/i
handler.rowner = true

export default handler