import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({ 
        choices: ['development', 'production', 'test'] 
    }),
    MONGO_PATH: str(),
    PORT: port({ default: 3000 }),
  });
}

export default validateEnv;