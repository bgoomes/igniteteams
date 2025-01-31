import { Alert, FlatList } from "react-native";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { Container, Form, HeadrList, NumberOfPlayers } from "./styles";
import { useEffect, useState } from "react";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "../../storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";

type RouteParams ={
    group: string
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam ] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const { group } = route.params as RouteParams

    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova Pessoa', 'Nome da pessoa não pode ser vazio')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(group, newPlayer)
            fetchPlayersByTeam()
            setNewPlayerName('')
        } catch (error) {
            console.log(error)
            
        }
    }

    async function fetchPlayersByTeam(){
        try {
            const playersByTeam = await playerGetByGroupAndTeam(group, team)

            if(playersByTeam) setPlayers(playersByTeam)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPlayersByTeam()
    },[team])

    return (
        <Container>
            <Header showBackButton/>
            <Highlight title={group} subtitle="adicione a galera e separe os times"/>
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} onChangeText={setNewPlayerName} value={newPlayerName}/>
                <ButtonIcon icon="add" onPress={handleAddPlayer}/>
            </Form>
            <HeadrList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeadrList>
            <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard name={item.name} onRemove={ () => {} }/>
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não há pessoas nesse time."/>
                )}
                showsVerticalScrollIndicator ={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />

            <Button title="Remover Turma" type="SECONDERY"/>
        </Container>
    )
}