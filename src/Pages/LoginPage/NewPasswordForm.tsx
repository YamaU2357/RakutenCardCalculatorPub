import { FC, useRef } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';


type changePasswordProps = {
  newPassword:string
}
type Props = {
  changePassword: (props:changePasswordProps) => void
};

const theme = createTheme();

export const NewPasswordForm: FC<Props> = (props) => {
  const {changePassword} = props

  const refNewPassword = useRef<HTMLInputElement>(null);
  const refReconfirmationPassword = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!refNewPassword.current?.value) {
      console.log("New Password is Empty");
      return;
    }
    if (!refReconfirmationPassword.current?.value) {
      console.log("Password is Empty");
      return;
    }
    if (refReconfirmationPassword.current?.value != refNewPassword.current?.value) {
      console.log("ReconfirmationPassword is different");
      return;
    }
    changePassword({newPassword: refNewPassword.current?.value})
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        ChangePassword
      </Typography>
      <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={refNewPassword}
          />
          <TextField
              margin="normal"
              required
              fullWidth
              name="reconfirmationPassword"
              label="rePassword"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={refReconfirmationPassword}
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
          >
              ChangePassword
          </Button>
      </Box>
    </>
  );
};