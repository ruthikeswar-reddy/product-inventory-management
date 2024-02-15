import React, {useState} from 'react';
import {Box, useTheme} from '@mui/material'
import { useGetTransactionsQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {

    const theme = useTheme();

    //values to be sent to backend
    const [page, setPage] = useState(1);
    const[pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const[search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading} = useGetTransactionsQuery({page, pageSize, sort:JSON.stringify(sort), search});

    const columns = [
        {
            field:"_id",
            headerName:"ID", //column name
            flex:1,
        },
        {
            field:"userId",
            headerName:"User ID", //column name
            flex:1
        },
        {
            field:"createdAt",
            headerName:"Created At", //column name
            flex:1,
        },
        {
            field:"products",
            headerName:"# of Products", //column name
            flex:0.5,
            sortable: false,
            renderCell: (params) => params.value.length // count the number of products
        },
        {
            field:"cost",
            headerName:"Cost", //column name
            flex:1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`, // not works properly as we have defined dtype wrongly in our dbase,if we want we have to change it to number dtype.
        },

    ]

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle=" Entire List of Transactions" />
        <Box height = "75vh"
            sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary[200]} !important`,
                },
            }}        
        >
            {/* server side pagination*/}
            <DataGrid
                loading = {isLoading||!data}
                getRowId = {(row)=>row._id}
                rows = {(data && data.transactions) || []}
                columns = {columns}
                rowsPerPageOptions={[20,50,100]}
                rowCount = {(data &&data.total) || 0}
                pagination
                page = {page}
                pageSise={pageSize}
                paginationMode='server'
                sortingMode='server'
                onPageChange={(newPage)=>setPage(newPage)}
                onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
                onSortModelChange={(newSortModel)=>setSort(...newSortModel)}
                components={{ Toolbar: DataGridCustomToolbar }}
                componentsProps={{
                    toolbar: { searchInput, setSearchInput, setSearch },
                }}

            />
        </Box>
    </Box>
  )
}

export default Transactions