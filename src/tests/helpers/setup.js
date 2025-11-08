import { connectDB, clearDB, closeDB } from "./mongoMemory.js";

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());
