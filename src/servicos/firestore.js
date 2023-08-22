import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function salvarProduto(data) {
  try {
    await addDoc(collection(db, "produtos"), data);
    return "ok";
  } catch (e) {
    console.log(e);
    return "erro";
  }
}

export async function pegarProdutos() {
  try {
    const resposta = await getDocs(collection(db, "produtos"));
    let produtos = [];
    resposta.forEach((doc) => {
      let produto = {
        id: doc.id,
        ...doc.data(),
      };
      produtos.push(produto);
    });
    return produtos;
  } catch (e) {
    console.log(e);
    return [];
  }
}