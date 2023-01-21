import { Calculate } from '@mui/icons-material';
import { Box,Typography } from "@mui/material";
import { FC } from "react";

type Props = {
    AppTitle: string;
}
export const AppTitleBox: FC<Props> = (props)  => {
    const {AppTitle} = props;
    return (
        <Box sx={{display:"flex" , alignItems:"center"}}>
            <Calculate />
            <Typography variant="h5" component="div" sx={{ mr: 2 }}>
                {AppTitle}
            </Typography>
        </Box>
    )
}