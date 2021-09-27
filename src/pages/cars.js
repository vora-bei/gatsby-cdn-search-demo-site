import React, { useMemo, useCallback, useState } from "react"
import CarTable from '../carTable';
import Layout from '../layout';
import { useDebounce } from 'use-debounce';
import { useCdnCursorStatefulQuery, log } from 'gatsby-cdn-search-plugin';
log.enableAll();

const makeQuery = (search, indice) => {
  const extraCondition = indice === 'lte' ? { year: { $lte: 2010 } } : {};
  if (search.length >= 4) {
    return { $ngram: search, ...extraCondition };
  } else if (!!search.length) {
    return {
      $or: [
        { model: { $regex: new RegExp(`^${search}`, 'i'), }, },
        { make: { $regex: new RegExp(`^${search}`, 'i'), }, }
      ],
      ...extraCondition
    };
  } else {
    return extraCondition;
  }
}
const IndexPage = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('simple');
  
  const [debounceSearch] = useDebounce(search, 1000);
  
  const query = useMemo(() => makeQuery(debounceSearch, type), [debounceSearch, type]);

  const { all, next} = useCdnCursorStatefulQuery('cars', query);
  const onChange = useCallback((event) => {
    setSearch(event.target.value)
  }, []);
  
  const onChangeType = useCallback((event) => {
    setType(event.target.value)
  }, []);

  return (
    <Layout title={"Cars"}>
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Demo search cars (N-Gram, Regexp, By year)</h1>
            <div className="relative text-gray-600 mt-10">
              <input value={search} onChange={onChange} type="search" name="search" placeholder="Search" className="border-blue-500 border-2 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-11/12 m-4" />
            </div>
            <div className="flex justify-around mb-10">
              <label className="inline-flex items-center mt-4">
                <input
                  name="type"
                  value="simple"
                  type="radio"
                  className="form-radio h-5 w-5 text-red-600"
                  checked={type === "simple"}
                  onChange={onChangeType}
                /><span className="ml-2 text-gray-700">All dates</span>
              </label>
              <label className="inline-flex items-center mt-4 ">
                <input
                  name="type"
                  value="lte"
                  type="radio"
                  checked={type === "lte"}
                  onChange={onChangeType}
                  className="form-radio h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">Date $lte  2010</span>
              </label>
            </div>
            {useMemo(() => (<>
              <CarTable list={all} loadMore={next} />
            </>), [all, next])}
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default IndexPage;

