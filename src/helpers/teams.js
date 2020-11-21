import store from '@/store/index.js'

export const $getTeamById = (teamId) => {
  teamId = parseInt(teamId)
  const teams = store.state.bootstrap.teams
  return teams.find(team => {
    return team.id === teamId
  })
}
export const $getTeamColorByTeamCode = (teamCode) => {
  teamCode = parseInt(teamCode)
  switch(teamCode) {
    case  3: return { primary:'#EF0107', secondary: '#063672', text: '#333'}; // Arsenal
    case  7: return { primary:'#670E36', secondary: '#95BFE5', text: '#fff'}; // Aston Villa
    case 36: return { primary:'#0057B8', secondary: '#ffffff', text: '#333'}; // Brighton
    case 90: return { primary:'#6C1D45', secondary: '#99D6EA', text: '#333'}; // Burnley
    case  8: return { primary:'#034694', secondary: '#EE242C', text: '#333'}; // Chelsea
    case 31: return { primary:'#1B458F', secondary: '#C4122E', text: '#333'}; // Crystal Palace
    case 11: return { primary:'#003399', secondary: '#ffffff', text: '#333'}; // Everton
    case 54: return { primary:'#ffffff', secondary: '#cc0000', text: '#333'}; // Fulham
    case 13: return { primary:'#003090', secondary: '#FDBE11', text: '#333'}; // Leicester
    case  2: return { primary:'#AC944D', secondary: '#1D428A', text: '#333'}; // Leeds
    case 14: return { primary:'#C8102E', secondary: '#00B2A9', text: '#333'}; // Liverpool
    case 43: return { primary:'#6CABDD', secondary: '#FFC659', text: '#333'}; // Man City
    case  1: return { primary:'#DA291C', secondary: '#FBE122', text: '#333'}; // Man United
    case  4: return { primary:'#241F20', secondary: '#ffffff', text: '#333'}; // Newcastle
    case 49: return { primary:'#EE2737', secondary: '#0D171A', text: '#333'}; // Sheffield United
    case 20: return { primary:'#D71920', secondary: '#130C0E', text: '#333'}; // Southampton
    case  6: return { primary:'#132257', secondary: '#ffffff', text: '#333'}; // Spurs
    case 35: return { primary:'#122F67', secondary: '#ffffff', text: '#333'}; // West Brom
    case 21: return { primary:'#7A263A', secondary: '#1BB1E7', text: '#333'}; // West Ham
    case 39: return { primary:'#FDB913', secondary: '#231F20', text: '#333'}; // Wolves
  }
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
export const $getFixturesByTeamId = (teamId) => {
  teamId = parseInt(teamId)
  const allFixtures = store.state.fixtures
  return allFixtures.filter(fixture => {
    return fixture.team_a === teamId || fixture.team_h === teamId
  })
}
export const $getTeamCodeByTeamId = (teamId) => {
  teamId = parseInt(teamId)
  const teams = store.state.bootstrap.teams
  const team = teams.find(team => {
    return team.id === teamId
  })
  return team.code
}