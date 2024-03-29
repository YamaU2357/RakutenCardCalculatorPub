import { awsJwtVerify } from "lib/awsJwtVerify";
import { apiClient } from "lib/apiClient";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosErrorOutput } from "lib/axiosErrorOutput";
import { PurchaseHistory } from "types/PurchaseHistory";
import { puchaseHistoryResponse } from "types/puchaseHistoryResponse";

type PurchaseHistoryHooks = {
    purchaseHistories: PurchaseHistory[];
    isHistoryLoded: Boolean;
    sumPurchaseHistoriesAmount:number;
    fetchPurchaseHistories:(year:number,month:number) => void;
    sendPurchaseHistories:(year:number,month:number,newPurchaseHistories:PurchaseHistory[]) => void;
    updatePurchaseHistory:(newHistory:PurchaseHistory) => void;
    deletePurchaseHistory:(deletedHistory:PurchaseHistory) => void;
    calcPurchaseHistoriesAmount:() => void;
}
export const usePurchaseHistoryHooks = (getIdToken: () => Promise<string | undefined>):PurchaseHistoryHooks =>{
    const [purchaseHistories ,setPurchaseHistories]  = useState<PurchaseHistory[]>([]);
    const [isHistoryLoded, setIsHistoryLoded] = useState<Boolean>(false);
    const [sumPurchaseHistoriesAmount, setSumPurchaseHistoriesAmount] = useState<number>(0);

    const calcPurchaseHistoriesAmount = () => {
        setSumPurchaseHistoriesAmount(0)
        purchaseHistories.map((history:PurchaseHistory) =>{
            const {pay_total_amount, total_target_flag} = history
            if(total_target_flag){
                setSumPurchaseHistoriesAmount((prev) => prev + Number(pay_total_amount))
            }
        })
    }
    const fetchPurchaseHistories = async (year:number,month:number) => {
        const idToken = await getIdToken();
        if (idToken != undefined){
            const headerData = {
                "Authorization": idToken
            }
            setIsHistoryLoded(true)
            await apiClient.get(
                `/purchaseHistories/${year}/${month}`,
                {
                    headers: headerData
                }
            )
            .then((res: AxiosResponse<puchaseHistoryResponse>) => {
                console.log(`success fetch histories`); 
                const histories = res.data.histories
                if (histories.length > 0 ){
                    histories.map(history => {
                        history.total_target_flag = history.total_target_flag.toString() == 'true' ? true : false;
                    })
                }
                setPurchaseHistories(histories)
            })
            .catch((error: AxiosError) =>{
                axiosErrorOutput(error,"get purshaseHisories error")
            })
            .finally(()=> {
                setIsHistoryLoded(false)
            })
        }
    }

    const sendPurchaseHistories = async (year:number,month:number,newPurchaseHistories:PurchaseHistory[]) => {
        const idToken = await getIdToken();
        if (idToken != undefined){
            const headers = {
                "Authorization": idToken
            }
            setIsHistoryLoded(true)
            await apiClient.post(
                `/purchaseHistories/${year}/${month}`,
                newPurchaseHistories,
                {headers}
            )
            .then((res:AxiosResponse) => {
                console.log(`success send histories [${newPurchaseHistories.length} rows]`);
                setPurchaseHistories(newPurchaseHistories)
            }).catch((error: AxiosError) => {
                axiosErrorOutput(error,"send PurchaseHistories error")
            })
            .finally(() => {
                setIsHistoryLoded(false)
            })
        }
    }

    const updatePurchaseHistory = async (newHistory:PurchaseHistory) => {
        const {id,use_store_product_name} = newHistory;
        const idToken = await getIdToken();
        if (idToken != undefined){
            const headers = {
                "Authorization": idToken
            }
            const oldPurchaseHistories = {...purchaseHistories}
            const newPurchaseHistories = purchaseHistories.map(purchaseHistory =>{
                if (purchaseHistory.id != newHistory.id){
                  return purchaseHistory
                }else{
                  return newHistory
                }
            })
            setPurchaseHistories(newPurchaseHistories)
            apiClient.put(
                `/purchaseHistory/${id}`,
                newHistory,
                { headers }
            )
            .then((res:AxiosResponse) => {
                console.log(`success send history[${id}:${use_store_product_name}]`);
            }).catch((error: AxiosError) =>  {
                axiosErrorOutput(error,"post PurchaseHistory error")
                setPurchaseHistories(oldPurchaseHistories)
            })
        }
    }
    const deletePurchaseHistory = async (deletedHistory:PurchaseHistory) => {
        const {id} = deletedHistory;
        const idToken = await getIdToken();
        if (idToken != undefined){
            const headers = {
                "Authorization": idToken
            }
            apiClient.delete(
                `/purchaseHistory/${id}`,
                {headers}
            )
            .then((res:AxiosResponse) => {
                console.log(`success delete history [${id}]`);
                const newPurchaseHistories = purchaseHistories.filter(purchaseHistory =>{
                    return purchaseHistory.id != deletedHistory.id
                })
                setPurchaseHistories(newPurchaseHistories)
            }).catch((error: AxiosError) => {
                axiosErrorOutput(error,"post PurchaseHistories error")
            })
        }
    }
    return {
        purchaseHistories,
        isHistoryLoded,
        sumPurchaseHistoriesAmount,
        fetchPurchaseHistories,
        sendPurchaseHistories,
        updatePurchaseHistory,
        deletePurchaseHistory,
        calcPurchaseHistoriesAmount
    }
}