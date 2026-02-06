// src/data/seriesMap.ts

export const seriesMap = new Map<string, string>([
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["10", "10"],
  ["11", "11"],
  ["12", "いろは"],
  ["13", "カーニバル"],
  ["14", "FEVER!"],
  ["15", "ADVENTURE"],
  ["16", "PARTY♪"],
  ["17", "THE MOVIE"],
  ["18", "せんごく列伝"],
  ["19", "TUNE STREET"],
  ["20", "fantasia"],
  ["21", "Sunny Park"],
  ["22", "ラピストリア"],
  ["23", "éclale"],
  ["24", "うさ猫"],
  ["25", "peace"],
  ["26", "解明リドルズ"],
  ["27", "Unilab"],
  ["28", "Jam&Fizz"],
  ["29", "High☆Cheers!!"],
  ["99", "家庭用"]
]);

export const getSeriesName = (version: number): string => {
  return seriesMap.get(version.toString()) || "その他";
};
