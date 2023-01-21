import { awsJwtVerify } from "lib/awsJwtVerify";
import { apiClient } from "lib/apiClient";
import { AxiosError, AxiosResponse } from "axios";
import { BasicAmount } from "types/BasicAmount";
import { useState } from "react";
import { axiosErrorOutput } from "lib/axiosErrorOutput";

type fetchProps = {
    year:number,
    month:number
}

type BasicAmountHooks = {
    basicAmount: BasicAmount,
    fetchBasicAmount: (props:fetchProps) => void,
    updateBasicAmount: (newBasicAmount:BasicAmount) => void,
}
export const useBasicAmountHooks = ():BasicAmountHooks =>{
    const [basicAmount,setBasicAmount] =  useState<BasicAmount>({
        id : "",
        target_year_month : "",
        rent: 0,
        water_fare: 0,
        gas_fare: 0,
        electrical_fare: 0,
        user_name: ""
    });
    
    const fetchBasicAmount = async (props:fetchProps) => {
        const {year,month} = props
        const { jwtVerify } = awsJwtVerify();
        const {idToken,verifyResult} =  await jwtVerify()
        
        if (verifyResult && idToken != null){
            const headers = {
                "Authorization": idToken
            }
            await apiClient.get(
                `/basic_amount/${year}/${month}`,
                { headers }, 
            )
            .then((res: AxiosResponse<BasicAmount>) => {
                const data = res.data;
                data.rent = Number(data.rent)
                data.water_fare = Number(data.water_fare)
                data.gas_fare = Number(data.gas_fare)
                data.electrical_fare = Number(data.electrical_fare)
    
                console.log('===basicAmount===');
                console.log(data);
                setBasicAmount(data)
            })
            .catch((error: AxiosError) => {
                axiosErrorOutput(error,"get basicAmount error")
            });
        }else{
            console.log("not logged in");
        }
    }

    const updateBasicAmount = async (newBasicAmount:BasicAmount) => {
        const { jwtVerify } = awsJwtVerify();
        const {idToken,verifyResult} =  await jwtVerify()
        
        const {target_year_month} = newBasicAmount
        const year = target_year_month.split('/')[0]
        const month = target_year_month.split('/')[1]
        if (verifyResult && idToken != null){
            const headers = {
                "Authorization": idToken
            }
            apiClient.put(
                `/basic_amount/${year}/${month}`,
                newBasicAmount, 
                { headers }
            )
            .then(res => {
                console.log(`success send history[${newBasicAmount.id}:${target_year_month}]`);
                setBasicAmount(newBasicAmount)
            }).catch((error: AxiosError) =>  {
                axiosErrorOutput(error,"send basicAmount error")
            })
        }else{
            console.log("not logged in")
        }
    }

    return {
        basicAmount,
        fetchBasicAmount,
        updateBasicAmount
    }
}