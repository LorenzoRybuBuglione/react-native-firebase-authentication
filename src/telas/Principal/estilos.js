import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 25,
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20,
  },
  ordenarContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tituloOrdenar: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  botoesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  botao: {
    borderColor: "#1E8187",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 100,
    borderWidth: 2,
    marginHorizontal: 5,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
