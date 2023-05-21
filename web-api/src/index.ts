import "dotenv/config";
import "reflect-metadata";
import { AddressInfo } from "net";
import { app } from "./main";
import { connect } from "./prisma";

async function main() {
    await connect();
    const PORT = process.env.PORT || 0;
    const server = app.listen(PORT, () => {
        const address = server.address() as AddressInfo;
        console.log("listening on port", address.port);
    });
}

main();