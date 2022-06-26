import { readFileSync, writeFileSync } from 'fs';
const CONFIG_PATH = './config/main.json';
export const readMainConfig = () => JSON.parse(readFileSync(CONFIG_PATH).toString());
export const writeMainConfig = (newSettings) => writeFileSync(CONFIG_PATH, JSON.stringify(newSettings));
