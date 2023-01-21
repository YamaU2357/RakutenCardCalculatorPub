import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, useEffect, useState } from "react";
import { BasicAmount } from "../../types/BasicAmount";

type Props = {
    basicAmount : BasicAmount;
    sumPurchaseHistoriesAmount : number;
};

export const CalculatedResultBox: FC<Props> = (props)  => {
    const { basicAmount, sumPurchaseHistoriesAmount } = props;

    const [sumAmount, setSumAmount] = useState<number>(0)
    const [sumBasicAmount, setSumBasicAmount] = useState<number>(0)
        
    useEffect(() => {
        setSumBasicAmount((prev) => prev=0)
        setSumBasicAmount((prev) => prev = basicAmount.rent + basicAmount.electrical_fare + basicAmount.gas_fare + basicAmount.water_fare)
    },[basicAmount])

    useEffect(() => {
        setSumAmount((prev) => prev = (sumPurchaseHistoriesAmount + sumBasicAmount) / 2)
    },[sumPurchaseHistoriesAmount, sumBasicAmount])

    return (
        <>   
            <Box
                sx={{
                p: 3,
                mb: 1,
                mt: 1,
                bgcolor: grey[300],
                borderRadius: 3,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ color: 'text.primary', fontSize:35, mt:3, mr:2}} >
                    (
                    </Box>
                    <Box sx={{mr:2}}>
                        <Box sx={{ color: 'text.secondary' }}>RakutenCard合計</Box>
                        <Box sx={{ color: 'text.primary', fontSize: 40, fontWeight: 'medium' }}>
                            {sumPurchaseHistoriesAmount.toLocaleString()}
                        </Box>
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize:35, mt:3, mr:2}} >
                    +
                    </Box>
                    <Box sx={{mr:2}}>
                        <Box sx={{ color: 'text.secondary' }}>毎月かかる金額</Box>
                        <Box sx={{ color: 'text.primary', fontSize: 40, fontWeight: 'medium' }}>
                            {sumBasicAmount.toLocaleString()}
                        </Box>
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize: 35, mt:3, mr:2}} >
                    )
                    </Box>
                    <Box sx={{mr:2}}>
                        <Box sx={{ color: 'text.primary', fontSize: 40, fontWeight: 'medium' ,mt:3}}>
                            /2
                        </Box>
                    </Box>
                    <Box sx={{ color: 'text.primary', fontSize: 35, mt:3, mr:2}}>=</Box>
                    <Box>
                        <Box sx={{ color: 'text.secondary' }}>支払金額</Box>
                        <Box sx={{ color: 'text.primary', fontSize: 40, fontWeight: 'medium' }}>
                            {sumAmount.toLocaleString()}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}