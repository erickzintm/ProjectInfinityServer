// DragonsMods - Sistema básico de idiomas

const DRAGONSMODS_LANG = {
  pt_br: {
    selected: 'Idioma alterado para Português.',
    current: 'Seu idioma atual é Português.',
    help: 'Use /idioma portugues ou /idioma english.'
  },

  en_us: {
    selected: 'Language changed to English.',
    current: 'Your current language is English.',
    help: 'Use /idioma portugues or /idioma english.'
  }
}

function getLanguage(player) {
  let lang = player.persistentData.getString('dragonsmods_language')

  if (lang !== 'pt_br' && lang !== 'en_us') {
    lang = 'pt_br'
  }

  return lang
}

function setLanguage(player, lang) {
  player.persistentData.putString('dragonsmods_language', lang)
}

function sendLangMessage(player, key) {
  const lang = getLanguage(player)
  player.tell(DRAGONSMODS_LANG[lang][key])
}

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event

  event.register(
    Commands.literal('idioma')

      .executes(ctx => {
        const player = ctx.source.player

        sendLangMessage(player, 'current')
        sendLangMessage(player, 'help')

        return 1
      })

      .then(
        Commands.literal('portugues')
          .executes(ctx => {
            const player = ctx.source.player

            setLanguage(player, 'pt_br')
            sendLangMessage(player, 'selected')

            return 1
          })
      )

      .then(
        Commands.literal('english')
          .executes(ctx => {
            const player = ctx.source.player

            setLanguage(player, 'en_us')
            sendLangMessage(player, 'selected')

            return 1
          })
      )
  )
})