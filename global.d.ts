type Category = {
    id: string,
    name: string,
    emoji: string,

}
type Club = {
    id: string,
    category: string,
    name: string,
    emoji: string,
}

type Vote = {
    id?: string,
    category: string,
    userId: string,
    first: string,
    second: string,
    third: string,
}