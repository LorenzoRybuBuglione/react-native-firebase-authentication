import React, { useState } from "react";
import { View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/auth";
import { Alerta } from "../../componentes/Alerta";
import { alteraDados, verificaEntradasVazias } from "../../utils/comum";

export default function Cadastro({ navigation }) {
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const entradas = [
    {
      name: "email",
      label: "E-mail",
      messageError: "O e-mail é obrigatório",
      secureTextEntry: false,
    },
    {
      name: "senha",
      label: "Senha",
      messageError: "A senha é obrigatória",
      secureTextEntry: true,
    },
    {
      name: "confirmaSenha",
      label: "Confirmar Senha",
      messageError: "As senha não conferem",
      secureTextEntry: true,
    },
  ];

  function verificaIgualdadeDasSenhas() {
    return dados.senha != dados.confirmaSenha;
  }

  async function realizarCadastro() {
    if (verificaEntradasVazias(dados, setDados)) return;
    if (dados.senha != dados.confirmaSenha) {
      setStatusError(true);
      setMensagemError("As senhas não conferem");
      return;
    }

    const resultado = await cadastrar(dados.email, dados.senha);
    if (resultado != "sucesso") {
      setStatusError(true);
      setMensagemError(resultado);
    }
  }

  return (
    <View style={estilos.container}>
      {entradas.map((entrada) => {
        return (
          <EntradaTexto
            key={entrada.name}
            {...entrada}
            value={dados[entrada.name]}
            onChangeText={(valor) =>
              alteraDados(entrada.name, valor, dados, setDados)
            }
            error={
              entrada.name != "confirmaSenha"
                ? false
                : verificaIgualdadeDasSenhas() && dados.confirmaSenha != ""
            }
          />
        );
      })}

      <Alerta
        mensagem={mensagemError}
        error={statusError}
        setError={setStatusError}
      />

      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
