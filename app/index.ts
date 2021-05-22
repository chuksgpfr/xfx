import * as Server from "./server";
// import * as Database from "./config/database";
// import * as Configs from "./config";

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});


// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});


const start = async () => {
    try {
        const server = await Server.main()
        await server.start();
        console.log("Server running at:", server.info.uri);
    } catch (err) {
        console.error("Error starting server: ", err.message);
        throw err;
    }
};

start();