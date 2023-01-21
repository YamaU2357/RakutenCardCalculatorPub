
import { ChangeEvent, FC , useState } from 'react';
import { PurchaseHistory } from 'types/PurchaseHistory';
import { Switch } from '@mui/material';

type Props = {
  targetPurchaseHistory : PurchaseHistory;
  updatePurchaseHistory:(newHistory:PurchaseHistory) => void;
};

export const IsCalculateSwitch: FC<Props> = (props)  => {
  const {targetPurchaseHistory, updatePurchaseHistory} = props;
  const [isCalculate, setIsCalculate] = useState(targetPurchaseHistory.total_target_flag);
  
  const changeIsCalculateSwitch = (e:ChangeEvent) => {
    targetPurchaseHistory.total_target_flag = !isCalculate
    updatePurchaseHistory(targetPurchaseHistory)
    setIsCalculate(!isCalculate)
  };
  return (
    <>
        <Switch
            checked={isCalculate}
            onChange={changeIsCalculateSwitch}
        />
    </>
  );
}