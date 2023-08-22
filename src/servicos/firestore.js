import { db } from "../config/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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

export async function atualizarProduto(produtoID, data) {
  try {
    const produtoRef = doc(db, "produtos", produtoID);
    await updateDoc(produtoRef, data);
    return "ok";
  } catch (e) {
    console.log(e);
    return "erro";
  }
}

export async function deletarProduto(produtoID) {
    try {
        const produtoRef = doc(db, "produtos", produtoID);
        await deleteDoc(produtoRef);
        return "ok";
      } catch (e) {
        console.log(e);
        return "erro";
      }
}
