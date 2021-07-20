import {useState, useEffect} from 'react'
import axios from 'axios'


function WeddingPlansAPI() {
    const [weddingPlans, setWeddingPlans] = useState([])
    const [callback, setCallback] = useState(false)
    // const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    // const [searchAddress, setSearchAddress] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getWeddingPlans = async () => {
            const res = await axios.get(`/api/wedding_plans?limit=${page*9}&${sort}&title[regex]=${search}`)
            setWeddingPlans(res.data.weddingPlans)
            setResult(res.data.result)
        }
        getWeddingPlans()
    },[callback, sort, search, page])
    
    return {
        weddingPlans: [weddingPlans, setWeddingPlans],
        callback: [callback, setCallback],
        // category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        // searchAddress: [searchAddress, setSearchAddress],
        result: [result, setResult]
    }
}

export default WeddingPlansAPI
