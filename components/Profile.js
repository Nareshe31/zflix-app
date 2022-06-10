import { removeCookies } from 'cookies-next'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions'


function Profile() {
    const dispatch=useDispatch()

    const logout=()=>{
        dispatch(logoutUser())
          localStorage.removeItem('token')
          removeCookies('token')
          window.location.reload()
      }
    
    return(
        <main style={{"paddingTop":"100px"}}>
            <div>
                <button onClick={logout} >Logout</button>
            </div>
        </main>
    )
}

export default Profile