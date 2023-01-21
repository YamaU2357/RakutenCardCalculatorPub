import { FC, useState } from "react"
import { IconButton, Menu, MenuItem  } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

type Props = {
  logout: () => void;
};

export const LogoutButton: FC<Props> = (props)  => {
    const {logout} = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const onClickLogout = () => {
        logout()
    }
    return (  
        <>
            <IconButton id="user-menu-btn" sx={{ ml: 2}}
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
                size="large"
            >
                <AccountCircle/>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'user-menu-btn',
              }}
            >
              <MenuItem onClick={() => onClickLogout()}>Logout</MenuItem>
            </Menu>
        </>   
    )   
}