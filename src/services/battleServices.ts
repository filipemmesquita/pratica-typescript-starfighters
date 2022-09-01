import axios, { AxiosResponse } from "axios";
import { boolean, string } from "joi";
import * as battleRepository from '../repositories/battleRepository'

export async function doBattle(firstUser:string,secondUser:string) {
    const user1: AxiosResponse = await getFighter(firstUser)
    const user2: AxiosResponse = await getFighter(secondUser)
    const countStarsUser1 = countGithubStars(user1.data)
    const countStarsUser2 = countGithubStars(user2.data)
 

    let result:{winner:any,loser:any,draw:boolean}={winner:null,loser:null,draw:true}
    const isDraw =countStarsUser1===countStarsUser2;
    if(!isDraw){
        result = {
        winner: countStarsUser1>countStarsUser2? firstUser:secondUser,
        loser: countStarsUser1<countStarsUser2? firstUser:secondUser,
        draw: false
        }
    }
    await battleRepository.registerFight(result);

}
function countGithubStars(repositories:[]):number{
    const userStars=repositories.reduce((acc,curr:{starGazers_count:number})=> {
        return acc + curr.starGazers_count
    },0)
    return userStars
}  
async function getFighter(user:string){
    return await axios.get(`https://api.github.com/users/${user}/repos`)
}
// export async function getAllFighters(){
//     const getAll = await fighterRepository.getAllFighters()
//     return getAll
// }