import Axios from "axios"

export default class Swapi{
    public init(){
        return Axios.create({
            headers: {
                "content-type":"application/json"
            },
            baseURL: "https://swapi.dev/api"
        })
    }
}