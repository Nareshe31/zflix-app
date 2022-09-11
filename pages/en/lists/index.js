import Lists from "../../../components/Lists";

function ListsPage({data,base_url}) {
    return <Lists data={data} base_url={base_url} />
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(
            `https://zflix-backend.herokuapp.com/api/v2/get-all-lists`
        );
        const data=await res.json()
        return {
            props: {
                data,
                base_url: process.env.BASE_URL,
            },
        };
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default ListsPage