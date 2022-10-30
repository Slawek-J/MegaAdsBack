export interface SimpleAddEntity {
  id: string;
  lat: number;
  lon: number;
}

export interface AddEntity extends SimpleAddEntity {
  name: string;
  description: string;
  price: number;
  url: string;
}

export interface NewAddEntity extends Omit<AddEntity, "id"> {
  id?: string;
}
