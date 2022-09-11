import Link from 'next/link'

function Lists({data,base_url}) {
    
    return(
        <div style={{"paddingTop":"100px","color":"white"}}>
            {
                data.lists.map((item)=>(
                    <Link key={item._id} href={"/en/list/"+item._id}>
                        <a>
                            <p>{item.title} {item.items.length} items</p>
                        </a>
                    </Link>
                ))
            }
        </div>
    )
}

export default Lists