import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { GroupCard } from '../../components/GroupCard';
import { Header } from '../../components/Header';
import { Highlight } from '../../components/Highlight'
import { Container } from './styles';
import { ListEmpty } from '../../components/ListEmpty';
import { Button } from '../../components/Button';

import { useNavigation } from '@react-navigation/native';
import { groupGetAll } from '../../storage/group/groupGetAll';

export function Groups() {
  const [ groups, setGroups ] = useState<string[]>([])
  const navigation = useNavigation()


  function handleNewGroup(){
    navigation.navigate('new') 
  }
  async function fetchGroups() {
    try {
      const data = await groupGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenGroupe(group: string){
    navigation.navigate('players', {group})
  }

  useEffect(() => {
    fetchGroups()
  },[])

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='Jogue com a sua turma'/>

      <FlatList 
        data={groups} 
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item}
            onPress={() => handleOpenGroupe(item)}
          /> 
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?'/>}
      />
      <Button 
        onPress={handleNewGroup}
        title='Criar nova turma'
      />
    </Container>
  );
}


