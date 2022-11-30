import AC from "agora-chat";

const appKey = "61437201#506226";

// int
const conn = new AC.connection({
  appKey: appKey,
});

// login function
const loginChat = async () => {
  await conn
    .open({
      user: "ankur",
      agoraToken:
        "007eJxTYBDJ0X/0MNQqK/BMUmtkYSjn2d03fB8wKD4359JfuabWaKECg2WypZGBmYmZQWqSpYlBSmKSZaKRoaFZaqJFkpFlmqVh1PfWZAE+BoabOrtYGRlYGRgZmBhAfAYGABeDG1U=",
    })
    .then(() => {
      console.log("Login success!");
    })
    .catch(() => {
      console.log(`An error occured!`);
    });
};

// create message
const sendMessagePeer = async () => {
  const msg = AC.message.create({
    type: "txt",
    to: "arun",
    msg: "Hey, are you there yet?",
    from: "ankur",
  });

  // send message
  try {
    conn.send(msg).then(() => {
      console.log(`Message send success!`);
    });
  } catch (error) {
    console.log(`An error occured while sending message! Error: ${error}`);
  }
};

// sdk event listner
conn.addEventHandler("connection&message", {
  onConnected: () => {
    console.log("Connected!");
  },
  onDisconnected: () => {
    console.log("Disconnected!");
  },
  onTextMessage: (message) => {
    console.log(`You got a new message:\n
    ${message.from},
    ${message.msg},
    ${message.id}
    `);
  },
  onReceivedMessage: (message) => {
    console.log(`Message received by ${message.to}`);
  },
});

// button events
const btn = document.getElementById("send");
btn.addEventListener("click", sendMessagePeer);

const login = document.getElementById("login");
login.addEventListener("click", loginChat);

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  conn.close();
  console.log("User logout!");
});
