export interface Recipe {
  name: string,
  description: string,
  serves: number,
  time: number,
  price: string,
  difficulty: string,
  ingredients: Ingredient[],
  steps: Step[],
  date: any,
  uid: string,
  photoURL: string,
  categories: Category,
  id?: string,
  ratings?: Object
  fromCache?: boolean
}

export interface Ingredient {
  quantity: number,
  unit: string,
  name: string,
}

export interface Step {
  description: string,
  time: number,
  active: boolean,
}

export interface Category {
  courses: {},
  occasions: {},
  cuisines: {},
  specialDiets: {},
}

// export enum Price {
//   Inexpensive,
//   Average,
//   Costly,
// }

// export enum Difficulty {
//   Easy,
//   Medium,
//   Hard,
// }