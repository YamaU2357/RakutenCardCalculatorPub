import { FC } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginForm } from "./LoginForm";
import { NewPasswordForm } from "./NewPasswordForm";

type loginProps ={
  username:string
  password:string
}
type changePasswordProps = {
  newPassword:string
}
type Props = {
  login: (props:loginProps) => void;
  changePassword: (props:changePasswordProps) => void
  isFirstLogin: Boolean;
};

const theme = createTheme();

export const Login: FC<Props> = (props) => {
  const {login, changePassword, isFirstLogin} = props

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {isFirstLogin ? (
              <NewPasswordForm changePassword={changePassword} />
            ) : (
              <LoginForm login={login} />
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};