
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
            validation: (Rule) => Rule.custom((value) => {
                const validationResult = email().validate(value);
                if (validationResult.valid) {
                  return true;
                } else {
                  return validationResult.message;
                }
              }),
           
        },

        {
            name: "favourites",
            title: "Favourites",
            type: "array",
            of: [{type: 'favourite'}]
      
        }


    ]
}