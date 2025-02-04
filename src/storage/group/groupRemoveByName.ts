import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION, GROUP_COLLECTION } from "../storageConfig";

import { groupGetAll } from "./groupGetAll";

export async function groupRemoveByName(groupName: string) {
    try {
        const storage = await groupGetAll();
        const groups = storage.filter((group) => group !== groupName);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
    } catch (error) {
        console.error(error);
    }
}