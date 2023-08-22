import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import { BotaoProduto } from "../../componentes/BotaoProduto";
import { auth } from "../../config/firebase";

import estilos from "./estilos";
import { pegarProdutos } from "../../servicos/firestore";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutosDatabase() {
      const produtosDatabase = await pegarProdutos();
      setProdutos(produtosDatabase);
    }

    carregarProdutosDatabase();
  }, []);

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logOut={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>
      {produtos.map((produto) => {
        return <Produto key={produto.id} nome={produto.nome} preco={produto.preco} />;
      })}
      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </View>
  );
}
