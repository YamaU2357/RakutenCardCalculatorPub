import { CreditCardOutlined, HomeWorkOutlined, LocalFireDepartmentOutlined, OilBarrelOutlined, TungstenOutlined } from '@mui/icons-material';
import { Grid } from "@mui/material";
import { blue, deepPurple, green, orange, teal } from "@mui/material/colors";
import { FC } from "react";
import { BasicAmount } from "../../types/BasicAmount";
import { RadiusCard } from "../RadiusCard/RadiusCard";

type Props = {
    sumPurchaseHistoriesAmount: number
    basicAmount: BasicAmount
};

export const RadiusCards:FC<Props> = (props) =>{
    const {basicAmount, sumPurchaseHistoriesAmount} = props
    return (
        <Grid container spacing={2}>
            <Grid item xs={2.4}>
                <RadiusCard cardBgColor={teal[900]} subTitle={"楽天カード"} title={sumPurchaseHistoriesAmount.toLocaleString()}>
                    <CreditCardOutlined style={{color: "#ffffff"}}/>
                </RadiusCard>
            </Grid>
            <Grid item xs={2.4}>
                <RadiusCard cardBgColor={orange[700]} subTitle={"家賃"} title={basicAmount.rent.toLocaleString()}>
                    <HomeWorkOutlined style={{color: "#ffffff"}}/>
                </RadiusCard>
            </Grid>
            <Grid item xs={2.4}>
                <RadiusCard cardBgColor={green[600]} subTitle={"ガス代"} title={basicAmount.gas_fare.toLocaleString()}>
                    <LocalFireDepartmentOutlined style={{color: "#ffffff"}}/>
                </RadiusCard>
            </Grid>
            <Grid item xs={2.4}>
                <RadiusCard cardBgColor={blue[500]} subTitle={"水道代"} title={basicAmount.water_fare.toLocaleString()}>
                    <OilBarrelOutlined style={{color: "#ffffff"}}/>
                </RadiusCard>
            </Grid>
            <Grid item xs={2.4}>
                <RadiusCard cardBgColor={deepPurple[700]} subTitle={"電気代"} title={basicAmount.electrical_fare.toLocaleString()}>
                    <TungstenOutlined style={{color: "#ffffff"}}/>
                </RadiusCard>
            </Grid>
        </Grid>
    )
}