import React, { useMemo, useCallback, useState } from "react"
import NpmList from '../npmList';
import Layout from '../layout';
import { useDebounce } from 'use-debounce';
import { useFullTextCursorStateFullQuery, log } from 'gatsby-cdn-search-plugin';
log.enableAll();

const IndexPage = () => {
  const [search, setSearch] = useState('');  
  const [debounceSearch] = useDebounce(search, 1000);
  
  const { all, next, hasNext } = useFullTextCursorStateFullQuery('npm-gatsby-plugin', debounceSearch);
  const onChange = useCallback((event) => {
    setSearch(event.target.value)
  }, []);
  
  return (
    <Layout title={"Cars"}>
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Demo search npm gatsby plugins</h1>
            <div className="relative text-gray-600 mt-10">
              <input value={search} onChange={onChange} type="search" name="search" placeholder="Search" className="border-blue-500 border-2 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-11/12 m-4" />
            </div>
            {useMemo(() => (<>
              <NpmList list={all} loadMore={()=>{hasNext && next()}} />
            </>), [all, next])}
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default IndexPage;

