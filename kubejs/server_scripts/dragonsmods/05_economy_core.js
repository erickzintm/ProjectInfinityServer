// ============================================================
// DragonsMods - Economy Core v0.1
// Project Infinity
// ============================================================

const DRAGONSMODS_BALANCE_KEY = 'dragonsmods_balance'


// ------------------------------------------------------------
// Consulta o saldo
// ------------------------------------------------------------

function getBalance(player) {

  if (!player.persistentData.contains(DRAGONSMODS_BALANCE_KEY)) {
    player.persistentData.putDouble(
      DRAGONSMODS_BALANCE_KEY,
      global.DRAGONSMODS_CONFIG.economy.startingBalance
    )
  }

  return player.persistentData.getDouble(DRAGONSMODS_BALANCE_KEY)
}


// ------------------------------------------------------------
// Define o saldo
// ------------------------------------------------------------

function setBalance(player, amount) {

  if (amount < 0) {
    amount = 0
  }

  player.persistentData.putDouble(
    DRAGONSMODS_BALANCE_KEY,
    amount
  )

  return amount
}


// ------------------------------------------------------------
// Adiciona Dracoins
// ------------------------------------------------------------

function addBalance(player, amount) {

  if (amount <= 0) {
    return false
  }

  setBalance(
    player,
    getBalance(player) + amount
  )

  return true
}


// ------------------------------------------------------------
// Remove Dracoins
// ------------------------------------------------------------

function removeBalance(player, amount) {

  if (amount <= 0) {
    return false
  }

  const balance = getBalance(player)

  if (balance < amount) {
    return false
  }

  setBalance(
    player,
    balance - amount
  )

  return true
}


// ------------------------------------------------------------
// Formatação
// ------------------------------------------------------------

function formatDracoins(amount) {
  return Number(amount).toFixed(2)
}


// ------------------------------------------------------------
// API ECONÔMICA
// ------------------------------------------------------------

global.DragonsMods.economy = {

  getBalance: function(player) {
    return getBalance(player)
  },

  setBalance: function(player, amount) {
    return setBalance(player, amount)
  },

  add: function(player, amount) {
    return addBalance(player, amount)
  },

  remove: function(player, amount) {
    return removeBalance(player, amount)
  },

  format: function(amount) {
    return formatDracoins(amount)
  }

}


global.DragonsMods.log.info(
  'Economy Core v0.1 carregado.'
)