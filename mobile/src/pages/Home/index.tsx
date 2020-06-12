import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { isBackgroundLocationAvailableAsync } from "expo-location";

const pickerPlaceholderUf = {
  label: "Selecione um estado",
  value: null,
  color: "#9EA0A4",
};

const pickerPlaceholderCity = {
  label: "Selecione uma cidade",
  value: null,
  color: "#9EA0A4",
};

interface Item {
  label: string;
  value: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

function Home() {
  const [uf, setUf] = useState<Item[]>([]);
  const [city, setCity] = useState<Item[]>([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((res) => {
        let ufs: Item[] = [];
        const ufInitials = res.data.map((uf) => uf.sigla);
        ufInitials.map((uf) => ufs.push({ value: uf, label: uf }));
        setUf(ufs);
      });
  }, []);

  useEffect(() => {
    if (!uf) {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        let cites: Item[] = [];
        const cityNames = res.data.map((city) => city.nome);
        cityNames.map((city) => cites.push({ value: city, label: city }));
        setCity(cites);
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate("Points", { selectedUf, selectedCity });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={pickerPlaceholderUf}
            onValueChange={(value) => setSelectedUf(value)}
            items={uf}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Icon
                  name="arrow-down"
                  size={20}
                  color="#9EA0A4"
                  style={{ marginTop: 21, marginRight: 20 }}
                />
              );
            }}
          />
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={pickerPlaceholderCity}
            onValueChange={(value) => setSelectedCity(value)}
            items={city}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Icon
                  name="arrow-down"
                  size={20}
                  color="#9EA0A4"
                  style={{ marginTop: 21, marginRight: 20 }}
                />
              );
            }}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});

export default Home;
