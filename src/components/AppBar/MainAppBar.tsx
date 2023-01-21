import { AlignHorizontalCenter, Calculate, ChildCare, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import type { BasicAmount } from 'types/BasicAmount';
import type { PurchaseHistory } from "types/PurchaseHistory";
import { BasicAmountDialog } from "components/Dialog/BasicAmountDialog/BasicAmountDialog";
import { LogoutButton } from 'components/Button/LogoutButton';
import { AppTitleBox } from './AppTitleBox';
import { ListYearMonthController } from './ListYearMonthController';

type Props = {
    children?: ReactNode;
};

export const MainAppBar: FC<Props> = (props)  => {
    const {children} = props;
    return (
        <AppBar position="static">
            <Toolbar>
                {children}
            </Toolbar>
        </AppBar>
    )
}