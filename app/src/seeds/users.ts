import { ObjectID } from "mongodb";

const name = ['João', 'Lucas', 'Bruno', 'Otávio', 'Francisco'];
const lastName = ['Gomes', 'Lima', 'Fonseca', 'Fagundes', 'Santos'];

export default () : Array<any> => {

    let result = [];
    for (let i = 0; i < name.length; i++) {

        const year = 1980 + (Math.floor(Math.random() * 10) + 1);
        const month = (Math.floor(Math.random() * 12) + 1);
        const day = (Math.floor(Math.random() * 28) + 1);
        const date = new Date(`${year}-${month}-${day}`);

        result.push({
            "_id": new ObjectID(),
            "name": name[i],
            "lastName": lastName[i],
            "dateOfBirth": date,
            "email": `${name[i]}.${lastName[i]}@fastmail.com`.toLowerCase(),
            "pictureUrl": "gkkjD$Fjvm@d.jpg",
            "username": `${name[i]}.${lastName[i]}`.toLowerCase(),
            "password": "12345678"
        });
    }

    return result;
}