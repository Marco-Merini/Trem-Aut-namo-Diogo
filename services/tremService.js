async function sendDirections(directions) {
  const directionsArray = directions.directions;

  try {
    const posicaoFinal = await validateDirection(directionsArray);
    return {
      success: true,
      commands: directionsArray.join(", "),
      initialPosition: 0,
      finalPosition: posicaoFinal,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = sendDirections;

async function validateDirection(directionsArray) {
  let limitadorEsq = 0;
  let limitadorDir = 0;

  let posicaoFinal = 0;

  if (directionsArray.length > 50) {
    throw new Error("Limite de direções excedido");
  }

  for (let direction of directionsArray) {
    if (direction !== "ESQUERDA" && direction !== "DIREITA") {
      throw new Error(`Direção inválida: ${direction}`);
    } else if (direction === "ESQUERDA") {
      limitadorEsq++;
      limitadorDir = 0;
      posicaoFinal--;
      if (limitadorEsq > 20) {
        throw new Error("Limite de direções à esquerda excedido");
      }
    } else if (direction === "DIREITA") {
      limitadorDir++;
      limitadorEsq = 0;
      posicaoFinal++;
      if (limitadorDir > 20) {
        throw new Error("Limite de direções à direita excedido");
      }
    }
  }

  return posicaoFinal;
}
