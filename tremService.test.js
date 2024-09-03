const sendDirections = require("./services/tremService");

describe("sendDirections", () => {
  test("deve retornar sucesso com as direções válidas", async () => {
    const directions = { directions: ["ESQUERDA", "DIREITA", "ESQUERDA"] };
    const result = await sendDirections(directions);

    expect(result.success).toBe(true);
    expect(result.commands).toBe("ESQUERDA, DIREITA, ESQUERDA");
    expect(result.initialPosition).toBe(0);
    expect(result.finalPosition).toBe(-1);
  });

  test("deve retornar erro ao exceder o limite de direções", async () => {
    const directions = { directions: new Array(51).fill("ESQUERDA") };
    const result = await sendDirections(directions);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Limite de direções excedido");
  });

  test("deve retornar erro para direções inválidas", async () => {
    const directions = { directions: ["ESQUERDA", "DIREITA", "FRENTE"] };
    const result = await sendDirections(directions);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Direção inválida: FRENTE");
  });

  test("deve retornar erro ao exceder o limite de 20 direções à esquerda", async () => {
    const directions = { directions: new Array(21).fill("ESQUERDA") };
    const result = await sendDirections(directions);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Limite de direções à esquerda excedido");
  });

  test("deve retornar erro ao exceder o limite de 20 direções à direita", async () => {
    const directions = { directions: new Array(21).fill("DIREITA") };
    const result = await sendDirections(directions);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Limite de direções à direita excedido");
  });
});
