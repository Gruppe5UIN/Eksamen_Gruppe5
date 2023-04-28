
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
            type: "string",
            title: "Rawg-id",

        },
        {
            name: "playtime",
            type: "number",
            title: "Hours played", 
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

    //Setter inn en random verdi på playtime
    initialValue: {
        playtime: Math.floor(Math.random() * 100),
      }
}