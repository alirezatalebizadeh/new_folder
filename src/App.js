import React, { useState, useMemo, memo, useCallback, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';



import './App.css';


function App() {

  const [datas, setDatas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)//currentPage
  const [paginatedTodos, setPaginatedTodos] = useState([])

  let pageSize = 10;

  useEffect(() => {
    //fetch data
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(datas => {
        setDatas(datas)
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize
        let allShowTodo = datas.slice(startIndex, endIndex)
        setPaginatedTodos(allShowTodo)

      })
  }, [currentPage])
  const pagesCount = Math.ceil(datas.length / pageSize)
  let pageNumbers = Array.from(Array(pagesCount).keys())//create array with 20 item in this


  return (

    <div className="App">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th>Id : </th>
            <th>Title : </th>
            <th>completed : </th>
          </tr>
        </thead>
        <tbody>
          {!datas ? 'loading data' :
            paginatedTodos.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>
                  <p className={data.completed ? 'btn btn-success' : 'btn btn-danger'}>
                    {!data.completed ? 'pending' : 'completed'}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Pagination className='d-flex justify-content-center'>
        {pageNumbers.map(pageNumber => (
          <Pagination.Item active={currentPage === pageNumber + 1 ? true : false}
            onClick={() => setCurrentPage(pageNumber + 1)}
            key={pageNumber + 1}
          >{pageNumber + 1}</Pagination.Item>
        ))}

      </Pagination>

    </div>
  );
}


export default App;
