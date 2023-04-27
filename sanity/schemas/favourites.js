
export default {

    name: "favourite",
    type: "object",
    title: "Favourite",

    fields: [
        {
            name: "game",
            type: "reference",
            to: [{type: "game"}],
            title: "Game reference"

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