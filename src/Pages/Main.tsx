import { FC, useEffect } from "react";
import styled from 'styled-components';
import { MainAppBar } from "components/AppBar/MainAppBar";
import { CalculatedResultBox } from "components/Box/CalculatedResultBox";
import { PurchaseHistoriesDataGrid } from "components/DataGrid/PurchaseHistoriesDataGrid";
import { RadiusCards } from "components/RadiusCards/RadiusCards";
import { Login } from "Pages/LoginPage/LoginPage";
import { LogoutButton } from "components/Button/LogoutButton";
import { BasicAmountDialog } from "components/Dialog/BasicAmountDialog/BasicAmountDialog";
import { ListYearMonthController } from "components/AppBar/ListYearMonthController";
import { AppTitleBox } from "components/AppBar/AppTitleBox";
import { useListYearMonth } from "hooks/useListYearMonth";
import { useBasicAmountHooks } from "hooks/useBasicAmountHooks";
import { usePurchaseHistoryHooks } from "hooks/usePurchaseHistoryHooks";
import { useCognitoHooks } from "hooks/useCognitoHooks";

const StyledContainerDiv = styled.div`
  margin: 10px;  
`;

export const Main:FC = () =>{
  const {listYearMonth,setNextMonth,setLastMonth,setThisMonth} = useListYearMonth();
  const {basicAmount, fetchBasicAmount, updateBasicAmount } = useBasicAmountHooks();
  const {login,logout,changePassword,checkIsLogin,isLogin,isFirstLogin,userName} = useCognitoHooks();
  const {
    purchaseHistories, isHistoryLoded, sumPurchaseHistoriesAmount,
    fetchPurchaseHistories, sendPurchaseHistories,
    updatePurchaseHistory, deletePurchaseHistory,
    calcPurchaseHistoriesAmount
  } = usePurchaseHistoryHooks();

  useEffect(() => {
    if(isLogin){
      fetchBasicAmount({year: listYearMonth.getFullYear(),month:listYearMonth.getMonth()+1})
      fetchPurchaseHistories(listYearMonth.getFullYear(), listYearMonth.getMonth()+1)
    }
  },[listYearMonth,isLogin])
  
  useEffect(() => {
    calcPurchaseHistoriesAmount()
  },[purchaseHistories])

  useEffect(() => {
    checkIsLogin()
  },[])

  if(isLogin){
    return (
      <>
        <MainAppBar>
          <AppTitleBox AppTitle = "RaktenCardCalculator"/>
          <ListYearMonthController 
            listYearMonth = {listYearMonth}
            setNextMonth = {setNextMonth}
            setLastMonth = {setLastMonth}
            setThisMonth = {setThisMonth}
          />
          <BasicAmountDialog 
              listYearMonth = {listYearMonth}
              basicAmount = {basicAmount} 
              updateBasicAmount = {updateBasicAmount} 
              sendPurchaseHistories = {sendPurchaseHistories}
          />
          <LogoutButton logout={logout}/>
        </MainAppBar>
        <StyledContainerDiv>
          <CalculatedResultBox 
            sumPurchaseHistoriesAmount={sumPurchaseHistoriesAmount}
            basicAmount = {basicAmount} 
          />
        </StyledContainerDiv>
        <StyledContainerDiv>
          <RadiusCards basicAmount={basicAmount} sumPurchaseHistoriesAmount={sumPurchaseHistoriesAmount}/>
        </StyledContainerDiv>
        <PurchaseHistoriesDataGrid 
          purchaseHistories={purchaseHistories} 
          updatePurchaseHistory = {updatePurchaseHistory} 
          deletePurchaseHistory = {deletePurchaseHistory}
          isHistoryLoded = {isHistoryLoded}
        ></PurchaseHistoriesDataGrid>
      </>
    );
  }else{
    return (
      <Login login={login} changePassword={changePassword} isFirstLogin={isFirstLogin}/>
    )
  }
}