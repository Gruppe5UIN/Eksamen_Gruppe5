
export default {
    name: "game",
    type: "document",
    title: "Game",

    fields: [
        {
            name: "title",
            type: "string",
            title: "Title"

        },

        {
            name: "apiId",
            type: "number",
            title: "Rawg-id",

        },
        {
            name: "avgPlaytime",
            type: "number",
            title: "Average playtime", 
        },
        {
            name: "genres",
            title: "List of genres", 
            type: "array",
            of: [{type: 'reference',
            to: [{type: 'genre'}]
        }],
            
        },

        {
            title: 'Image URL',
            name: 'imageUrl',
            type: 'array',
            of: [{type: 'url'}]
        },

        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {     
                source: 'title',
                slugify: input => input
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .slice(0, 150)   
            }
        },
    ],
}