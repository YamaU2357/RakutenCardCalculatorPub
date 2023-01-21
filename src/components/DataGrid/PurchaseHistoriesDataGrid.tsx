import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IsCalculateSwitch } from 'components/Switch/IsCalculateSwitch';
import { FC } from 'react';
import { PurchaseHistory } from '../../types/PurchaseHistory';
import { PurchaseHistoryDeleteDialog } from '../Dialog/PurchaseHistoryDeleteDialog/PurchaseHistoryDeleteDialog';

type Props = {
    purchaseHistories : PurchaseHistory[];
    updatePurchaseHistory:(newHistory:PurchaseHistory) => void;
    deletePurchaseHistory:(deletedHistory:PurchaseHistory) => void;
    isHistoryLoded: Boolean;
};

export const PurchaseHistoriesDataGrid: FC<Props> = (props) => {
    const { purchaseHistories,updatePurchaseHistory,deletePurchaseHistory,isHistoryLoded }= props;
    const columns: GridColDef[] = [
        {
            field: 'use_date',
            headerName: '利用日',
            width: 150,
        },
        {
            field: 'use_store_product_name',
            headerName: '利用店名',
            width: 250,
            flex: 1,
        },
        {
            field: 'user',
            headerName: '利用者',
            width: 150,
        },
        {
            field: 'payment_methods',
            headerName: '支払方法',
            width: 110,
        },
        {
            field: 'use_amount',
            headerName: '利用金額',
            type: 'number',
            width: 110,
        },
        {
            field: 'payment_charge',
            headerName: '支払い手数料',
            type: 'number',
            width: 110,
        },
        {
            field: 'pay_total_amount',
            headerName: '支払総額',
            type: 'number',
            width: 110,
        },
        {
            field: 'current_month_payment_amount',
            headerName: '当月支払金額',
            type: 'number',
            width: 110,
        },
        {
            field: 'next_month_brought_forward_balance',
            headerName: '繰越金額',
            type: 'number',
            width: 110,
        },
        { 
            field: 'delete', headerName: '削除', width: 50, 
            renderCell: (params) => {
                return (
                    <PurchaseHistoryDeleteDialog 
                        targetPurchaseHistory = {params.row as PurchaseHistory}
                        deletePurchaseHistory = {deletePurchaseHistory}
                    />
                );
            } 
        },        
        { 
            field: 'isCalculate', headerName: '計算対象', width: 80, 
            renderCell: (params) => {
                return (
                    <IsCalculateSwitch 
                        targetPurchaseHistory = {params.row as PurchaseHistory}
                        updatePurchaseHistory = {updatePurchaseHistory}
                    />
                );
            }
        }
    ];

    if (isHistoryLoded){
        return (
            <Box display="flex" m={20} justifyContent="center">
                <Box>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }else{
        return (
            <div style={{ display: 'flex'}}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        initialState={{
                            sorting: {
                                sortModel:[{field: 'use_date',sort:'desc'}]
                            }
                        }}
                        autoHeight {...purchaseHistories}
                        rows={purchaseHistories}
                        columns={columns}
                        disableSelectionOnClick
                    />
                </div>
            </div>
        );
    }
}
