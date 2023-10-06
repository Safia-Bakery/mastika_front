import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { FileItem } from "src/components/FileUpload";

interface State {
  sidebarToggler: boolean;
  photoReport?: FileItem[] | null;
}

const initialState: State = {
  sidebarToggler: false,
  photoReport: null,
};

export const toggleReducer = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    sidebarHandler: (state, { payload }: PayloadAction<boolean>) => {
      state.sidebarToggler = payload;
    },
    uploadReport: (state, { payload }: PayloadAction<FileItem[] | null>) => {
      state.photoReport = payload;
    },
  },
});

export const toggleSidebar = (state: RootState) => state.selects.sidebarToggler;
export const reportImgSelector = (state: RootState) =>
  state.selects.photoReport;

export const { sidebarHandler, uploadReport } = toggleReducer.actions;
export default toggleReducer.reducer;
