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
import { pegarProdutos, pegarProdutosTempoReal } from "../../servicos/firestore";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarProdutosDatabase() {
    setRefreshing(true);
    const produtosDatabase = await pegarProdutos();
    setProdutos(produtosDatabase);
    setRefreshing(false);
  }

  useEffect(() => {
    carregarProdutosDatabase();

    pegarProdutosTempoReal(setProdutos);
  }, []);

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logOut={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>
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
              onPress={() => navigation.navigate("DadosProduto", produto)}
            >
              <Produto nome={produto.nome} preco={produto.preco} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </View>
  );
}
