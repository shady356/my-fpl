import store from '@/store/index.js'

export const $getPlayerById = (playerId) => {
  playerId = parseInt(playerId)
  const allPlayers = store.state.bootstrap.elements
  return allPlayers.find(player => {
    return player.id === playerId
  })
}
export const $getPlayerPositionByType = (type) => {
  switch (type) {
    case 1: return 'goalkeeper'
    case 2: return 'defense';
    case 3: return 'midfielder';
    case 4: return 'forward';
  }
}
