import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    relativeUsers: {
      user: [
        { id: 1, pic: null, name: "Harish", status: "offline" },
        { id: 2, pic: null, name: "Sumeet", status: "offline" },
        { id: 3, pic: null, name: "Bharat", status: "offline" },
        { id: 4, pic: null, name: "Nirmala", status: "offline" },
        { id: 5, pic: null, name: "Simran", status: "offline" },
        { id: 6, pic: null, name: "Bharti", status: "offline" },
        { id: 7, pic: null, name: "Divya", status: "offline" },
        { id: 8, pic: null, name: "Riya", status: "offline" },
        { id: 9, pic: null, name: "Rohit", status: "offline" },
      ],
      unseen: null,
    },
    onlineUsers: null,
    loginStatus: false,
    connected: false,
  },
  reducers: {
    setUser: (state, action) => {
      const data = action.payload.data;
      state.userInfo = data;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload.data;
    },
    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload.data;
    },
    setRelativeUser: (state, action) => {
      state.relativeUsers = action.payload.data;
    },
    setConnectionStatus: (state, action) => {
      state.connected = action.payload;
    },
    incrementUnseenMessage: (state, action) => {
      if (state.relativeUsers.unseen[action.payload]) {
        state.relativeUsers.unseen[action.payload] += 1;
      } else {
        state.relativeUsers.unseen[action.payload] = 1;
      }
    },
    makeSeen: (state, action) => {
      if (state.relativeUsers.unseen[action.payload]) {
        state.relativeUsers.unseen[action.payload] = 0;
      }
    },
  },
});
export const {
  setUser,
  setLoginStatus,
  setConnectionStatus,
  setOnlineUser,
  setRelativeUser,
  incrementUnseenMessage,
  makeSeen,
} = UserSlice.actions;
export default UserSlice.reducer;
