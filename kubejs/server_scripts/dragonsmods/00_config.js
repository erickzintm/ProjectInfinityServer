// ============================================================
// DragonsMods - Core Configuration
// Project Infinity
// ============================================================

global.DRAGONSMODS_CONFIG = {

  server: {
    name: 'DragonsMods',
    project: 'Project Infinity',
    version: '0.1.0'
  },

  language: {
    default: 'pt_br',
    supported: [
      'pt_br',
      'en_us',
      'es_es'
    ]
  },
  
  economy: {
  enabled: true,

  currency: {
    name: 'Dracoin',
    plural: 'Dracoins',
    symbol: 'Ð',
    code: 'DRC'
  },

  startingBalance: 0
},

  debug: {
    enabled: true
  }

}

console.info('[DragonsMods] Core Configuration carregado.')