import React, { useState } from "react";
import { View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";
import { alteraDados } from "../../utils/comum";

export default function Cadastro({ navigation }) {
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  async function realizarCadastro() {
    if (dados.email == "") {
      setMensagemError("O e-mail é obrigatório");
      setStatusError("email");
    } else if (dados.senha == "") {
      setMensagemError("A senha é obrigatória");
      setStatusError("senha");
    } else if (dados.confirmaSenha != dados.senha) {
      setMensagemError("As senha não conferem");
      setStatusError("confirmaSenha");
    } else {
      const resultado = await cadastrar(
        dados.email,
        dados.senha,
        dados.confirmaSenha
      );
      setStatusError("firebase");
      if (resultado == "sucesso") {
        setMensagemError("Usuário cadastrado com sucesso");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
      } else {
        setMensagemError(resultado);
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={dados.email}
        onChangeText={(valor) => alteraDados("email", valor, dados, setDados)}
        error={statusError === "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={(valor) => alteraDados("senha", valor, dados, setDados)}
        secureTextEntry
        error={statusError === "senha"}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={(valor) =>
          alteraDados("confirmaSenha", valor, dados, setDados)
        }
        secureTextEntry
        error={statusError === "confirmaSenha"}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == "firebase"}
        setError={setStatusError}
      />

      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
