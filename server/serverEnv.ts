import "server-only";
import { z } from "zod";

const ServerEnvSchema = z.object({
  SPOTIFY_CLIENT_ID: z
    .string({ message: "SPOTIFY_CLIENT_ID env var was not specified" })
    .min(1, { message: "SPOTIFY_CLIENT_ID env var string must be non-empty" }),
  SPOTIFY_CLIENT_SECRET: z
    .string({ message: "SPOTIFY_CLIENT_SECRET env var was not specified" })
    .min(1, {
      message: "SPOTIFY_CLIENT_SECRET env var string must be non-empty",
    }),
});

export const serverEnv = ServerEnvSchema.parse(process.env);
