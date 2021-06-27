import React, { useState, useEffect } from "react"
import { restore, restoreData } from '../../cdn-indice-plugin/dist/browser'
// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}
const paginationStyle = {
  display: 'flex',
  listStyleType: 'none',
}
const buttonStyle = {
  padding: '6px 8px',
  margin: '0 16px',
}
const currentButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#013dff',
  color: 'white',
}

// markup
const IndexPage = () => {
  const offset = 10;
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTemp, setSearchTemp] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    (async ()=>{
      const indiceData = await restoreData('data.pages');
      setData(indiceData);
    })();
  }, []);
  useEffect(()=>{
    (async ()=> {
      if (data) {
        setLoading(true);
        const indice = await restore('pages');
        const ids = await indice.find(search);
        const result = await data?.find(ids.slice(page * offset, ((page * offset) + (offset - 1)))) || [];
        setList(result);
        setPages(Math.ceil(ids.length / offset));
        setLoading(false);
      }
    })();
  }, [search, data, page])
  const onKeyPress = (event) => {
    const value = event.target.value;
    if (event.key === 'Enter') {
      setSearch(value);
    }
  }
  const onChange = (event) => {
    const value = event.target.value;
    setSearchTemp(value);
  }
  const pagination = pages > 0 ? Array(pages).fill(0).map((_, index) => (
    <li key={`${index}-pagination`}>
      <button
        onClick={() => setPage(index)}
        style={page === index ? currentButtonStyle : buttonStyle}
      >
        {index}
      </button>
    </li>
  )) : null;
  console.log('page ', page)
  console.log('pages ', pages)
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Congratulations
        <br />
        <span style={headingAccentStyles}>— you just made a Gatsby site! </span>
      </h1>
      <input value={searchTemp} onChange={onChange} onKeyPress={onKeyPress} placeholder={'поиск'} />
        <ul style={listStyles}>
        {loading ? (
          <li style={{ ...listItemStyles }}>
            <span>'...загрузка'</span>
          </li>
        ) : (list.map(item => (
          <li key={item.id} style={{ ...listItemStyles }}>
            <span>
                {item.name}
            </span>
          </li>
        )))}
      </ul>
      <ul style={paginationStyle} >
        {pagination}
      </ul>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
    </main>
  )
}

export default IndexPage
