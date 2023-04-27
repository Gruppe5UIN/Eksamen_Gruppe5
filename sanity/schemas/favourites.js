
export default {

    name: "favourite",
    type: "object",
    title: "Favourite",

    fields: [
        {
            name: "gameApiId",
            type: "number",
            title: "Game Api Id"

        },
        {
            name: "isPlayed",
            type: "boolean",
            title: "Has game been played?"

        },
    ],
    initialValue: {
        isPlayed: false
    }

}