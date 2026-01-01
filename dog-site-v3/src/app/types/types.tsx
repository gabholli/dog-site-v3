export interface ImageData {
    url: string
}

export interface DogData {
    name: string
    bred_for?: string
    breed_group?: string
    height?: { imperial?: string }
    life_span?: string
    origin?: string
    temperament?: string
    weight?: { imperial?: string }
}

export interface Dog {
    id: string
    name: string
    image: {
        url: string
    }
}

export interface Params {
    id: string
}

export interface Rating {
    breed_id: number
    image: string
    breed: string
    rating: number
}
