export const alteraDados = (variavel, valor, dados, setDados) => {
  setDados({
    ...dados,
    [variavel]: valor,
  });
};

export const verificaEntradasVazias = (dados, setDados) => {
  const resposta = false;
  for (const [variavel, valor] of Object.entries(dados)) {
    if (valor == "") {
      setDados({
        ...dados,
        [variavel]: null,
      });
      resposta = true;
    }
  }
  return resposta;
};
