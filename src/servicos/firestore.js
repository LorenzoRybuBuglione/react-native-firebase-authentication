import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function salvarProduto(data) {
  try {
    await addDoc(collection(db, "produtos"), data);
    return "ok";
  } catch (e) {
    console.log(e);
    return "erro";
  }
}
