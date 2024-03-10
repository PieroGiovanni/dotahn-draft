/// <reference types="vite/client" />

interface Player {
  id: number;
  nick: string;
  mmr: number;
  rol?: Rol;
}

interface Team {
  id: number;
  players: Player[];
}
