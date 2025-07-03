let io;

module.exports = {
    init: (server) => {
        const { Server } = require("socket.io");
        io = new Server(server, {
            cors: {
                origin: "*",
            }
        });

        io.on("connection", (socket) => {
            console.log("✅ A user connected:", socket.id);

            socket.on("join", (userId) => {
                socket.join(userId);
                console.log(`🔐 User ${userId} joined their room`);
            });

            socket.on("disconnect", () => {
                console.log("❌ A user disconnected");
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
};
