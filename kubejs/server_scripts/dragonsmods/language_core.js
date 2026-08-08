// ============================================================
// DragonsMods - Language Core v0.5
// Project Infinity
// ============================================================

// ============================================================
// FUNÇÕES INTERNAS
// ============================================================

// Verifica se o jogador já escolheu um idioma
function hasChosenLanguage(player) {
  const lang = player.persistentData.getString('dragonsmods_language')

  return global.DRAGONSMODS_CONFIG.language.supported.includes(lang)
}

// Retorna o idioma atual
function getLanguage(player) {
  const lang = player.persistentData.getString('dragonsmods_language')

  if (global.DRAGONSMODS_CONFIG.language.supported.includes(lang)) {
    return lang
  }

  // Português como fallback
  return global.DRAGONSMODS_CONFIG.language.default
}


// Salva o idioma escolhido
function setLanguage(player, lang) {
  player.persistentData.putString(
    'dragonsmods_language',
    lang
  )

  global.DRAGONSMODS_LOGGER.info(
    `Idioma do jogador ${player.username} alterado para ${lang}`
  )
}

// ============================================================
// CENTRAL DE TRADUÇÕES
// ============================================================

function translate(player, key, variables) {

  const lang = getLanguage(player)
  const translations = global.DRAGONSMODS_TRANSLATIONS

  if (!translations || !translations[key]) {
    return `[MISSING TRANSLATION: ${key}]`
  }

  let message =
    translations[key][lang] ||
    translations[key]['pt_br'] ||
    `[MISSING LANGUAGE: ${key}]`

  if (variables) {
    Object.keys(variables).forEach(variable => {
      message = message.replace(
        new RegExp(`\\{${variable}\\}`, 'g'),
        variables[variable]
      )
    })
  }

  return message
}


function sendTranslatedMessage(player, key, variables) {
  player.tell(
    translate(player, key, variables)
  )
}


// Reset para testes
function resetLanguage(player) {
  player.persistentData.remove('dragonsmods_language')

  global.DRAGONSMODS_LOGGER.debug(
    `Idioma do jogador ${player.username} foi resetado`
  )
}

// ============================================================
// TELA DE ESCOLHA DE IDIOMA
// ============================================================

function showLanguageSelection(player) {

  player.tell(' ')
  player.tell('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  player.tell(Text.of('🐉 DRAGONSMODS — PROJECT INFINITY').lightPurple().bold(true))
  player.tell(' ')

  player.tell('Bem-vindo! / Welcome! / ¡Bienvenido!')
  player.tell(' ')
  player.tell('Escolha seu idioma / Choose your language / Elige tu idioma')
  player.tell(' ')

  player.tell(
    Text.of('[ 🇧🇷 PORTUGUÊS ]')
      .green()
      .bold(true)
      .click('run_command:/idioma portugues')
      .hover('Clique para escolher Português')
  )

  player.tell(
    Text.of('[ 🇺🇸 ENGLISH ]')
      .aqua()
      .bold(true)
      .click('run_command:/language english')
      .hover('Click to choose English')
  )

  player.tell(
    Text.of('[ 🇪🇸 ESPAÑOL ]')
      .yellow()
      .bold(true)
      .click('run_command:/lenguaje espanol')
      .hover('Haz clic para elegir Español')
  )

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
  const currentLang = getLanguage(player)

  if (currentLang === 'pt_br') {
    sendTranslatedMessage(player, 'language.current.pt_br')
  } else if (currentLang === 'en_us') {
    sendTranslatedMessage(player, 'language.current.en_us')
  } else if (currentLang === 'es_es') {
    sendTranslatedMessage(player, 'language.current.es_es')
  }

  sendTranslatedMessage(player, 'language.help')

  return 1
})


      // Português
      .then(
        Commands.literal('portugues')
          .executes(ctx => {

            const player = ctx.source.player

            
        setLanguage(player, 'pt_br')

        sendTranslatedMessage(player, 'language.selected.pt_br')
        sendTranslatedMessage(player, 'system.welcome')
            return 1
          })
      )


      // English
.then(
  Commands.literal('english')
    .executes(ctx => {

      const player = ctx.source.player

      setLanguage(player, 'en_us')

      sendTranslatedMessage(player, 'language.selected.en_us')
      sendTranslatedMessage(player, 'system.welcome')

      return 1
    })
)


      // Español
.then(
  Commands.literal('espanol')
    .executes(ctx => {

      const player = ctx.source.player

      setLanguage(player, 'es_es')

      sendTranslatedMessage(player, 'language.selected.es_es')
      sendTranslatedMessage(player, 'system.welcome')

      return 1
    })
)

      // Reset do idioma
      .then(
        Commands.literal('reset')
          .executes(ctx => {

            const player = ctx.source.player

            resetLanguage(player)

            player.tell('Idioma removido. Saia e entre novamente para testar a seleção inicial.')

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