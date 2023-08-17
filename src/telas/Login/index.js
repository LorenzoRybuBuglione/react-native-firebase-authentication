import React, { useEffect, useState } from "react";
import { Image, Keyboard, View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { auth } from "../../config/firebase";
import { logar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";
import loading from "../../../assets/loading.gif";
import { alteraDados } from "../../utils/comum";

export default function Login({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });
    return () => estadoUsuario();
  }, []);

  async function realisarLogin() {
    Keyboard.dismiss();
    if (dados.email == "") {
      setMensagemError("O e-mail é obrigatório");
      setStatusError("email");
    } else if (dados.senha == "") {
      setMensagemError("A senha é obrigatória");
      setStatusError("senha");
    } else {
      const resultado = await logar(dados.email, dados.senha);
      if (resultado == "erro") {
        setMensagemError("E-mail ou senha inválidos!");
        setStatusError("firebase");
      } else {
        navigation.replace("Principal");
      }
    }
  }

  if (carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={loading} style={estilos.imagem} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={dados.email}
        onChangeText={(valor) => alteraDados("email", valor, dados, setDados)}
        error={statusError == "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={(valor) => alteraDados("senha", valor, dados, setDados)}
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
