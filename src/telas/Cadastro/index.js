import React, { useState } from "react";
import { Alert, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/requisicoesFirebase";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");

  async function realizarCadastro() {
    if (email == "") {
      setMensagemError("O e-mail é obrigatório");
      setStatusError("email");
    } else if (senha == "") {
      setMensagemError("A senha é obrigatória");
      setStatusError("senha");
    } else if (confirmaSenha != senha) {
      setMensagemError("As senha não conferem");
      setStatusError("confirmaSenha");
    } else {
      const resultado = await cadastrar(email, senha, confirmaSenha);
      if (resultado == "sucesso") {
        Alert.alert("Usuário cadastrado com sucesso!");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
      } else {
        Alert.alert(resultado);
      }
      setStatusError("");
      setMensagemError("");
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
        error={statusError === "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
        error={statusError === "senha"}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={(texto) => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError === "confirmaSenha"}
        messageError={mensagemError}
      />

      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
