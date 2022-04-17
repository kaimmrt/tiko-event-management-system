import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdWavingHand } from 'react-icons/md';
import { BsPersonCheckFill, BsPersonXFill, BsPeopleFill } from 'react-icons/bs';

import { RootState } from "../store";
import { fetchVisitors } from "../store/actions/visitorActions";

const Dashboard = () => {
    const [checkedInVisitors, setCheckedInVisitors] = useState(0)

    const { user } = useSelector((state: RootState) => state.auth);
    const { visitors } = useSelector((state: RootState) => state.visitor);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVisitors())
        calculateCheckedInVisitors()
    }, [visitors])

    const calculateCheckedInVisitors = () => {
        let calculate = 0
        visitors.map((value) => {
            if (value.isAttented === true)
                calculate = calculate + 1
        })
        setCheckedInVisitors(calculate)
    }

    return (
        <div className="container">
            <h1 className="dashboard-txt"><MdWavingHand /> Welcome {user?.name}</h1>
            <div className="dashboard-box-container" >
                <div className="dashboard-box">
                    <div>
                        <BsPeopleFill className="dashboard-icon" />
                    </div>
                    <h4 className="dashboard-box-txt">The number of visitors {visitors.length}</h4>
                </div>
                <div className="dashboard-box">
                    <div>
                        <BsPersonCheckFill className="dashboard-icon" />
                    </div>
                    <h4 className="dashboard-box-txt">Number of visitors who checked in {checkedInVisitors}</h4>
                </div>
                <div className="dashboard-box">
                    <div>
                        <BsPersonXFill className="dashboard-icon" />
                    </div>
                    <h4 className="dashboard-box-txt">Number of visitors who did not check in {visitors.length - checkedInVisitors}</h4>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;