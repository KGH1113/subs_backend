requestedSongs = { data: [{ singer: "svt" }] };

const singer = "a";

const strProcess = (str) =>
  str
    .toUpperCase()
    .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, "")
    .trim()
    .split(" ")
    .join("");

// Check if the same singer is already requested
const singers = {
  bts_________: ["bts", "방탄소년단", "방탄"],
  bts_jungkook: ["BTS 정국", "bts jungkook", "jungkook", "정국"],
  bts_v_______: [
    "v",
    "방탄소년단 v",
    "방탄소년단 뷔",
    "뷔",
    "방탄 v",
    "방탄 뷔",
  ],
  nct_________: ["nct", "엔시티"],
  nct_u_______: ["엔시티 유", "nct u"],
  seventeen___: ["세븐틴", "seventeen", "SVT"],
};

const isBTS = requestedSongs.data.some((song) =>
  singers.bts_________.some(
    (Singer) => strProcess(song.singer) === strProcess(Singer)
  )
);
const isBTSjungKook = requestedSongs.data.some((song) =>
  singers.bts_jungkook.some(
    (Singer) => strProcess(song.singer) === strProcess(Singer)
  )
);
const isBTSV = requestedSongs.data.some((song) =>
  singers.bts_v_______.some(
    (Singer) => strProcess(song.singer) === strProcess(Singer)
  )
);
const isNct = requestedSongs.data.some((song) =>
  singers.nct_________.some(
    (Singer) => strProcess(song.singer) === strProcess(Singer)
  )
);
const isNCTU = requestedSongs.data.some((song) =>
  singers.nct_u_______.some(
    (Singer) => strProcess(song.singer) === strProcess(Singer)
  )
);
const isSVT = requestedSongs.data.some((song) =>
  singers.seventeen___.some(
    (Singer) => strProcess(song.singer) === strProcess(Singer)
  )
);

let ISbts_________ =
  singers.bts_________.some(
    (Singer) => strProcess(Singer) === strProcess(singer)
  ) && isBTS;
let ISbts_jungkook =
  singers.bts_jungkook.some(
    (Singer) => strProcess(Singer) === strProcess(singer)
  ) && isBTSjungKook;
let ISbts_v_______ =
  singers.bts_v_______.some(
    (Singer) => strProcess(Singer) === strProcess(singer)
  ) && isBTSV;
let ISnct_________ =
  singers.nct_________.some(
    (Singer) => strProcess(Singer) === strProcess(singer)
  ) && isNct;
let ISnct_u_______ =
  singers.nct_u_______.some(
    (Singer) => strProcess(Singer) === strProcess(singer)
  ) && isNCTU;
let ISsvt_________ =
  singers.seventeen___.some(
    (Singer) => strProcess(Singer) === strProcess(singer)
  ) && isSVT;

if (
  requestedSongs.data.some(
    (song) => strProcess(song.singer) === strProcess(singer)
  ) ||
  ISbts_________ ||
  ISbts_jungkook ||
  ISbts_v_______ ||
  ISnct_________ ||
  ISnct_u_______ ||
  ISsvt_________
) {
  console.log("동일한 가수의 신청곡이 존재합니다.");
}

console.log(ISbts_________);
console.log(ISbts_jungkook);
console.log(ISbts_v_______);
console.log(ISnct_________);
console.log(ISnct_u_______);
console.log(ISsvt_________);
