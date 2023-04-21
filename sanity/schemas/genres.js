export default {

    name: "genre",
    type: "object",
    title: "Genre",

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
        }
    ]
}