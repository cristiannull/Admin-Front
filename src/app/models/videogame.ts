export interface Videogame {
  _id: string;
  name: string;
  price: number;
  cover: string;
  image: string[];
  gamemode: Category;
  developer: Category;
  gender: Category;
  pegi: Category;
  theme: Category;
  description: string;
  systemRequirements: string;
  videoId: string;
  typeoffer: Category;
}

export interface Category {
  _id: string;
  name: string;
}
