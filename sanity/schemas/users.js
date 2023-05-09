export default {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        {
            name: "username",
            title: "Username",
            type: "string",
            validation: Rule => Rule.required()
        },
        {
            name: "email",
            title: "Email",
            type: "string",
            validation: Rule => Rule.required().email()
        },
        {
            name: "games",
            title: "Games",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "game"
                        }
                    ]
                }
            ]
        },
        {
            name: "favorites",
            title: "Favorites",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "game"
                        }
                    ]
                }
            ]
        }
    ]
}