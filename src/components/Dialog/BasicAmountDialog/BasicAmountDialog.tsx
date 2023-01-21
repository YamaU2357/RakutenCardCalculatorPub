import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useUploadPurchaseHistoryCsv } from 'hooks/useUploadDataCsv';
import { BasicAmount } from 'types/BasicAmount';
import type { PurchaseHistory } from "types/PurchaseHistory";
import { RakutenCardCSVDropArea } from './RakutenCardCSVDropArea';
import { localStrageConfig } from 'localStrageConfig';

type Props = {
  listYearMonth: Date;
  basicAmount : BasicAmount;
  updateBasicAmount: (newBasicAmount:BasicAmount) => void;
  sendPurchaseHistories:(year:number,month:number,newPurchaseHistories:PurchaseHistory[]) => void;
};

export const BasicAmountDialog: FC<Props> = (props)  => {
  const {basicAmount, updateBasicAmount, sendPurchaseHistories, listYearMonth} = props;
  const year = listYearMonth.getFullYear()
  const month = listYearMonth.getMonth() + 1
  const [open, setOpen] = useState(false);
  const {conversionCsvToPurchaseHistories} = useUploadPurchaseHistoryCsv();
  const [newBasicAmount, setNewBasicAmount] = useState<BasicAmount>({
    id: basicAmount.id,
    target_year_month : `${year}/${month}/1`,
    rent: 0,
    water_fare: 0,
    gas_fare: 0,
    electrical_fare: 0,
    user_name:""
  })
  const [csvData ,setCsvData] = useState<any>([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setNewBasicAmount({...basicAmount})
  },[open])

  const handleSaveClose = async () => {
    updateBasicAmount({...newBasicAmount});
    if(csvData.length){
      const username = localStorage.getItem(
        localStrageConfig.username
      )
      if (username != null) {
        const newPurchaseHistories = conversionCsvToPurchaseHistories(csvData,year,month,username)
        await sendPurchaseHistories(year,month,newPurchaseHistories)
      }
    }
    handleClose();
  };

  const onChangeRentTextBox = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    setNewBasicAmount((prev) => prev = {...newBasicAmount, rent:parseInt(e.target.value)})    
  }
  const onChangeWaterFareTextBox = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    setNewBasicAmount((prev) => prev = {...newBasicAmount, water_fare:parseInt(e.target.value)})
  }
  const onChangeGasFareTextBox = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    setNewBasicAmount((prev) => prev = {...newBasicAmount, gas_fare:parseInt(e.target.value)})
  }
  const onChangeElectricalFareTextBox = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
    setNewBasicAmount((prev) => prev = {...newBasicAmount, electrical_fare:parseInt(e.target.value)})
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        ＋金額入力
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>金額入力フォーム</DialogTitle>
        <DialogContent>
          <DialogContentText>
            今月の各種金額を入力してください
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="rent"
            label="家賃"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={basicAmount?.rent}
            onChange={(e)=>onChangeRentTextBox(e)}
          />
        <TextField
            required
            margin="dense"
            id="gas_fare"
            label="ガス代"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={basicAmount?.gas_fare}
            onChange={(e)=>onChangeGasFareTextBox(e)}
          />
        <TextField
            required
            margin="dense"
            id="water_fare"
            label="水道代"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={basicAmount?.water_fare}
            onChange={(e)=>onChangeWaterFareTextBox(e)}
          />
        <TextField
            required
            margin="dense"
            id="electrical_fare"
            label="電気代"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={basicAmount?.electrical_fare}
            onChange={(e)=>onChangeElectricalFareTextBox(e)}
        />
        <RakutenCardCSVDropArea setCsvData={setCsvData}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClose}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}