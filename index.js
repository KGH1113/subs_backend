// Import the modules
const express = require("express");
const bodyParser = require("body-parser");

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA_iJrZIbWwPzAtWeP3HidzgQJwPRmZ_mY",
  authDomain: "seounbss.firebaseapp.com",
  projectId: "seounbss",
  storageBucket: "seounbss.appspot.com",
  messagingSenderId: "673321926585",
  appId: "1:673321926585:web:16402e692ddbc6e3c6c068",
  measurementId: "G-24YHBKSGYZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Middleware to parse JSON data
app.use(bodyParser.json());

// Function to check if a song request is valid
const isRequestValid = (
  name,
  studentNumber,
  songTitle,
  singer,
  requestedSongs,
  blacklist
) => {
  const currentDateString = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(", ")
    .join("-")
    .split(",")
    .join("");

  console.log(requestedSongs.data);
  console.log(blacklist);

  // Check if it's a weekend (Saturday or Sunday)
  // if (
  //   currentDateString.split("-")[0] === "Sat" ||
  //   currentDateString.split("-")[0] === "Sun"
  // ) {
  //   return "주말에는 신청을 받지 않습니다.";
  // }

  // Check if the maximum limit of 10 requests per day has been reached
  if (requestedSongs.data.length >= 10) {
    return "오늘 신청이 마감되었습니다. (10개)";
  }

  // Check if the same singer is already requested
  if (
    requestedSongs.data.some(
      (song) => song.singer.toUpperCase() === singer.toUpperCase()
    )
  ) {
    return "동일한 가수의 신청곡이 존재합니다.";
  }

  // Check if the same song is already requested
  if (requestedSongs.data.some((song) => song.songTitle === songTitle)) {
    return "동일한 신청곡이 존재합니다.";
  }

  // Check if the name or student number is in the blacklist
  if (
    blacklist.some(
      (item) => item.name === name || item.studentNumber === studentNumber
    )
  ) {
    return "블랙리스트에 등록되신 것 같습니다. 최근 신청 시 주의사항을 위반한 적이 있는지 확인해주세요";
  }

  // Check if the same person has already made a request
  if (
    requestedSongs.data.some(
      (song) => song.name === name && song.studentNumber === studentNumber
    )
  ) {
    return "이미 신청하셨습니다.";
  }

  return ""; // Request is valid
};

// Function: Receive song requests
app.post("/song-request", async (req, res) => {
  const { name, studentNumber, songTitle, singer } = req.body;

  const currentDateString = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .split(", ")
    .join("-")
    .split(" ")
    .join("");

  let newData = { data: [] };
  const songRequestRef = await getDocs(collection(db, "song-request"));
  songRequestRef.forEach((doc) => {
    if (doc.id == currentDateString) {
      newData["data"] = doc.data().data;
    }
  });
  console.log(newData);

  let blacklist = [];
  const blacklistRef = await getDocs(collection(db, "song-request"));
  blacklistRef.forEach((doc) => {
    if (doc.id == "blacklist") {
      blacklist = doc.data().data;
    }
  });

  const requestValidity = isRequestValid(
    name,
    studentNumber,
    songTitle,
    singer,
    newData,
    blacklist
  );

  if (requestValidity) {
    res.status(400).json({ status: "error", message: requestValidity });
  } else {
    newData.data.push({
      name: name,
      studentNumber: studentNumber,
      songTitle: songTitle,
      singer: singer,
      time: new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Seoul",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    });

    const docRef = doc(db, "song-request", currentDateString);
    console.log(newData);
    await setDoc(docRef, newData);

    res.status(200).json({
      status: "success",
      message: "노래가 성공적으로 신청되었습니다!",
    });
  }
});

app.get("/view-request", async (req, res) => {
  const currentDateString = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .split(", ")
    .join("-")
    .split(" ")
    .join("");

  // Retrieve the requested songs for the current date
  const songRequestRef = await getDocs(collection(db, "song-request"));
  songRequestRef.forEach((doc) => {
    if (doc.id == currentDateString) {
      res.json(doc.data().data);
    }
  });
});

app.get("/view-all-requests", async (req, res) => {
  // Complete
  const data = {};
  const songRequestRef = await getDocs(collection(db, "song-request"));
  songRequestRef.forEach((doc) => {
    data[doc.id] = doc.data();
  });
  res.status(200).json(data);
});

app.post("/suggestion-request", async (req, res) => {
  const { name, studentNumber, suggestion } = req.body;

  let suggestion_blacklist = [];
  const suggestionRequestRef = await getDocs(
    collection(db, "suggestion-request")
  );

  let newData = { data: [] };
  suggestionRequestRef.forEach((doc) => {
    if (doc.id == "requests") {
      newData["data"] = doc.data().data;
    }
  });
  console.log(newData);

  suggestionRequestRef.forEach((doc) => {
    if (doc.id == "blacklist") {
      suggestion_blacklist = doc.data().data;
    }
  });

  if (
    suggestion_blacklist.some(
      (item) => item.name === name || item.studentNumber === studentNumber
    )
  ) {
    res
      .status(400)
      .json({ status: "error", message: "블랙리스트에 등록되신 것 같습니다." });
  } else {
    // Add the requested song to the array for the current date
    const docRef = doc(db, "suggestion-request", "requests");
    newData.data.push({
      name: name,
      studentNumber: studentNumber,
      suggestion: suggestion,
      answer: "",
    });
    await setDoc(docRef, newData);
    res.status(200).json({
      status: "success",
      message: "방송부 건의사항이 성공적으로 신청되었습니다!",
    });
  }
});

app.get("/view-suggestion", async (req, res) => {
  const suggestionRef = await getDocs(collection(db, "suggestion-request"));
  suggestionRef.forEach((doc) => {
    if (doc.id === "requests") {
      res.status(200).json(doc.data().data);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Develop log...
//  isRequestValid() -> Complete
//  app.post("/song-request", () => {}) -> Complete
//  app.get("/view-request", () => {}) -> Complete
//  app.get("/view-all-requests", () => {}) -> Complete
//  app.post("/suggestion-request", () => {}) -> Complete
//  app.post("/view-suggestion", () => {}) -> Complete
//  app.post("/", () => {}) -> Complete
