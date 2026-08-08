// ============================================================
// DragonsMods - Logger
// Project Infinity
// ============================================================

global.DRAGONSMODS_LOGGER = {

  info: function(message) {
    console.info(`[DragonsMods][INFO] ${message}`)
  },

  warn: function(message) {
    console.warn(`[DragonsMods][WARN] ${message}`)
  },

  error: function(message) {
    console.error(`[DragonsMods][ERROR] ${message}`)
  },

  debug: function(message) {
    if (
      global.DRAGONSMODS_CONFIG &&
      global.DRAGONSMODS_CONFIG.debug.enabled
    ) {
      console.info(`[DragonsMods][DEBUG] ${message}`)
    }
  }

}

global.DRAGONSMODS_LOGGER.info('Sistema de logs carregado.')