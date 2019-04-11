import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export default props => {
    const { totalPages, totalResults, page } = props;

    const handlePageChanged = activePage => {
        props.onChange(activePage.selected + 1);
    }

    if (totalResults === 0) {
        return null;
    }

    return (
        <Pagination>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                forcePage={parseInt(page) - 1}
                onPageChange={handlePageChanged}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </Pagination>
    );
}

const Pagination = styled.div`
    .pagination {
        display: flex;
        padding-left: 0;
        list-style: none;
        border-radius: .25rem;
        .previous {
            border-top-left-radius: .25rem;
            border-bottom-left-radius: .25rem;
        }
        .next {
            border-top-right-radius: .25rem;
            border-bottom-right-radius: .25rem;
        }
        li.active {
            background-color: #282c34 !important;

            a {
                :focus {
                    outline: none !important;
                }
            }
        }
        li {
            position: relative;
            display: block;
            border: 1px solid rgba(53, 53, 53, .8);
            background-color: #212121;
            cursor: pointer;
            a {
                color: white;
                text-decoration: none;
                display: block;
                padding: .5rem .75rem;
                :focus {
                    outline: none !important;
                }
            }
            &:hover {
                background-color: rgba(67, 90, 111, 0.06);
            }
        }
    }
`;