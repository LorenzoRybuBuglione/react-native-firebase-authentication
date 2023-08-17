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
  ];

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });
    return () => estadoUsuario();
  }, []);

  function verificaEntradasVazias() {
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
  }

  async function realisarLogin() {
    Keyboard.dismiss();
    if (verificaEntradasVazias()) return;

    const resultado = await logar(dados.email, dados.senha);
    if (resultado == "erro") {
      setStatusError(true);
      setMensagemError("E-mail ou senha não conferem");
      return;
    }
    navigation.replace("Principal");
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
      {entradas.map((entrada) => {
        return (
          <EntradaTexto
            key={entrada.name}
            {...entrada}
            value={dados[entrada.name]}
            onChangeText={(valor) =>
              alteraDados(entrada.name, valor, dados, setDados)
            }
          />
        );
      })}

      <Alerta
        mensagem={mensagemError}
        error={statusError}
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
