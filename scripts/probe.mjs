// Authoring aid (not shipped): print full PV + score for candidate positions so
// puzzle solution lines can be read straight off the engine. Usage:
//   npx tsx scripts/probe.mjs "<fen>" [depth]
import { spawn } from "node:child_process";
const fen = process.argv[2];
const depth = Number(process.argv[3] || 24);
if (!fen) { console.error('need a FEN'); process.exit(1); }
const child = spawn(process.execPath, ["node_modules/stockfish/bin/stockfish-18-lite-single.js"]);
const send = (c) => child.stdin.write(c + "\n");
let buf = "", out = "";
child.stdout.on("data", (d) => {
  buf += d.toString(); out += d.toString();
  let nl; while ((nl = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
    if (line === "uciok") { send("setoption name MultiPV value 3"); send("isready"); }
    else if (line === "readyok") { send(`position fen ${fen}`); send(`go depth ${depth}`); }
    else if (line.startsWith("bestmove")) {
      const latest = {};
      for (const m of out.matchAll(/multipv (\d+) score (cp|mate) (-?\d+).*? pv (.+)/g)) {
        latest[m[1]] = `mpv${m[1]}: ${m[2]} ${m[3]}  | ${m[4].trim()}`;
      }
      console.log("FEN:", fen);
      Object.keys(latest).sort().forEach((k) => console.log(" ", latest[k]));
      console.log(" bestmove:", line.split(" ")[1]);
      child.kill(); process.exit(0);
    }
  }
});
send("uci");
