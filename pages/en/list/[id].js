
import axios from "axios";
import List from "../../../components/List";

function ListPage({data,base_url}) {
    return <List data={data} base_url={base_url} />
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(
            `https://zflix-backend.herokuapp.com/api/v2/get-list`,
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({"id":context.query.id})
            }
        );
        const data=await res.json()
        if (!data.hasOwnProperty("response")) {
            return {
                props: {
                    data,
                    base_url: process.env.BASE_URL,
                },
            };
        }
        return {
            notFound: true,
        };
    } catch (error) {
        console.log(error.message);
        return {
            notFound:true
        }
    }
}

export default ListPage