import React, { useEffect, useRef, useState } from "react";
import "asciinema-player/dist/bundle/asciinema-player.css";
import { isVisualRegressionTest } from "src/utils/env";

interface AsciinemaPlayerProps extends AsciinemaPlayerOptions {
  src: string;
}

export function AsciinemaPlayer({
  src,
  autoPlay = true,
  loop = false,
  rows,
  cols,
}: AsciinemaPlayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import("asciinema-player")>();

  useEffect(() => {
    if (!isVisualRegressionTest()) {
      // the import itself uses `window` so need a dynamic import for the server
      import("asciinema-player").then((p) => setPlayer(p));
    }
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    let instance: AsciinemaPlayerInstance;
    if (currentRef && player) {
      instance = player?.create(src, currentRef, {
        autoPlay,
        loop,
        rows,
        cols,
      });
    }

    return () => {
      if (instance) {
        instance?.dispose();
      }
    };
  }, [src, player, autoPlay, loop, rows, cols]);

  return <div ref={ref} className="my-6" />;
}
