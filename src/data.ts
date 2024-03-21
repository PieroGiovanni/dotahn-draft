export enum Rol {
  SafeLane = "Safe Lane",
  MidLane = "Mid Lane",
  OffLane = "Off Lane",
  SoftSupport = "Soft Support",
  HardSupport = "Hard Support",
}

export const Players: Player[] = [
  { id: 1, nick: "Kierrok", mmr: 5600, roles: [Rol.SafeLane] },
  { id: 2, nick: "Legolaz", mmr: 5600, roles: [Rol.HardSupport] },
  { id: 3, nick: "S0br3", mmr: 4446, roles: [Rol.MidLane] },
  { id: 4, nick: "Melody", mmr: 6280, roles: [Rol.MidLane] },
  { id: 5, nick: "Zoom", mmr: 5000, roles: [Rol.MidLane] },
  {
    id: 6,
    nick: "ExT-HN",
    mmr: 1450,
    roles: [Rol.HardSupport, Rol.SoftSupport],
  },
  { id: 7, nick: "Lobo", mmr: 3708, roles: [Rol.SoftSupport] },
  {
    id: 8,
    nick: "Baby Powder",
    mmr: 2650,
    roles: [Rol.SoftSupport, Rol.MidLane],
  },
  { id: 9, nick: "Alex", mmr: 3139, roles: [Rol.SafeLane, Rol.MidLane] },
  { id: 10, nick: "Axalon", mmr: 1744, roles: [Rol.SoftSupport] },
  { id: 11, nick: "Sebas", mmr: 7425, roles: [Rol.MidLane, Rol.SoftSupport] },
  { id: 12, nick: "Lion", mmr: 8011, roles: [Rol.MidLane, Rol.SafeLane] },
  { id: 13, nick: "BOZS", mmr: 5006, roles: [Rol.MidLane] },
  { id: 14, nick: "ΛLΞX", mmr: 7955, roles: [Rol.OffLane] },
  {
    id: 15,
    nick: "nabissor",
    mmr: 3347,
    roles: [Rol.SoftSupport, Rol.OffLane],
  },
  {
    id: 16,
    nick: "Joswe45",
    mmr: 1750,
    roles: [Rol.OffLane],
  },
  {
    id: 17,
    nick: "Sir Rushero-",
    mmr: 3782,
    roles: [Rol.MidLane, Rol.SafeLane],
  },
  { id: 18, nick: "TosH", mmr: 5000, roles: [Rol.SafeLane] },
  { id: 19, nick: "Fonti", mmr: 2554, roles: [Rol.SoftSupport] },
  { id: 20, nick: "xYoyYox", mmr: 2895, roles: [Rol.SoftSupport] },
];
