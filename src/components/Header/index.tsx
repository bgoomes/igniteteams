import { Container, Logo, BackIcon, BackButton } from "./style";
import logoImg from "../../../src/assets/Logo.png"
import { useNavigation } from "@react-navigation/native";

type Props ={
    showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props){

    const navigation = useNavigation()

    function handleGoBack(){
        navigation.navigate('groups')
    }

    return (
        <Container>
            {
            showBackButton &&
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg} />
        </Container>
    )
}