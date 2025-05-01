import {Inngest} from "inngest";
export const inngest = new Inngest({id:"elevate",
    name:"Elevate",
credentials:{
    gemini:{
        apiKey:process.env.GEMINI_API_KEY,
    },
},
});