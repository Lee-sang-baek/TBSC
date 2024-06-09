import "./CompIntroPage.css"
import React, {useEffect, useState} from "react";
import axios from "axios";

const CompIntroPage = () => {
    const [compInfoList, setCompInfoList] = useState([]);

    const [pageNum, setPageNum] = useState(0);

    const [registStartPage, setregistStartPage] = useState(1);
    const [registEndPage, setregistEndPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const [registTotalPages, setregistTotalPages] = useState(1);

    const [currentGroup, setCurrentGroup] = useState(1);

    const pagesPerGroup = 5; // 5페이지씩 보이게

    useEffect(() => {
        axios.get(`/registcomp/pageable?page=${currentPage-1}`)
            .then((res) => {
                console.log(res.data);
                setCompInfoList(res.data);
                setregistTotalPages(res.data.totalPages);
            });
    }, [currentPage]);

    useEffect(() => {
        setCurrentGroup(Math.ceil(currentPage / pagesPerGroup));
    }, [currentPage]);

    useEffect(() => {
        setregistStartPage(((currentGroup - 1) * pagesPerGroup) + 1);
        setregistEndPage(Math.min(currentGroup * pagesPerGroup, registTotalPages || 1));
    }, [currentGroup, pagesPerGroup, registTotalPages]);

    const handlePreviousGroup = () => {
        setCurrentPage(registStartPage - 1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextGroup = () => {
        setCurrentPage(registEndPage + 1);
    };

    return (
        <div className="CompIntroPage-compo">
            <div className="pagination">
                {(registStartPage > 1) && (
                    <button onClick={handlePreviousGroup}>&laquo;</button>
                )}
                {[...Array(registEndPage - registStartPage + 1)].map((_, index) => {
                    const pageNumber = registStartPage + index;

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={pageNumber === currentPage ? 'active' : ''}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                {registEndPage < registTotalPages && (
                    <button onClick={handleNextGroup}>&raquo;</button>
                )}
            </div>

            {compInfoList.content && compInfoList.content.map((reservation, index) => (
                <div key={index}>
                    {reservation.title || ""}
                </div>
            ))}
        </div>
    );
};

export default CompIntroPage;