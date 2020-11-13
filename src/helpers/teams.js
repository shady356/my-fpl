import store from '@/store/index.js'

export const $getTeamById = (teamId) => {
  const teams = store.state.bootstrap.teams
  return teams.find(team => {
    return teamId === team.id
  })
}
export const $getTeamPlayersByTeamCode = (teamCode) => {
  const allPlayers = store.state.bootstrap.elements
  return allPlayers.filter(player => {
    return player.team_code === teamCode
  })
}