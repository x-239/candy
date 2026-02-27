import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// override the system DNS servers with public resolvers; this sometimes
// bypasses local DNS resolvers that refuse SRV lookups.
// the setting only affects Node's `dns` module and therefore mongoose's
// built-in lookup logic. if your network blocks all DNS traffic this won’t help,
// but in many setups the OS resolver is the culprit.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("connected to mongoDB");
  } catch (error: any) {
    // DNS SRV lookup refused? optionally try a fallback URL first
    if (error.code === "ECONNREFUSED" && error.message?.includes("querySrv")) {
      console.error(
        "\n  DNS lookup for the MongoDB SRV record was refused.\n" +
          "   This usually means the local DNS resolver is blocking SRV queries.\n",
      );

      const fallback = process.env.MONGO_URL_FALLBACK;
      if (fallback) {
        console.warn(
          "   Attempting to connect using MONGO_URL_FALLBACK instead.\n",
        );
        try {
          await mongoose.connect(fallback);
          isConnected = true;
          console.log("connected to mongoDB via fallback URL");
          return;
        } catch (inner) {
          console.error(
            "   Fallback connection also failed, see error below.\n",
            inner,
          );
        }
      }

      console.error(
        "   Either fix your DNS/network settings or set MONGO_URL_FALLBACK to a\n" +
          "   non-`+srv` connection string (see packages/order-db/src/.env).\n",
      );
    } else {
      console.error(error);
    }
    throw error;
  }
};
