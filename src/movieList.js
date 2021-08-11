// You can import any component you want as a named export from 'react-virtualized', eg
import React, { useCallback } from "react";
import { List, InfiniteLoader } from "react-virtualized";


const MovieList = ({ list, loadMore }) => {

  const rowRenderer = useCallback(function ({ key, index, style }) {
    return (
      <div
        key={key}
        style={style}
        className={'border list-none rounded-sm px-3 py-3'}
      >
        {list[index].name}
      </div>
    )
  }, [list])
  return (
    <div className="bg-white">
      <InfiniteLoader
        rowCount={1000000}
        isRowLoaded={({ index }) => {
          return !!list[index]
        }}
        loadMoreRows={loadMore}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            ref={registerChild}
            height={400}
            onRowsRendered={onRowsRendered}
            rowRenderer={rowRenderer}
            rowCount={list.length}
            rowHeight={60}
            width={800}
            rowGetter={({ index }) => list[index]}
          />
        )}

      </InfiniteLoader>
    </div>
  );
};

export default MovieList;
