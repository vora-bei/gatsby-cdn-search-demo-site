import React, { useState, useEffect } from "react"
import { restoreDb } from 'gatsby-cdn-search-plugin'
import * as styles from './index.module.css';

const IndexPage = () => {
  const offset = 10;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTemp, setSearchTemp] = useState('');
  const [loading, setLoading] = useState(false);

  const min_char_search = 3;

  useEffect(()=>{
    (async ()=> {
        setLoading(true);
        const db = await restoreDb('countries');
        if(search.length < min_char_search) {
          setLoading(false);
          setList([]);
          return;
        }
        const result = await db.find({$ngram: search}, undefined, page * offset, offset + 1);
        setList(result);
        setHasMore(result.length > offset);
        setLoading(false);
    })();
  }, [search, page])
  const onFind = () => {
      setHasMore(() => false);
      setPage(() => 0);
      setSearch(searchTemp);
  }
  const onChange = (event) => {
    const value = event.target.value;
    setSearchTemp(value);
  }
  const onNextPage = () => {
    setPage(page + 1);
  }
  const onPrevPage = () => {
    setPage(page - 1);
  }
  return (
    <>
      <main className={styles.pages}>
        <title>Movies</title>
        <h1 className={styles.heading}>
          Congratulations
          <br />
          <span className={styles.heading_accents}>— you just made a Gatsby site! </span>
        </h1>
        <input
          disabled={loading}
          value={searchTemp}
          onChange={onChange}
          placeholder={`search at least ${min_char_search} characters`}
        />
        <button onClick={onFind} className={styles.button_find}>Find</button>
        {loading ? (
          <div>
            <span>...loading</span>
          </div>
        ) : (
          <ul className={styles.list}>
            {
              list.length ? (list.map(item => (
                <li key={item.id} className={styles.list_item}>
                  <span>
                    {item.name}
                  </span>
                </li>
              ))) : (
                <span>Nothing found</span>
              )
            }
          </ul>
        )
        }
      </main>
      <footer className={styles.footer}>
        <div className={styles.pagination}>
        {
          page && !loading > 0 ? (
            <button onClick={onPrevPage}>{`Prev page ${page}`}</button>
          ) : null
        }
        {
          hasMore && !loading ? (
            <button onClick={onNextPage}>{`Next page ${page + 2}`}</button>
          ) : null
        }
        </div>
        <img
          alt="Gatsby G Logo"
          src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
        />
      </footer>
    </>
  )
}

export default IndexPage
