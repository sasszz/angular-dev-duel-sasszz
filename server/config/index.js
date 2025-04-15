import Joi from "joi";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ESM-safe __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate NODE_ENV
const nodeEnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production")
    .default("development"),
});

// Validate all other env vars
const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
}).unknown(true);

// Load base env file
dotenv.config({ path: path.join(__dirname, "../.env") });

// Validate NODE_ENV
const { value: nodeEnv, error: envError } = nodeEnvSchema.validate(process.env);
if (envError) {
  throw new Error(`NODE_ENV validation error: ${envError.message}`);
}

// Load env-specific file
dotenv.config({ path: path.join(__dirname, `../.env-${nodeEnv.NODE_ENV}`) });

// Validate remaining vars
const { value: envVars, error: varError } = envVarsSchema.validate(process.env);
if (varError) {
  throw new Error(`Config validation error: ${varError.message}`);
}

// Export config
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};
