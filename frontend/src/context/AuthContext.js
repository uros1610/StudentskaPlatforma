import {useState,createContext,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {

    const URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate()


    const [user,setuser] = useState(JSON.parse(localStorage.getItem('user')) || null)

    const login = async (inputs) => {
        try {
        const resp = await axios.post(`/auth/login`,inputs)
        const data = {rola:resp.data.rola,korisnickoIme:resp.data.korisnickoIme,imeSmjera:resp.data.imeSmjera,imeFakulteta:resp.data.imeFakulteta}
        setuser(data)
        console.log(data);
        localStorage.setItem('token',resp.data.token)
        console.log(resp.data)
        }
        catch(err) {

        }
    }

    const logout = async () => {
        const resp = await axios.post(`/auth/logout`)
        setuser(null)
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(user))
    },[user])

    return <AuthContext.Provider value = {{user,login,logout}}>{children}</AuthContext.Provider>

}

export default AuthContext