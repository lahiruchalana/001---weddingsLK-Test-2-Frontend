import {useState, useEffect} from 'react'
import axios from 'axios'

function UserInfoAPI() {
    const [users, setUsers] = useState([])
    const [callback, setCallback] = useState(false)
    ////// category -> role karanna balanna
    const [category, setCategory] = useState('')

    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getUsers = async () => {
                ////// category -> role karanna balanna
            const res = await axios.get(`/user/users?limit=${page*9}&name[regex]=${search}`)
            setUsers(res.data.users)
            setResult(res.data.result)
        }
        getUsers()
            ////// category -> role karanna balanna
    },[callback, category, sort, search, page])
    
    return {
        users: [users, setUsers],
        callback: [callback, setCallback],
            ////// category -> role karanna balanna
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default UserInfoAPI
