export default {

    name: "genre",
    type: "document",
    title: "Genre",

    fields: [
        {
            name: "title",
            type: "string",
            title: "Title"
        },
        {
            name: "apiId",
            type: "number",
            title: "Api Id"
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
        }
    ]
}