import { FC, ReactNode } from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

type Props = {
    subTitle: string;
    title: string;
    cardBgColor: string;
    children?: ReactNode;
};

export const RadiusCard:FC<Props> = (props) =>{
    const {subTitle , title="0" , cardBgColor ,children} = props
    return (
        <Card sx={{ minWidth: 150, borderRadius: '9px',  bgcolor: cardBgColor}}>
            <CardContent>
                {children}
                <Typography sx={{ fontSize: 14 }} color="#ffffff" gutterBottom>
                    {subTitle}
                </Typography>
                <Typography variant="h4" color="#ffffff" component="div">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}