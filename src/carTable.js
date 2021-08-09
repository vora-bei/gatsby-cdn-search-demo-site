// You can import any component you want as a named export from 'react-virtualized', eg
import React from "react";
import { Column, Table, InfiniteLoader } from "react-virtualized";

const renderHeader = ({ dataKey, sortBy, sortDirection }) => {
  return <div className="text-left">{dataKey}</div>;
};

const cellRenderer = ({ cellData }) => { };

const getRowClassName = ({ index }) => {
  const basicRow = "hover:bg-teal-lightest ";
  if (index < 0) return "bg-grey-light";
  return basicRow + (index % 2 === 0 ? "bg-white" : "bg-grey-lighter");
};

const CarTable = ({ list, loadMore }) => {
  return (
    <div className="bg-white">
      <InfiniteLoader
        isRowLoaded={({ index }) => !!list[index]}
        loadMoreRows={loadMore}
        rowCount={1000000}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            headerHeight={40}
            height={300}
            onRowsRendered={onRowsRendered}
            rowCount={list.length}
            rowHeight={60}
            width={800}
            className={"table-auto"}
            rowClassName={getRowClassName}
            rowGetter={({ index }) => list[index]}
          >
            <Column
              headerRenderer={renderHeader}
              label="Make"
              cellRenderer={({ cellData }) => cellData}
              dataKey="make"
              width={200}
            />
            <Column
              headerRenderer={renderHeader}
              label={"Model"}
              dataKey="model"
              width={200}
              className="text-left"
              cellRenderer={({ cellData }) => cellData}
            />
            <Column
              headerRenderer={renderHeader}
              label="Color"
              dataKey="color"
              width={200}
              className="text-left"
              cellRenderer={({ cellData }) => cellData}
            />
            <Column
              headerRenderer={renderHeader}
              label="Year"
              dataKey="year"
              width={200}
              className="text-left"
              cellRenderer={({ cellData }) => cellData}
            />
            <Column
              headerRenderer={renderHeader}
              label="Seller"
              dataKey="seller"
              width={200}
              className="text-left"
              cellRenderer={({ cellData }) => cellData}
            />
            <Column
              headerRenderer={renderHeader}
              label="Price"
              dataKey="sellingprice"
              width={200}
              className="text-left"
              cellRenderer={({ cellData }) => cellData}
            />
          </Table>
        )}

      </InfiniteLoader>
    </div>
  );
};

export default CarTable;
