
export default {
    name: "game",
    type: "document",
    title: "Game",

    fields: [
        {
            name: "title",
            type: "string",
            title: "Tittel"

        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                options: {
                    source: 'title',
                    slugify: input => input
                                         .toLowerCase()
                                         .replace(/\s+/g, '-')
                                         .slice(0, 150)
        
                }
            }

        },
        {
            name: "apiId",
            type: "number",
            title: "Rawg-id",

        },
        {
            name: "gameTime",
            type: "number",
            title: "Hours played", 
        },
        {
            name: "genre",
            title: "List of genres", 
            type: "array",
            of: [{type: 'genre'}]
        }

    ]
}