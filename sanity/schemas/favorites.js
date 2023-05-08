export default {
    name: "favorites",
    type: "document",
    title: "Favorites",
    fields: [
      {
        name: "user",
        title: "User",
        type: "reference",
        to: [{ type: "user" }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: "games",
        title: "Games",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "game" }],
          },
        ],
      },
    ],
  };