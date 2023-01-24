import type { PurchaseHistory } from "types/PurchaseHistory";

export const useUploadPurchaseHistoryCsv = () =>{
    const conversionCsvToPurchaseHistories = (csv:any, year:number, month:number,user_name:string):PurchaseHistory[] => {
        const purchaseHistories:PurchaseHistory[] = []
        csv.map((row: any, index: number) => {
            if (index > 0 && row[0] != ""){
                const purchaseHistory:PurchaseHistory ={
                    target_year_month: `${year}/${month}/1`,
                    use_date: row[0],
                    use_store_product_name: row[1],
                    user: row[2],
                    payment_methods: row[3],
                    use_amount: parseInt(row[4]),
                    payment_charge: parseInt(row[5]),
                    pay_total_amount: parseInt(row[6]),
                    current_month_payment_amount: parseInt(row[7]),
                    next_month_brought_forward_balance: parseInt(row[8]),
                    new_sign: row[9],
                    total_target_flag: true,
                    user_name
                }
                purchaseHistories.push(purchaseHistory)
            }
        });
        return purchaseHistories
    }
    return {conversionCsvToPurchaseHistories}
}
