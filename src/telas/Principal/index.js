import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import estilos from "./estilos";
import { auth, db } from "../../config/firebase";

import { addDoc, collection } from "firebase/firestore";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  useEffect(() => {
    async function criarProduto() {
      await addDoc(collection(db, "produtos"), {
        nome: "tenis",
        preco: 250.9,
      });
    }

    criarProduto();
  }, []);

  return (
    <View style={estilos.container}>
      <Cabecalho logOut={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <Produto nome="Tênis" preco="200,00" />
      <Produto nome="Camisa" preco="100,00" />
      <Produto nome="Suplementos" preco="150,00" />
    </View>
  );
}
