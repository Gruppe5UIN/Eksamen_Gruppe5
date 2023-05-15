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
            name: "userGames",
            title: "User Games",
            type: "array",
            of: [
                {
                    type: "userGame"
                }
            ],
            validation: Rule => Rule.unique()
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