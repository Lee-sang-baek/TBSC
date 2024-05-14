import React, { useState } from "react";
import "./Pagination.css";
const Pagination = ({ noticesPerPage, totalNotices, paginate, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalNotices / noticesPerPage);
    const pagesPerGroup = 10;
    const [currentGroup, setCurrentGroup] = useState(0);
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleNextGroup = () => {
        if (currentGroup < totalGroups - 1) {
            setCurrentGroup(currentGroup + 1);
            setCurrentPage((currentGroup + 1) * pagesPerGroup + 1);
        }
    };

    const handlePrevGroup = () => {
        if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
            setCurrentPage(currentGroup * pagesPerGroup);
        }
    };

    return (
        <div className="pagination-copo">
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button
                        onClick={handlePrevGroup}
                        disabled={currentGroup === 0}
                        className="button"
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers
                    .slice(currentGroup * pagesPerGroup, (currentGroup + 1) * pagesPerGroup)
                    .map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <a onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                <li className="page-item">
                    <button
                        onClick={handleNextGroup}
                        disabled={currentGroup >= totalGroups - 1}
                        className="button button-next"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
        </div>

    );
};

export default Pagination;
