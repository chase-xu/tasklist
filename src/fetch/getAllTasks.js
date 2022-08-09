import axios from 'axios';

// export default async function getAllTasks(){
//     try{
//        const  res = await axios.get("http://localhost:8000/api/v1/tasks")
//        console.log(`axios return ${JSON.stringify(res.data)}`)
//        return res.data
//     }catch(err){
//         return null
//     }
// }
    
export default function getAllTasks() {
    return async dispatch => {
        try {
            const  res = await axios.get("/api/v1/tasks")
            dispatch({type: 'task/getAll', payload: res}) //store first five posts
        }
        catch(e){
            console.log(e)
        }
    }
}
// const data = getAllTasks();
// console.log(data)

