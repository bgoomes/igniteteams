import { Container, Logo, BackIcon, BackButton } from "./style";
import logoImg from "../../../src/assets/Logo.png"

type Props ={
    showBackButton?: boolean
}


export function Header({ showBackButton = false }: Props){
    return (
        <Container>
            {
            showBackButton && 
                <BackButton>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg} />
        </Container>
    )
}