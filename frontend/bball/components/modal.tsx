'use client'
import React, { useState, useEffect, useMemo } from 'react';
import '../styles/modal.css';
import { Column, useTable } from 'react-table';
import axios from 'axios';
export default function Modal() {


    // Variables
    const [modal, setModal] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player[]>([]);

    // Player Stats Interface
    interface Player {
        GP: number,
        W: number,
        L: number,
        FG_PCT: number,
        FG3_PCT: number,
        FT_PCT: number,
        REB: number,
        AST: number,
        TOV: number,
        STL: number,
        BLK: number,
        PLUS_MINUS: number,
    }

    // react-tables Initilization with data and columns
    const data: Player[] = useMemo(() => player, [player]);
    const columns: Column<Player>[] = useMemo(
        () => [
            {
                Header: "GP",
                accessor: "GP",
            },
            {
                Header: "W",
                accessor: "W",
            },
            {
                Header: "L",
                accessor: "L",
            },
            {
                Header: "FG_PCT",
                accessor: "FG_PCT",
            },
            {
                Header: "FG3_PCT",
                accessor: "FG3_PCT",
            },
            {
                Header: "FT_PCT",
                accessor: "FT_PCT",
            },
            {
                Header: "REB",
                accessor: "REB",
            },
            {
                Header: "TOV",
                accessor: "TOV",
            },
            {
                Header: "STL",
                accessor: "STL",
            },
            {
                Header: "BLK",
                accessor: "BLK",
            },
            {
                Header: "PLUS_MINUS",
                accessor: "PLUS_MINUS",
            },
        ],
        []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });



    // Get Player Stats
    useEffect(() => {
        axios.get<Player[]>('http://127.0.0.1:8000/nba/').
            then((response) => {
                console.log(response.data);
                setPlayer(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    // Functions
    const toggleModal = (): void => {
        setModal(!modal);
    }

    useEffect(() => {
        // This code runs after the component mounts and whenever 'modal' changes.
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }

        // Cleanup function: This runs before the component is unmounted, and before each re-render.
        return () => {
            document.body.classList.remove('active-modal');
        };
    }, [modal]); // Dependencies array, the effect will re-run if these values change.


    return (
        <>
            <button className='btn-modal' onClick={toggleModal}>
                Lebron Stats
            </button>
            {modal && (
                <div className="App">
                    <div className="container">
                        <table {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr className='bg-black' {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            )}

            {/* {modal && (<div className='modal'>
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Player Pic</h2>
                    <h2>Player name</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui asperiores, maiores culpa, delectus amet iure, iusto mollitia esse ex temporibus. Iste, amet rerum. Iure deleniti eius numquam architecto accusantium!</p>
                    <button onClick={toggleModal} className='close-modal'>Close</button>
                </div>
            </div>)} */}

        </>
    );
}