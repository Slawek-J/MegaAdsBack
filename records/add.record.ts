import { AddEntity } from "../types";
import { ValidationError } from "../utils/errors";

interface NewAddEntity extends Omit<AddEntity, 'id'> {
    id?: string;
}

export class AddRecord implements AddEntity{
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: AddEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError(`Ad's name cannot be empty or have more than 100 characters.`);
        }

        if(obj.description.length > 1000) {
            throw new ValidationError(`Ad's description cannot be longer than 1000 characters.`)
        }

        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError(`Ad's price cannot be less than 0 or higher than 9999999.`)
        }

        if(!obj.url || obj.url.length > 100) {
            throw new ValidationError(`Ad's link cannot be empty or have more than 100 characters.`)
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Add cannot be localized.')
        }
    }
}