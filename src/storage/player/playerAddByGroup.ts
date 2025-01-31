import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO"
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(group: string, newPlayer: PlayerStorageDTO) {
    try {
        const storage = await playersGetByGroup(group)
        const playerAlreadyExists = storage.filter(player => player.name === newPlayer.name)
        if(playerAlreadyExists.length > 0) throw new Error('Player already exists')

        const newStorage = JSON.stringify([...storage, newPlayer])
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newStorage)
    } catch (error) {
        throw error
    }
}