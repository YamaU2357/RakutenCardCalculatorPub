import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, IconButton, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
    listYearMonth : Date;
    setNextMonth: () => void;
    setLastMonth: () => void;
    setThisMonth: () => void;
};

export const ListYearMonthController: FC<Props> = (props)  => {
    const { listYearMonth, setNextMonth,setLastMonth,setThisMonth } = props;

    const onClickKeyboardArrowLeft = () => {
        setLastMonth()
    }
    const onClickKeyboardArrowRight = () => {
        setNextMonth()
    }
    
    const onClickThisMonth = () => {
        setThisMonth()
    }
    return (
        <>
            <Button variant="contained" onClick={() => onClickThisMonth()} sx={{ mr: 2 }}>
                今月
            </Button>
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => onClickKeyboardArrowLeft()}
                sx={{p:0}}
            >
                <KeyboardArrowLeft fontSize="large"/>
            </IconButton>
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => onClickKeyboardArrowRight()}
                sx={{ mr: 2, p:0}}
            >
                <KeyboardArrowRight fontSize="large"/>
            </IconButton>
            <Typography variant="h5" component="div" sx={{ mr: 2, p:0 ,flexGrow:1}}>
                {listYearMonth.getFullYear()}年{listYearMonth.getMonth()+1}月
            </Typography>
        </>
    )
}