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