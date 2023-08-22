import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import { BotaoProduto } from "../../componentes/BotaoProduto";
import { auth } from "../../config/firebase";

import estilos from "./estilos";
import { pegarProdutosTempoReal } from "../../servicos/firestore";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ordem, setOrdem] = useState("nome");

  async function carregarProdutosDatabase() {
    setRefreshing(true);
    await pegarProdutosTempoReal(setProdutos, ordem);
    setRefreshing(false);
  }

  useEffect(() => {
    pegarProdutosTempoReal(setProdutos, ordem);
  }, [ordem]);

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logOut={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>
      <View style={estilos.ordenarContainer}>
        <Text style={estilos.tituloOrdenar}>Ordenar por:</Text>
        <View style={estilos.botoesContainer}>
          <TouchableOpacity
            style={[
              estilos.botao,
              { backgroundColor: ordem == "nome" ? "#1E8187" : "#FFF" },
            ]}
            onPress={() => setOrdem("nome")}
          >
            <Text
              style={[
                estilos.textoBotao,
                { color: ordem == "nome" ? "#FFF" : "#1E8187" },
              ]}
            >
              Nome
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              estilos.botao,
              { backgroundColor: ordem == "preco" ? "#1E8187" : "#FFF" },
            ]}
            onPress={() => setOrdem("preco")}
          >
            <Text
              style={[
                estilos.textoBotao,
                { color: ordem == "preco" ? "#FFF" : "#1E8187" },
              ]}
            >
              Preço
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarProdutosDatabase}
          />
        }
      >
        {produtos?.map((produto) => {
          return (
            <TouchableOpacity
              key={produto.id}
              onPress={() =>
                navigation.navigate("DadosProduto", {
                  id: produto.id,
                  nome: produto.nome,
                  preco: produto.preco.toFixed(2).toString(),
                })
              }
            >
              <Produto nome={produto.nome} preco={produto.preco.toFixed(2)} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </View>
  );
}
