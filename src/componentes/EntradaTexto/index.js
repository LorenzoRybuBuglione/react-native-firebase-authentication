import { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import estilos from "./estilos";

export function EntradaTexto({
  label,
  value,
  onChangeText,
  secureTextEntry,
  error,
  messageError,
  keyboardType,
}) {
  const [secureMode, setSecureMode] = useState(secureTextEntry);

  const showError = value == null || error == true;

  return (
    <>
      <TextInput
        label={label}
        value={value}
        error={showError}
        secureTextEntry={secureMode}
        onChangeText={onChangeText}
        style={estilos.input}
        keyboardType={keyboardType}
        mode="outlined"
        activeOutlineColor="#1E8187"
        right={
          secureTextEntry ? (
            <TextInput.Icon
              name={secureMode ? "eye-off" : "eye"}
              onPress={() => setSecureMode(!secureMode)}
            />
          ) : null
        }
      />
      {showError && (
        <HelperText type="error" visible={showError}>
          {messageError}
        </HelperText>
      )}
    </>
  );
}
