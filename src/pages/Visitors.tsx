import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd';
import { RootState } from '../store';
import { checkIn, fetchVisitors, setError, setSuccess } from '../store/actions/visitorActions';
import { Visitor } from '../store/types';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import { errorToast, successToast } from '../components/Toast';

import ReactGA from 'react-ga4';

function initialGA() {
    ReactGA.initialize('G-2BLEQ6HW0K');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
};

const Visitors = () => {
    useEffect(() => {
        initialGA();
    }, []);
    
    const dispatch = useDispatch()
    const { error, success, filteredVisitors } = useSelector((state: RootState) => state.visitor);

    const [currentPage, setCurrentPage] = useState(1)
    const visitorsPerPage = 10

    useEffect(() => {
        dispatch((fetchVisitors()))
    }, [dispatch])

    useEffect(() => {
        if (success) {
            successToast(success)
            dispatch(setSuccess(''))
        }
        if (error) {
            errorToast(error)
            dispatch(setError(''))
        }
    }, [success, dispatch, error])

    const indexOfLastVisitor = currentPage * visitorsPerPage;
    const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
    const currentVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor);
    const totalPagesNum = Math.ceil(filteredVisitors['length'] / visitorsPerPage)

    const handleCheckIn = (data: Visitor) => {
        ReactGA.event('VISITOR', 'Visitor checked');
        dispatch(checkIn(data))
    }

    return (
        <div className="container align-center">
            <SearchInput />
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Hes Code</th>
                        <th>Is Attend</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        currentVisitors.map((value: Visitor, index: any) => (
                            <tr key={index}>
                                <td>{value.fullName}</td>
                                <td>{value.email}</td>
                                <td>{value.hesCode}</td>
                                <td>{value.isAttented === false ? <Button className="btn" onClick={() => handleCheckIn(value)}>Check In</Button> : <p>Checked In</p>}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination pages={totalPagesNum} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Visitors
