import { useState } from "react";

type ListYearMonth = {
    listYearMonth: Date;
    setNextMonth: () => void;
    setLastMonth: () => void;
    setThisMonth: () => void;
};

export const useListYearMonth = ():ListYearMonth => {
    const date = new Date();
    const [listYearMonth, setListYearMonth] = useState<Date>(new Date(date.setDate(1)));
    
    const setNextMonth = () => {
        setListYearMonth(new Date(listYearMonth.setMonth(listYearMonth.getMonth() + 1)))
    }
    const setLastMonth = () => {
        setListYearMonth(new Date(listYearMonth.setMonth(listYearMonth.getMonth() - 1)))
    }
    const setThisMonth = () =>{
        setListYearMonth(new Date(date.setDate(1)))
    }

    return {
        listYearMonth,
        setNextMonth,
        setLastMonth,
        setThisMonth
    }
}