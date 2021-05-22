import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import Swapi from "../../config/axios";
import Axios from "axios"

export default class CharacterController {
    public async init(request: Request, h: ResponseToolkit) {
        try {
            const { parameter, gender } = request.query;

            const people: Array<object> = [];
            let filteredPeople: Array<object> = [];
            let totalHeight: number = 0;
            let total: number = 0;
            let next: any = null;
            let page = 1;

            const swapi = new Swapi();

            const { data } = await swapi.init().get('/people');
            data.results.forEach((charac: any) => {
                people.push(charac);
            });


            next = data.next;
            page++;

            while (next != null) {
                const { data } = await swapi.init().get(`/people/?page=${page}`);

                data.results.forEach((charac: any) => {
                    people.push(charac);
                });
                next = data.next;
                page++;
            }

            if (typeof parameter !== "undefined") {
                filteredPeople = people.filter((person: any) => person.name.includes(parameter) || person.gender.includes(parameter) || person.height.includes(parameter))
            }
            if (typeof gender !== "undefined") {
                console.log("here");

                if (typeof parameter !== "undefined") {
                    filteredPeople = filteredPeople.filter((person: any) => person.gender === gender)
                } else {
                    filteredPeople = people.filter((person: any) => person.gender === gender)
                }

            }

            if (typeof gender === "undefined" && typeof parameter === "undefined") {
                filteredPeople = people;
            }

            filteredPeople.forEach((people: any) => {
                if (people.height != "unknown") {
                    totalHeight += Number(people.height);
                }
            });

            let numfeet: any = (totalHeight / 30.48).toFixed(2);
            let strFeet: any = numfeet.toString().split('.');
            let feet: any = `${strFeet[0]} ft ${strFeet[1]} inches`
            return h.response({ totalheight: feet, total: filteredPeople.length }).code(200);

        } catch (error) {
            console.log(error);

            return h.response({ message: "something went wrong" }).code(500);
        }
    }

    public async byMovies(request: Request, h: ResponseToolkit) {
        try {
            const { parameter, gender } = request.query;
            const { film } = request.params;

            let movies: Array<object> = [];
            let people: Array<object> = [];
            let filteredMovie: any = {};
            let filteredPeople: Array<object> = [];
            let totalHeight: number = 0;

            const swapi = new Swapi();

            const { data } = await swapi.init().get('/films');
            data.results.forEach((film: any) => {
                movies.push(film);
            });

            filteredMovie = movies.find((movie: any) => movie.title === film)

            if (typeof filteredMovie === "undefined") {
                return h.response({ message: "No available movie with that name" }).code(404);
            }

            for (let i = 0; i < filteredMovie.characters.length; i++) {
                const actor = filteredMovie.characters[i];
                let { data } = await Axios.get(actor);

                people.push(data)
            }

            console.log(people);

            if (typeof parameter !== "undefined") {
                filteredPeople = people.filter((person: any) => person.name.includes(parameter) || person.gender.includes(parameter) || person.height.includes(parameter))
            }
            if (typeof gender !== "undefined") {

                if (typeof parameter !== "undefined") {
                    filteredPeople = filteredPeople.filter((person: any) => person.gender === gender)
                } else {
                    filteredPeople = people.filter((person: any) => person.gender === gender)
                }

            }

            if (typeof gender === "undefined" && typeof parameter === "undefined") {
                filteredPeople = people;
            }

            filteredPeople.forEach((people: any) => {
                if (people.height != "unknown") {
                    totalHeight += Number(people.height);
                }
            });

            let numfeet: any = (totalHeight / 30.48).toFixed(2);
            let strFeet: any = numfeet.toString().split('.');
            let feet: any = `${strFeet[0]} ft ${strFeet[1]} inches`
            return h.response({ totalheight: feet, total: filteredPeople.length }).code(200);

        } catch (error) {
            console.log(error);

            return h.response({ message: "something went wrong" }).code(500);
        }
    }

}