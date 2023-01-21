import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FC , useState } from 'react';
import { PurchaseHistory } from 'types/PurchaseHistory';
import { IconButton } from '@mui/material';
import { Delete } from "@mui/icons-material";

type Props = {
  targetPurchaseHistory : PurchaseHistory;
  deletePurchaseHistory:(deletedHistory:PurchaseHistory) => void;
};

export const PurchaseHistoryDeleteDialog: FC<Props> = (props)  => {
  const {targetPurchaseHistory, deletePurchaseHistory} = props;

  const [open, setOpen] = useState(false);
  
  const handleClickOpen = (e:any) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveClose = async () => {
    deletePurchaseHistory(targetPurchaseHistory);
    handleClose();
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <Delete fontSize="small" color="secondary"/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            選択した購入履歴を削除しますがよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClose} color="secondary">削除</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}