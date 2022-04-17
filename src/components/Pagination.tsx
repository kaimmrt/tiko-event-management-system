import React, { FC, useState, useEffect } from 'react'

interface IPagination {
    pages: number;
    setCurrentPage: (number: number) => void;
}

const Pagination: FC<IPagination> = ({ pages, setCurrentPage }) => {
    const [currentButton, setCurrentButton] = useState(1)

    const numOfPages = []

    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i)
    }

    useEffect(() => {
        setCurrentPage(currentButton)
    }, [currentButton, setCurrentPage])

    return (
        <div>
            <ul className="pagination">
                <li className={`${currentButton === 1 ? "disabled" : "page-item"}`}>
                    <a onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)} className="page-link" >
                        Previous
                    </a>
                </li>
                {
                    numOfPages.map((value, index) => (
                        <li key={index} className={`${currentButton === value ? 'page-item active' : 'page-item'}`}>
                            <a onClick={() => setCurrentButton(value)} className="page-link">
                                {value}
                            </a>
                        </li>
                    ))
                }
                <li className={`${currentButton === numOfPages.length ? "disabled" : "page-item"}`}>
                    <a
                        onClick={() => setCurrentButton((prev) => prev === numOfPages.length ? prev : prev + 1)}
                        className="page-link">
                        Next
                    </a>
                </li>
            </ul>
        </div >
    )
}

export default Pagination
