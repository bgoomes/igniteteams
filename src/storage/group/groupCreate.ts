import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(NewGroup: string) {
    try {
        const storageGroups = await groupGetAll()

        const groupAlreadyExists = storageGroups.includes(NewGroup)
        if(groupAlreadyExists) throw new Error('Group already exists')
        const storage = JSON.stringify([...storageGroups, NewGroup])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    } catch (error) {
        throw error
    }
}