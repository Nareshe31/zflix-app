
import Link from 'next/link'
import Poster from './atoms/Poster'

function List({data,base_url}) {
    
    return(
        <div style={{"paddingTop":"100px","color":"white","display":"flex"}}>
            {
                data.list.items.map(({item})=>(
                    <Poster item={{...item,title:item.name,release_date:item.year}} type={item.type}  />
                ))
            }
        </div>
    )
}

export default List