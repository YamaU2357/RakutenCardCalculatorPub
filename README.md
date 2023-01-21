# RakutenCardCalculator
楽天カードと月々の生活費を折半するための計算ツールです。
ReactとAWSを利用してサーバレスで構築することを想定しています。
CloudFormationテンプレートは「./aws_cloudformation」を確認してください。

## 利用サービス等

### FrontEnd
React
S3
CloudFront

### BackEnd
Cognito
API Gateway
Lambada
DynamoDB

### CI/CD
AWS Codeシリーズ

### IaC
CloudFormation
CDK