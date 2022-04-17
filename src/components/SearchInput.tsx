import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from 'antd'
import { filterVisitors } from '../store/actions/visitorActions'
import { SearchOutlined } from '@ant-design/icons';

const SearchInput = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState("")

    useEffect(() => {
        dispatch((filterVisitors(data)))
    }, [data])

    return (
        <div>
            <Input
                className="input search-input"
                size="large"
                placeholder="Search..."
                value={data}
                prefix={<SearchOutlined className="site-form-item-icon" />}
                onChange={(e: any) => setData(e.target.value)}
            />
        </div>
    )
}

export default SearchInput
