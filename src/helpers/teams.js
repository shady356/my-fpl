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

export const $getTeamStats = (teamCode) => {
  teamCode = parseInt(teamCode)
  switch (teamCode) {
    case 3: return getArsenalStats(); // Arsenal
    case 7: return getAstonVillaStats() // Aston Villa
    case 91: return getBournemouthStats() // Bournemouth
    case 94: return getBrentfordStats() // Brentford
    case 36: return getBrightonStats() // Brighton
    case 90: return getBurnleyStats() // Burnley
    case 8: return getChelseaStats() // Chelsea
    case 31: return getCrystalPalaceStats() // Crystal Palace
    case 11: return getEvertonStats() // Everton
    case 54: return getFulhamStats() // Fulham
    case 13: return // Leicester
    case 2: return // Leeds
    case 14: return getLiverpoolStats() // Liverpool
    case 102: return getLutonStats() // Liverpool
    case 43: return getManchesterCityStats() // Man City
    case 1: return getManchesterUnitedStats() // Man United
    case 4: return getNewcastleStats() // Newcastle
    case 17: return getNottinghamForestStats() // Nott Forest
    case 45: return // Norwich
    case 49: return getSheffieldStats()// Sheffield United
    case 20: return // Southampton
    case 6: return getTottenhamStats() // Spurs
    case 57: return // Watford
    case 35: return // West Brom
    case 21: return getWesthamStats() // West Ham
    case 39: return getWolverhamptonStats() // Wolves
  }
}

export const $getStats = (season) => {
  const data = require(`../stats/stats${season}.json`)
  const teams = []

  for (let i = 0; i < 20; i++) {
    teams[i] = {
      played: 0,
      goals: 0,
      ga: 0,
      xg: 0,
      xga: 0,
      games: []
    }
    const team = data.filter(item => item.team_id == i + 1)

    teams[i].played = team.length

    team.forEach(game => {
      const teamGameData = {
        chances_percentage: Number(game.chances_percentage),
        deep: Number(game.deep),
        goals: Number(game.goals),
        ga: Number(game.ga),
        xga: Number(game.xga),
        is_home: game.is_home === "TRUE",
        ppda: Number(game.ppda),
        shots: Number(game.shots),
        shots_on_target: Number(game.shots_on_target),
        x_pts: Number(game.x_pts),
        xg: Number(game.xg),
        team_name: game.team_name
      }

      teams[i].goals += teamGameData.goals
      teams[i].ga += teamGameData.ga
      teams[i].xg += teamGameData.xg
      teams[i].xga += teamGameData.xga

      teams[i].games.push(teamGameData)
    })
  }

  return teams
}


const getArsenalStats = () => {
  return {
    played: 4,
    pts: 10,
    xPts: 8.27,
    g: 8,
    xG: 8.19,
    ga: 4,
    xGa: 3.85,
  }
}

const getAstonVillaStats = () => {
  return {
    played: 4,
    pts: 6,
    xPts: 5.94,
    g: 8,
    xG: 8.18,
    ga: 9,
    xGa: 8.41,
  }
}

const getBournemouthStats = () => {
  return {
    played: 4,
    pts: 2,
    xPts: 2.77,
    g: 4,
    xG: 5.49,
    ga: 8,
    xGa: 10.07,
  }
}

const getBrentfordStats = () => {
  return {
    played: 4,
    pts: 6,
    xPts: 7.94,
    g: 8,
    xG: 9.4,
    ga: 5,
    xGa: 5.02,
  }
}

const getBrightonStats = () => {
  return {
    played: 4,
    pts: 9,
    xPts: 6.57,
    g: 12,
    xG: 10.22,
    ga: 6,
    xGa: 8.43,
  }
}

const getBurnleyStats = () => {
  return {
    played: 3,
    pts: 0,
    xPts: 1.17,
    g: 3,
    xG: 2.61,
    ga: 11,
    xGa: 7.64,
  }
}

const getChelseaStats = () => {
  return {
    played: 4,
    pts: 4,
    xPts: 8.15,
    g: 5,
    xG: 9.24,
    ga: 5,
    xGa: 4.63,
  }
}

const getCrystalPalaceStats = () => {
  return {
    played: 4,
    pts: 7,
    xPts: 6.9,
    g: 5,
    xG: 6.74,
    ga: 4,
    xGa: 4.72,
  }
}

const getEvertonStats = () => {
  return {
    played: 4,
    pts: 1,
    xPts: 6.18,
    g: 2,
    xG: 7.95,
    ga: 8,
    xGa: 7.8,
  }
}

const getFulhamStats = () => {
  return {
    played: 4,
    pts: 4,
    xPts: 1.71,
    g: 4,
    xG: 4.3,
    ga: 10,
    xGa: 11.29,
  }
}

const getLiverpoolStats = () => {
  return {
    played: 4,
    pts: 10,
    xPts: 6.96,
    g: 9,
    xG: 8.14,
    ga: 3,
    xGa: 5.56,
  }
}

const getLutonStats = () => {
  return {
    played: 3,
    pts: 0,
    xPts: 2.28,
    g: 2,
    xG: 4.37,
    ga: 9,
    xGa: 9.01,
  }
}

const getManchesterCityStats = () => {
  return {
    played: 4,
    pts: 12,
    xPts: 9.76,
    g: 11,
    xG: 9.48,
    ga: 2,
    xGa: 2.79,
  }
}

const getManchesterUnitedStats = () => {
  return {
    played: 4,
    pts: 5,
    xPts: 6.24,
    g: 5,
    xG: 8.41,
    ga: 7,
    xGa: 7.13,
  }
}

const getNewcastleStats = () => {
  return {
    played: 4,
    pts: 3,
    xPts: 6.16,
    g: 7,
    xG: 7.1,
    ga: 7,
    xGa: 4.89,
  }
}

const getNottinghamForestStats = () => {
  return {
    played: 4,
    pts: 6,
    xPts: 4.36,
    g: 6,
    xG: 4.45,
    ga: 6,
    xGa: 6.71,
  }
}

const getSheffieldStats = () => {
  return {
    played: 4,
    pts: 1,
    xPts: 1.53,
    g: 4,
    xG: 3.31,
    ga: 7,
    xGa: 10.23,
  }
}

const getTottenhamStats = () => {
  return {
    played: 4,
    pts: 10,
    xPts: 6.96,
    g: 11,
    xG: 8.65,
    ga: 4,
    xGa: 6.5,
  }
}

const getWesthamStats = () => {
  return {
    played: 4,
    pts: 10,
    xPts: 5.96,
    g: 9,
    xG: 7.37,
    ga: 4,
    xGa: 6.52,
  }
}

const getWolverhamptonStats = () => {
  return {
    played: 4,
    pts: 3,
    xPts: 3.88,
    g: 4,
    xG: 6.95,
    ga: 8,
    xGa: 9.35,
  }
}