import { loadProfissional } from "../fetcher/profissionalapi";
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function loginPro(proInfo) {
  try {
        const pros = await loadProfissional();
        for (const pro of pros) {
            if (pro.email === proInfo.email && pro.password === proInfo.password) {
                await AsyncStorage.setItem('proData', JSON.stringify(pro)); 
                ToastAndroid.show("Seja Bem vindo ao app", ToastAndroid.SHORT);
                return true; 
            }
        }
        ToastAndroid.show("Email ou Senha incorretas", ToastAndroid.SHORT);
        return false; 
    } catch (error) {
        ToastAndroid.show("Estamos tendo problemas de rede, tente mais tarde", ToastAndroid.SHORT);
        return false; 
    }
}
const findId = async () => {
  const tPros = await loadProfissional();
  if (tPros == null || tPros.length === 0) {
    return 1; 
  }
  return tPros.length + 1;
};
const quit= async ()=>{
    await AsyncStorage.removeItem('proData');
}
const getProInfos= async ()=>{
  const pro = await await AsyncStorage.getItem('proData')
  return JSON.parse(pro)
}
export { loginPro, quit, getProInfos, findId };
