import store from '@/store/index.js'
import { round } from '@/helpers/numbers'

export const $getTeamById = (teamId) => {
  teamId = parseInt(teamId)
  const teams = store.state.bootstrap.teams
  return teams.find(team => {
    return team.id === teamId
  })
}

export const $getTeamColorByTeamCode = (teamCode) => {
  teamCode = parseInt(teamCode)
  switch (teamCode) {
    case 3: return { primary: '#EF0107', secondary: '#063672', teamBackground: '#ffe0e0', text: '#443333' }; // Arsenal
    case 7: return { primary: '#670E36', secondary: '#95BFE5', teamBackground: '#e7aEd6', text: '#332233' }; // Aston Villa
    case 36: return { primary: '#0057B8', secondary: '#ffffff', teamBackground: '#a0d7f8', text: '#333344' }; // Brighton
    case 94: return { primary: '#0057B8', secondary: '#ffffff', teamBackground: '#a0d7f8', text: '#333344' }; // Brentford
    case 90: return { primary: '#6C1D45', secondary: '#99D6EA', teamBackground: '#eCbDd5', text: '#332233' }; // Burnley
    case 8: return { primary: '#034694', secondary: '#EE242C', teamBackground: '#a3c6f4', text: '#333344' }; // Chelsea
    case 31: return { primary: '#1B458F', secondary: '#C4122E', teamBackground: '#9Bb5eF', text: '#333344' }; // Crystal Palace
    case 11: return { primary: '#003399', secondary: '#ffffff', teamBackground: '#60c3f9', text: '#333344' }; // Everton
    case 54: return { primary: '#ffffff', secondary: '#cc0000', teamBackground: '#ffffff', text: '#553333' }; // Fulham
    case 13: return { primary: '#003090', secondary: '#FDBE11', teamBackground: '#5080d0', text: '#332233' }; // Leicester
    case 2: return { primary: '#AC944D', secondary: '#1D428A', teamBackground: '#fCd49D', text: '#333355' }; // Leeds
    case 14: return { primary: '#C8102E', secondary: '#00B2A9', teamBackground: '#f8d0dE', text: '#442233' }; // Liverpool
    case 43: return { primary: '#6CABDD', secondary: '#FFC659', teamBackground: '#8CcBfD', text: '#334455' }; // Man City
    case 1: return { primary: '#DA291C', secondary: '#FBE122', teamBackground: '#fAd9cC', text: '#221111' }; // Man United
    case 4: return { primary: '#241F20', secondary: '#ffffff', teamBackground: '#241F20', text: '#eedddd' }; // Newcastle
    case 45: return { primary: '#241F20', secondary: '#ffffff', teamBackground: '#241F20', text: '#eedddd' }; // Norwich
    case 49: return { primary: '#EE2737', secondary: '#0D171A', teamBackground: '#fEa7b7', text: '#0D171A' }; // Sheffield United
    case 20: return { primary: '#D71920', secondary: '#130C0E', teamBackground: '#f7a9b0', text: '#130C0E' }; // Southampton
    case 6: return { primary: '#132257', secondary: '#ffffff', teamBackground: '#132257', text: '#eeeeff' }; // Spurs
    case 57: return { primary: '#132257', secondary: '#ffffff', teamBackground: '#132257', text: '#eeeeff' }; // Watford
    case 35: return { primary: '#122F67', secondary: '#ffffff', teamBackground: '#122F67', text: '#ddddee' }; // West Brom
    case 21: return { primary: '#7A263A', secondary: '#1BB1E7', teamBackground: '#7A263A', text: '#eedddd' }; // West Ham
    case 39: return { primary: '#FDB913', secondary: '#231F20', teamBackground: '#eDc993', text: '#231F20' }; // Wolves
    default: return { primary: '#FDB913', secondary: '#231F20', teamBackground: '#eDc993', text: '#231F20' }; // Default - Man United
  }
}

export const $getTeamPlayersByTeamCode = (teamCode) => {
  const allPlayers = store.state.bootstrap.elements
  return allPlayers.filter(player => {
    return player.team_code === teamCode
  })
}

export const $getTeamBadgeByTeamCode = (teamCode) => {
  return `https://resources.premierleague.com/premierleague/badges/t${teamCode}.png`
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

export const $getStats = (season) => {
  const data = require(`../stats/stats${season}.json`)
  const teams = []
  const MAX_TEAMS = 20

  for (let i = 0; i < MAX_TEAMS; i++) {
    teams[i] = {
      played: 0,
      pts: 0,
      xpts: 0,
      goals: 0,
      xg: 0,
      ga: 0,
      xga: 0,
      shots: 0,
      sa: 0,
      sot: 0,
      sota: 0,
      deep: 0,
      ppda: 0,
      deep_avg: 0,
      ppda_avg: 0,
      games: []
    }
    const team = data.filter(item => item.team_id == i + 1)

    team.forEach(game => {
      const teamGameData = {
        pts: Number(game.pts),
        x_pts: Number(game.x_pts),
        goals: Number(game.goals),
        xg: Number(game.xg),
        ga: Number(game.ga),
        xga: Number(game.xga),
        chances_percentage: Number(game.chances_percentage),
        deep: Number(game.deep),
        ppda: Number(game.ppda),
        shots: Number(game.shots),
        shots_on_target: Number(game.shots_on_target),
        shots_a: Number(game.shots_a),
        shots_on_target_a: Number(game.shots_on_target_a),
        is_home: game.is_home === "TRUE",
        team_name: game.team_name
      }

      teams[i].played = team.length
      teams[i].pts += teamGameData.pts
      teams[i].xpts += teamGameData.x_pts
      teams[i].goals += teamGameData.goals
      teams[i].ga += teamGameData.ga
      teams[i].xg += teamGameData.xg
      teams[i].xga += teamGameData.xga
      teams[i].shots += teamGameData.shots
      teams[i].sa += teamGameData.shots_a
      teams[i].sot += teamGameData.shots_on_target
      teams[i].sota += teamGameData.shots_on_target_a
      teams[i].deep += teamGameData.deep
      teams[i].ppda += teamGameData.ppda
      teams[i].deep_avg = teams[i].deep / teams[i].played
      teams[i].ppda_avg = teams[i].ppda / teams[i].played

      teams[i].games.push(teamGameData)
    })
  }

  teams.forEach(team => {
    team.xga = round(team.xga, 2)
    team.xg = round(team.xg, 2)
    team.xpts = round(team.xpts, 2)
    team.deep_avg = round(team.deep_avg, 2)
    team.ppda_avg = round(team.ppda_avg, 2)
  })

  return teams
}