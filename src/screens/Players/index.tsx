import { FlatList } from "react-native";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { Container, Form, HeadrList, NumberOfPlayers } from "./styles";
import { useState } from "react";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { useRoute } from "@react-navigation/native";

type RouteParams ={
    group: string
}

export function Players(){
    const [team, setTeam ] = useState('Time')
    const [players, setPlayers] = useState([])

    const route = useRoute()
    const { group } = route.params as RouteParams

    return (
        <Container>
            <Header showBackButton/>
            <Highlight title={group} subtitle="adicione a galera e separe os times"/>
            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false}/>
                <ButtonIcon icon="add"/>
            </Form>
            <HeadrList>
                <FlatList 
                    data={['Time da Manu', 'Pessoas']}
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
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard name={item} onRemove={ () => {} }/>
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