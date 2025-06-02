import { io } from "socket.io-client";

const socket = io("http://172.16.5.61:5173", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  timeout: 5000,
});

socket.on("connect", () => {
  console.log("✅ متصل بالسيرفر عبر Socket.IO!");
});

socket.on("connect_error", (error) => {
  console.error("❌ فشل الاتصال بـ Socket.IO:", error);
});

export default socket;
