import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeadrList, NumberOfPlayers } from "./styles";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

import { playerGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { playerAddByGroup } from "../../storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";

type RouteParams ={
    group: string
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam ] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const navigation = useNavigation()
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

    async function handleRemovePlayer(playerName: string){
        try {
            await playerRemoveByGroup(group, playerName)
            fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch (error) {
            
        }
    }

    async function handleRemoveGroup(){
        Alert.alert('Remover', 'Deseja realmente remover essa turma?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => groupRemove()
            }
        ])
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
                    <PlayerCard name={item.name} onRemove={ () => handleRemovePlayer(item.name) }/>
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

            <Button title="Remover Turma" type="SECONDERY" onPress={handleRemoveGroup}/>
        </Container>
    )
}