// ============================================================
// DragonsMods - Language Core v0.2
// Project Infinity
// ============================================================

// Idiomas suportados
const DRAGONSMODS_LANGUAGES = {
  pt_br: {
    selected: 'Idioma alterado para Português.',
    current: 'Seu idioma atual é Português.',
    help: 'Use /idioma portugues, /idioma english ou /idioma espanol.',
    welcome: 'Bem-vindo ao DragonsMods - Projeto Infinity!',
    choose: 'Escolha seu idioma abaixo:',
    portuguese: 'PORTUGUÊS',
    english: 'ENGLISH',
    spanish: 'ESPAÑOL'
  },

  en_us: {
    selected: 'Language changed to English.',
    current: 'Your current language is English.',
    help: 'Use /idioma portugues, /idioma english or /idioma espanol.',
    welcome: 'Welcome to DragonsMods - Project Infinity!',
    choose: 'Choose your language below:',
    portuguese: 'PORTUGUÊS',
    english: 'ENGLISH',
    spanish: 'ESPAÑOL'
  },

  es_es: {
    selected: 'Idioma cambiado a Español.',
    current: 'Tu idioma actual es Español.',
    help: 'Usa /idioma portugues, /idioma english o /idioma espanol.',
    welcome: '¡Bienvenido a DragonsMods - Proyecto Infinity!',
    choose: 'Elige tu idioma abajo:',
    portuguese: 'PORTUGUÊS',
    english: 'ENGLISH',
    spanish: 'ESPAÑOL'
  }
}


// ============================================================
// FUNÇÕES INTERNAS
// ============================================================

// Verifica se o jogador já escolheu um idioma
function hasChosenLanguage(player) {
  const lang = player.persistentData.getString('dragonsmods_language')

  return (
    lang === 'pt_br' ||
    lang === 'en_us' ||
    lang === 'es_es'
  )
}


// Retorna o idioma atual
function getLanguage(player) {
  const lang = player.persistentData.getString('dragonsmods_language')

  if (
    lang === 'pt_br' ||
    lang === 'en_us' ||
    lang === 'es_es'
  ) {
    return lang
  }

  // Português como fallback
  return 'pt_br'
}


// Salva o idioma escolhido
function setLanguage(player, lang) {
  player.persistentData.putString(
    'dragonsmods_language',
    lang
  )
}


// Envia uma mensagem traduzida
function sendLangMessage(player, key) {
  const lang = getLanguage(player)
  const message = DRAGONSMODS_LANGUAGES[lang][key]

  if (message) {
    player.tell(message)
  }
}


// ============================================================
// TELA DE ESCOLHA DE IDIOMA
// ============================================================

function showLanguageSelection(player) {

  player.tell(' ')
  player.tell('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  player.tell('🐉 DRAGONSMODS — PROJECT INFINITY')
  player.tell(' ')
  player.tell('Bem-vindo! / Welcome! / ¡Bienvenido!')
  player.tell(' ')
  player.tell('Escolha seu idioma:')
  player.tell('Choose your language:')
  player.tell('Elige tu idioma:')
  player.tell(' ')

  player.tell('🇧🇷  /idioma portugues')
  player.tell('🇺🇸  /idioma english')
  player.tell('🇪🇸  /idioma espanol')

  player.tell(' ')
  player.tell('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}


// ============================================================
// PRIMEIRO LOGIN
// ============================================================

PlayerEvents.loggedIn(event => {

  const player = event.player

  // Se ainda não houver idioma salvo
  if (!hasChosenLanguage(player)) {

    showLanguageSelection(player)

  } else {

    // Futuramente poderemos colocar aqui
    // uma mensagem de boas-vindas traduzida.

  }
})


// ============================================================
// COMANDOS DE IDIOMA
// ============================================================

ServerEvents.commandRegistry(event => {

  const { commands: Commands } = event

  // Função que cria a árvore de opções
  function languageOptions(command) {

    return command

      // Apenas /idioma, /language ou /lenguaje
      .executes(ctx => {

        const player = ctx.source.player

        sendLangMessage(player, 'current')
        sendLangMessage(player, 'help')

        return 1
      })


      // Português
      .then(
        Commands.literal('portugues')
          .executes(ctx => {

            const player = ctx.source.player

            setLanguage(player, 'pt_br')

            sendLangMessage(player, 'selected')
            sendLangMessage(player, 'welcome')

            return 1
          })
      )


      // English
      .then(
        Commands.literal('english')
          .executes(ctx => {

            const player = ctx.source.player

            setLanguage(player, 'en_us')

            sendLangMessage(player, 'selected')
            sendLangMessage(player, 'welcome')

            return 1
          })
      )


      // Español
      .then(
        Commands.literal('espanol')
          .executes(ctx => {

            const player = ctx.source.player

            setLanguage(player, 'es_es')

            sendLangMessage(player, 'selected')
            sendLangMessage(player, 'welcome')

            return 1
          })
      )
  }


  // 🇧🇷 Português
  event.register(
    languageOptions(
      Commands.literal('idioma')
    )
  )


  // 🇺🇸 English
  event.register(
    languageOptions(
      Commands.literal('language')
    )
  )


  // 🇪🇸 Español
  event.register(
    languageOptions(
      Commands.literal('lenguaje')
    )
  )

})