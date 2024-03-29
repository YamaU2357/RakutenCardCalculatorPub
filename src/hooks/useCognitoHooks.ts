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
  getIdToken: () => Promise<string | undefined>;
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
    const { jwtVerify } = awsJwtVerify();

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
    const reLogin = () => {
      const userPool = new CognitoUserPool(awsCognitoConfig);
      const cognitoUser = userPool.getCurrentUser();
      const username = localStorage.getItem(
        localStrageConfig.username
      )
      const token = localStorage.getItem(`CognitoIdentityServiceProvider.${awsCognitoConfig.ClientId}.${username}.refreshToken`)!
      const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: token});
      if (cognitoUser && refreshToken) {

          cognitoUser.refreshSession(refreshToken,(err, session:AmazonCognitoIdentity.CognitoUserSession)=>{
            if(err){
              console.log(err);
              setIsLogin(false)
            }else{
              localStorage.setItem(
                localStrageConfig.username,
                session.getAccessToken().decodePayload().username
              )
              setIsLogin(true)
            }
          });

      }
    }
    const checkIsLogin = async () => {
      const { verifyResult } =  await jwtVerify()
      setIsLogin(verifyResult)
    }
    const getIdToken = async (): Promise<string | undefined> => {;
      const { verifyResult,idToken } =  await jwtVerify()
      if (verifyResult && idToken != null){
        return idToken
      }else{
        reLogin()
        const { verifyResult,idToken } =  await jwtVerify()
        if (verifyResult && idToken != null){
          return idToken
        }
      }
    }
    return {login,logout,getIdToken,changePassword,checkIsLogin,isLogin,isFirstLogin,userName}
}