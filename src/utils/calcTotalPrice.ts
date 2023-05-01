import { BagItem } from "../redux/slices/bagSlice"

export const calcTotalPrice = (items: BagItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}