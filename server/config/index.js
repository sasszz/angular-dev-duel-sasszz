import Joi from "joi";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ESM-safe __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load base env file first
dotenv.config({ path: path.join(__dirname, "../.env") });

// Validate NODE_ENV specifically
const nodeEnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production")
    .default("development"),
});
const { value: nodeEnv, error: envError } = nodeEnvSchema.validate({
  NODE_ENV: process.env.NODE_ENV,
});
if (envError) {
  throw new Error(`NODE_ENV validation error: ${envError.message}`);
}

// Load env-specific file based on NODE_ENV
dotenv.config({ path: path.join(__dirname, `../.env-${nodeEnv.NODE_ENV}`) });

// Validate required env vars
const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
  GITHUB_TOKEN: Joi.string().required(), // Optional: validate your token too
}).unknown(true);

const { value: envVars, error: varError } = envVarsSchema.validate(process.env);
if (varError) {
  throw new Error(`Config validation error: ${varError.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  githubToken: envVars.GITHUB_TOKEN,
};
