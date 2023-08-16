import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { logar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");

  async function realisarLogin() {
    Keyboard.dismiss();
    if (email == "") {
      setMensagemError("O e-mail é obrigatório");
      setStatusError("email");
    } else if (senha == "") {
      setMensagemError("A senha é obrigatória");
      setStatusError("senha");
    } else {
      const resultado = await logar(email, senha);
      if (resultado == "erro") {
        setMensagemError("E-mail ou senha inválidos!");
        setStatusError("firebase");
      } else {
        navigation.navigate("Principal");
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        error={statusError == "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == "firebase"}
        setError={setStatusError}
      />

      <Botao onPress={() => realisarLogin()}>LOGAR</Botao>
      <Botao
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
