import { Header } from "../../components/Header"
import { Container, Content, Icon } from "../../screens/NewGroups/styles"
import { Highlight } from "../../components/Highlight"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { groupCreate } from "../../storage/group/groupCreate"
import { Alert } from "react-native"

export function NewGroups(){
    const [group, setGroup] = useState('')
    const navigation = useNavigation()

    async function handleNew(){
        try {
            if(group.trim().length === 0){
                return Alert.alert('Novo Grupo', 'Nome da turma não pode ser vazio')
            }
            await groupCreate(group)
            navigation.navigate('players', {group})
        } catch (error) {
            
        }
    }
    return (
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon />
                <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas" />
                <Input placeholder="Nome da turma" onChangeText={setGroup}/>
                <Button title="Criar" style={{marginTop: 20}} onPress={handleNew}/>
            </Content>
        </Container>
    )
}