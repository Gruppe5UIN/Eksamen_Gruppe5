
export default {
    name: "userGame",
    type: "object",
    title: "User game",

    fields: [
        {
            name: "game",
            title: "Game",
            type: "references",
            to: [{type: 'game'}]
           
        },
    
        {
            name: "playtime",
            type: "number",
            title: "Hours played"
        }
    ]
}