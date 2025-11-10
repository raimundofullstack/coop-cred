import request from "supertest";
import app from "../../app.js";
import User from "../../models/User.js";

describe("User Integration - Register", () => {
  it("deve registrar um novo usuário com sucesso", async () => {
    const newUser = {
      name: "teste",
      email: "teste@example.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/register")
      .send(newUser)
      .expect(201);

    // valida o corpo da resposta
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toMatchObject({
      name: newUser.name,
      email: newUser.email,
    });
    expect(response.body.user).not.toHaveProperty("password");

    // valida se realmente foi salvo no banco
    const userInDb = await User.findOne({ email: newUser.email });
    expect(userInDb).toBeTruthy();
    expect(userInDb.name).toBe(newUser.name);
  });

  it("deve retornar 400 se email já cadastrado", async () => {
    const dados = {
      name: "teste",
      email: "teste@example.com",
      password: "123456",
    };

    await request(app).post("/api/users/register").send(dados).expect(201);

    const result = await request(app).post("/api/users/register").send(dados);

    expect(result).toHaveProperty("status", 400);
    expect(result.body.message).toMatch(/Email já cadastrado/i);
  });
});
