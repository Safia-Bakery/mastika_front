import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { FileItem } from "src/components/FileUpload";

interface State {
  files: { [key: string]: FormData };
  images: { [key: string]: FileItem[] };
}

const initialState: State = {
  files: {},
  images: {},
};

export const imageUploadReducer = createSlice({
  name: "image_upload",
  initialState,
  reducers: {
    addImage: (
      state,
      action: PayloadAction<{ name: string | number; files: FileItem[] }>
    ) => {
      const { name, files } = action.payload;
      //   state.items[payload.name] = payload.files;

      const formData = new FormData();
      files.forEach((item) => {
        formData.append("files", item.file, item.file.name);
      });
      state.files[name] = formData;
      state.images[name] = files;
    },

    deleteImg: (
      state,
      action: PayloadAction<{ key: string | number; index: number }>
    ) => {
      const { key, index } = action.payload;
      const updated = state.images[key].filter((_, idx) => index !== idx);

      const formData = new FormData();
      updated.forEach((item) => {
        formData.append("files", item.file, item.file.name);
      });

      state.images[key] = updated;
      state.files[key] = formData;

      // setFileList(updatedFileList);
    },
  },
});

export const imgSelector = (state: RootState) => state.images.images;
export const imgFileSelector = (state: RootState) => state.images.files;

export const { addImage, deleteImg } = imageUploadReducer.actions;
export default imageUploadReducer.reducer;
