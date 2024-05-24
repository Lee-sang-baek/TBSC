import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';
import './SearchResult.css'; // Import the CSS file

const SearchResult = () => {
    const location = useLocation();
    const [results, setResults] = useState({});
    const [filteredResults, setFilteredResults] = useState({});
    const [selectedBoard, setSelectedBoard] = useState('전체');
    const searchQuery = new URLSearchParams(location.search).get('title');

    useEffect(() => {
        const fetchResults = async () => {
            const response = await axios.get(`/search?title=${searchQuery}`);
            setResults(response.data);
            setFilteredResults(response.data);
        };

        fetchResults();
    }, [searchQuery]);

    const handleBoardChange = (e) => {
        setSelectedBoard(e.target.value);
        filterResults(e.target.value);
    };

    const filterResults = (board) => {
        if (board === '전체') {
            setFilteredResults(results);
        } else {
            const filtered = {};
            if (board === '공지사항') {
                filtered.noticeResults = results.noticeResults || [];
            } else if (board === '기업홍보') {
                filtered.tNoticeResults = results.tNoticeResults || [];
            } else if (board === '센터뉴스') {
                filtered.centerNewsResults = results.centerNewsResults || [];
            } else if (board === '보도자료') {
                filtered.pressReleaseResults = results.pressReleaseResults || [];
            }
            setFilteredResults(filtered);
        }
    };

    const getLink = (boardName, num) => {
        switch (boardName) {
            case '공지사항':
                return `/notices/${num}`;
            case '기업홍보':
                return `/tnotice/${num}`;
            case '센터뉴스':
                return `/centernews/${num}`;
            case '보도자료':
                return `/pressrelease/${num}`;
            default:
                return '#';
        }
    };

    const getCount = () => {
        let count = 0;
        if (filteredResults) {
            if (filteredResults.noticeResults && filteredResults.noticeResults.length > 0) {
                count += filterResults.noticeResults.length;
            }
            if (filteredResults.tNoticeResults && filteredResults.tNoticeResults.length > 0) {
                count += filterResults.tNoticeResults.length;
            }
            if (filteredResults.centerNewsResults && filteredResults.centerNewsResults.length > 0) {
                count += filterResults.centerNewsResults.length;
            }
        }
        return count;
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'yyyy-MM-dd');
    };

    return (
        <div className="SearchResult-compo">
            <div className="searchResultContainer">
                <h1 className="searchResultTitle">"{searchQuery}"에 대한 검색 결과</h1>
                <select value={selectedBoard} onChange={handleBoardChange} className="boardFilter">
                    <option value="전체">전체</option>
                    <option value="공지사항">공지사항</option>
                    <option value="기업홍보">기업홍보</option>
                    <option value="센터뉴스">센터뉴스</option>
                    <option value="보도자료">보도자료</option>
                </select>
                {getCount() > 0 && <p>총 {getCount()}개의 글을 찾았습니다.</p>}
                {filteredResults.noticeResults && filteredResults.noticeResults.length > 0 && (
                    <div>
                        <h2>공지사항</h2>
                        <table>
                            <tbody>
                            {filteredResults.noticeResults.map((result, index) => (
                                <tr key={index} className="searchResultItem">
                                    <td>[{result.boardName}]</td>
                                    <td>
                                        <Link to={getLink(result.boardName, result.num)} className="searchResultLink">
                                            {result.title}
                                        </Link>
                                    </td>
                                    <td>{result.id}</td>
                                    <td>{formatDate(result.date)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {filteredResults.tNoticeResults && filteredResults.tNoticeResults.length > 0 && (
                    <div>
                        <h2>기업홍보</h2>
                        <table>
                            <tbody>
                            {filteredResults.tNoticeResults.map((result, index) => (
                                <tr key={index} className="searchResultItem">
                                    <td>[{result.boardName}]</td>
                                    <td>
                                        <Link to={getLink(result.boardName, result.num)} className="searchResultLink">
                                            {result.title}
                                        </Link>
                                    </td>
                                    <td>{result.id}</td>
                                    <td>{formatDate(result.date)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {filteredResults.centerNewsResults && filteredResults.centerNewsResults.length > 0 && (
                    <div>
                        <h2>센터뉴스</h2>
                        <table>
                            <tbody>
                            {filteredResults.centerNewsResults.map((result, index) => (
                                <tr key={index} className="searchResultItem">
                                    <td>[{result.boardName}]</td>
                                    <td>
                                        <Link to={getLink(result.boardName, result.num)} className="searchResultLink">
                                            {result.title}
                                        </Link>
                                    </td>
                                    <td>{result.id}</td>
                                    <td>{formatDate(result.date)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {filteredResults.pressReleaseResults && filteredResults.pressReleaseResults.length > 0 && (
                    <div>
                        <h2>보도자료</h2>
                        <table>
                            <tbody>
                            {filteredResults.pressReleaseResults.map((result, index) => (
                                <tr key={index} className="searchResultItem">
                                    <td>[{result.boardName}]</td>
                                    <td>
                                        <Link to={getLink(result.boardName, result.num)} className="searchResultLink">
                                            {result.title}
                                        </Link>
                                    </td>
                                    <td>{result.id}</td>
                                    <td>{formatDate(result.date)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {getCount() === 0 &&
                    <p>검색 결과가 없습니다.</p>
                }
            </div>
        </div>
    );
};

export default SearchResult;
