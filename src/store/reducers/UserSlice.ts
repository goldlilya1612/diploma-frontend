import {EUserStatus} from "../../enums/user-statuses.enum";
import {IGroupRegister} from "../../interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUserState {
    email: string,
    name: string,
    surname: string,
    fathername: string,
    status: EUserStatus,
    groups: Array<IGroupRegister> | null,
}
interface IInitialUserState {
    user: IUserState;
}




const initialUserState: IInitialUserState = {
    user: {
        email: '',
        name: '',
        surname: '',
        fathername: '',
        status: EUserStatus.STUDENT,
        groups: null,
    }
}



export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        getUser(state, action: PayloadAction<IUserState>) {
            state.user = action.payload;
        }
    }
})
export default userSlice.reducer;