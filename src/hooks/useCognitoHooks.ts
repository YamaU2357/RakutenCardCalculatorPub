import { awsCognitoConfig } from "awsCognitoConfig"
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute} from "amazon-cognito-identity-js";
import { localStrageConfig } from "localStrageConfig";
import { useState } from "react";
import { awsJwtVerify } from "lib/awsJwtVerify";

type loginProps ={
  username:string
  password:string
}
type changePasswordProps = {
  newPassword:string
}
type CognitoHooks = {
  login: (props:loginProps) => void;
  changePassword: (props:changePasswordProps) => void
  logout: () => void;
  checkIsLogin: () => void;
  isLogin: Boolean;
  isFirstLogin: Boolean;
  userName: String;
}
export const useCognitoHooks = ():CognitoHooks => {
    const [ isLogin ,setIsLogin]  = useState<Boolean>(false);
    const [ userName ,setUserName]  = useState<String>("");
    const [ isFirstLogin, setIsFirstLogin ] = useState<Boolean>(false)
    const [ userAttr, setUserAttr ] = useState<AmazonCognitoIdentity.CognitoUserAttribute>()
    const [ cognitoUser, setCognitoUser] = useState<AmazonCognitoIdentity.CognitoUser>()

    const login = (props:loginProps) => {
      const userPool = new CognitoUserPool(awsCognitoConfig);
      const{username,password} = props
        const userData = {
          Username: username,
          Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        const authenticationDetails = new AuthenticationDetails(
          {
            Username: username,
            Password: password,
          }
        );
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess:  (cognitoUserSession) =>{
            console.log("Login Success");
            localStorage.setItem(
              localStrageConfig.username,
              cognitoUserSession.getAccessToken().decodePayload().username
            )
            setUserName(username)
            setIsLogin(true)
          },
          newPasswordRequired: (userAttr:CognitoUserAttribute) =>{
            setIsFirstLogin(true)
            setCognitoUser(cognitoUser)
            setUserAttr(userAttr)
          },
          onFailure: function (err) {
            console.log("Login Failure");
            console.log(err);
          },
        });
    }
    const changePassword = (props:changePasswordProps) => {
      const { newPassword } = props;
      if (cognitoUser != null) {
        cognitoUser.completeNewPasswordChallenge(newPassword, userAttr, {
          onSuccess: (cognitoUserSession) => {            
              setIsLogin(true)
              setIsFirstLogin(false)
              localStorage.setItem(
                localStrageConfig.username,
                cognitoUserSession.getAccessToken().decodePayload().username
              )
          },
          onFailure: function (err) {
            console.log("change Password Failure");
            console.log(err);
          }
        });
      }else{
        console.log("change Password Failure");
      }
    }
    const logout = () => {
      const userPool = new CognitoUserPool(awsCognitoConfig);
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
          cognitoUser.signOut();
          localStorage.removeItem(
            localStrageConfig.username
          )
          setIsLogin(false)
      }
    }
    const checkIsLogin = async () => {
      const { jwtVerify } = awsJwtVerify();
      const { verifyResult } =  await jwtVerify()
      setIsLogin(verifyResult)
    }
    return {login,logout,changePassword,checkIsLogin,isLogin,isFirstLogin,userName}
}