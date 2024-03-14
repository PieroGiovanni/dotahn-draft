/// <reference types="vite/client" />

interface Player {
  id: number;
  nick: string;
  mmr: number;
  roles?: Rol[];
}

interface Team {
  id: number;
  players: Player[];
}
