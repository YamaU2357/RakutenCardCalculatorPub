import { CognitoJwtVerifier } from "aws-jwt-verify";
import { awsCognitoConfig } from "awsCognitoConfig";
import { localStrageConfig } from "localStrageConfig";

type Result = {
    idToken? : string
    verifyResult : boolean
}
export const awsJwtVerify = () => {
    const jwtVerify = async function(): Promise<Result> {
        const result: Result = {
            verifyResult:false
        }
        console.log("verified localIdToken");
        const username = localStorage.getItem(
          localStrageConfig.username
        )
        const localStorageIdToken = localStorage.getItem(`CognitoIdentityServiceProvider.${awsCognitoConfig.ClientId}.${username}.idToken`)
        if (localStorageIdToken != null) {
          const verifier = CognitoJwtVerifier.create({
            userPoolId: awsCognitoConfig.UserPoolId,
            tokenUse: "id",
            clientId: awsCognitoConfig.ClientId,
          });
          try {
            const payload = await verifier.verify(
              localStorageIdToken
            );
            console.log("Token is valid.");
            const result: Result = {
                verifyResult:true,
                idToken: localStorageIdToken
            }
            return result
          } catch {
            console.log("Token not valid!");
          }
        }
        return result
    }
    return {jwtVerify}
}