// ============================================================
// DragonsMods - Internal API
// Project Infinity
// ============================================================

global.DragonsMods = {

  // ----------------------------------------------------------
  // Informações do servidor
  // ----------------------------------------------------------

  server: {
    getName: function() {
      return global.DRAGONSMODS_CONFIG.server.name
    },

    getProject: function() {
      return global.DRAGONSMODS_CONFIG.server.project
    },

    getVersion: function() {
      return global.DRAGONSMODS_CONFIG.server.version
    }
  },

  // ----------------------------------------------------------
  // Logger
  // ----------------------------------------------------------

  log: {
    info: function(message) {
      global.DRAGONSMODS_LOGGER.info(message)
    },

    warn: function(message) {
      global.DRAGONSMODS_LOGGER.warn(message)
    },

    error: function(message) {
      global.DRAGONSMODS_LOGGER.error(message)
    },

    debug: function(message) {
      global.DRAGONSMODS_LOGGER.debug(message)
    }
  },

  // ----------------------------------------------------------
  // Idiomas
  // ----------------------------------------------------------

  language: {
    getDefault: function() {
      return global.DRAGONSMODS_CONFIG.language.default
    },

    getSupported: function() {
      return global.DRAGONSMODS_CONFIG.language.supported
    },

    isSupported: function(lang) {
      return global.DRAGONSMODS_CONFIG.language.supported.includes(lang)
    }
  }

}

global.DragonsMods.log.info(
  `API carregada - ${global.DragonsMods.server.getProject()} v${global.DragonsMods.server.getVersion()}`
)