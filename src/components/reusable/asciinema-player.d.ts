interface AsciinemaPlayerOptions {
  cols: number;
  rows: number;
  autoPlay?: boolean;
  loop?: boolean;
}

interface AsciinemaPlayer {
  create: (
    src: string,
    element: HTMLElement,
    options: AsciinemaPlayerOptions,
  ) => AsciinemaPlayerInstance;
}

interface AsciinemaPlayerInstance {
  dispose: () => void;
}

declare module "asciinema-player" {
  const player: AsciinemaPlayer;
  // eslint-disable-next-line import/no-default-export
  export = player;
}
