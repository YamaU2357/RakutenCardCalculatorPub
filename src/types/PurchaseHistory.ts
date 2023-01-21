export type PurchaseHistory = {
    id? : number;
    target_year_month: string;
    use_date: string;
    use_store_product_name: string;
    user: string;
    payment_methods: string;
    use_amount:number;
    payment_charge: number;
    pay_total_amount: number;
    current_month_payment_amount: number;
    next_month_brought_forward_balance: number;
    new_sign: string;
    total_target_flag: boolean;
    user_name: string;
};