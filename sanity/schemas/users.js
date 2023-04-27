
export default {

    name: "user",
    type: "document",
    title: "User",

    fields: [

        {
            name: "username",
            type: "string",
            title: "Username"
        },
        {
            //sjekk om denne valideringen fungerer
            name: "email",
            title: "E-mail",
            type: "string",
            //Hvordan skal vi validere at det er email?
            //Får ikke email() fra sanity til å fungere
            //validation: (Rule) => Rule.custom((value) => {
           
        },

        {
            name: "favourites",
            title: "Favourites",
            type: "array",
            of: [{type: 'favourite'}]
      
        }


    ]
}