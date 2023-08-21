import { useState } from "react";
import { View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from "../../componentes/Botao";
import { Alerta } from "../../componentes/Alerta";
import { salvarProduto } from "../../servicos/firestore";
import estilos from "./estilos";

export default function DadosProduto({ navigation }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  async function salvar() {
    if (nome == "" || preco == "") {
      setMensagem("Por favor, preencha todos os campos");
      setMostrarMensagem(true);
      return;
    }
    const resultado = await salvarProduto({
      nome,
      preco,
    });
    if (resultado == "erro") {
      setMensagem("Erro ao cadastrar o produto");
      setMostrarMensagem(true);
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="Nome do produto"
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />
      <EntradaTexto
        label="Preço do produto"
        value={preco}
        onChangeText={(texto) => setPreco(texto)}
      />
      <Botao onPress={() => salvar()}>Salvar</Botao>
      <Alerta
        mensagem={mensagem}
        error={mostrarMensagem}
        setError={setMostrarMensagem}
      />
    </View>
  );
}
