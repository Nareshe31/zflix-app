import { useState} from "react";
import axios from 'axios'

export default function CreateUser(props){
    const [name, setname] = useState("")
    const [email, setemail] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res= await axios.post("https://serene-engelbart-f5988f.netlify.app/api/users",{
                    name:name,
                    email:email
                }
            )
            setname("")
            setemail("")
        } catch (error) {
            console.log(error);
        }
       
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={(e)=>setname(e.target.value)} id="" required />
                <input type="text" name="email" value={email} onChange={(e)=>setemail(e.target.value)} id="" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
