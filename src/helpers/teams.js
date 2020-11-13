import store from '@/store/index.js'

export const $getTeamById = (teamId) => {
  teamId = parseInt(teamId)
  const teams = store.state.bootstrap.teams
  return teams.find(team => {
    return team.id === teamId
  })
}
export const $getTeamPlayersByTeamCode = (teamCode) => {
  const allPlayers = store.state.bootstrap.elements
  return allPlayers.filter(player => {
    return player.team_code === teamCode
  })
}
export const $getTeamBadgeByTeamCode = (teamCode) => {
  return `https://fantasy.premierleague.com/dist/img/badges/badge_${teamCode}_80.png#/`
}