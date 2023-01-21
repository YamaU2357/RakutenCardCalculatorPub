import renderer from 'react-test-renderer';
import { renderHook, act } from '@testing-library/react'
import { MainAppBar } from "components/AppBar/MainAppBar";
import { useState } from 'react';
import { BasicAmount } from 'types/BasicAmount';
import { PurchaseHistory } from 'types/PurchaseHistory';

describe('Snaosgits MainAppBar', () => {
  const setBasicAmount =  (value: BasicAmount) => void
  test('test case 1',() =>{
  //   const [listYearMonth, setListYearMonth] = useState<Date>(new Date('2023/1/1'));
  //   const [isHistoryLoded, setIsHistoryLoded] = useState<Boolean>(false);
  //   const [isLogin ,setIsLogin]  = useState<Boolean>(false);
  //   const [purchaseHistories ,setPurchaseHistories]  = useState<PurchaseHistory[]>([]);
  //   const component = renderer.create(
  //     <MainAppBar 
  //       listYearMonth = {listYearMonth} 
  //       setListYearMonth = {setListYearMonth} 
  //       basicAmount = {basicAmount} 
  //       setBasicAmount = {setBasicAmount} 
  //       setIsHistoryLoded = {setIsHistoryLoded}
  //       setPurshaseHistoies = {setPurchaseHistories} 
  //       setIsLogin = {setIsLogin}
  //     />
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  })
});