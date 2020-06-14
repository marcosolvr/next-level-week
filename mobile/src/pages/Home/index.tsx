import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import {
  Container,
  Main,
  Title,
  Description,
  Button,
  ButtonIcon,
  ButtonText,
  pickerSelectStyles,
} from "./styles";

const pickerPlaceholderUf = {
  label: "Selecione um estado",
  value: null,
};

const pickerPlaceholderCity = {
  label: "Selecione uma cidade",
  value: null,
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
        const ufInitials: Item[] = res.data.map((uf) => ({
          value: uf.sigla,
          label: uf.sigla,
        }));
        setUf(ufInitials);
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
      <Container>
        <Main>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Description>
          </View>
        </Main>

        <View>
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
                  color={pickerSelectStyles.color}
                  style={pickerSelectStyles.icon}
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
                  size={pickerSelectStyles.iconSize}
                  color={pickerSelectStyles.color}
                  style={pickerSelectStyles.icon}
                />
              );
            }}
          />

          <Button onPress={handleNavigateToPoints}>
            <ButtonIcon>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

export default Home;
