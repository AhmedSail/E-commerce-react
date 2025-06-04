import { io } from "socket.io-client";

const socket = io("https://e-commer-notifications.onrender.com", {
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
