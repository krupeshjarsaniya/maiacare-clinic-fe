import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface SubtitleObject {
  left: string;
  image?: string | StaticImageData;
  right: string;
}

type SubtitleType = string | SubtitleObject;

interface HeaderValue {
  title: string;
  subtitle?: SubtitleType;
  image?: string | StaticImageData;
}

interface HeaderState {
  title: string;
  subtitle: SubtitleType;
  image?: string | StaticImageData;
}

const initialState: HeaderState = {
  title: "",
  subtitle: "",
  image: "",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    // setHeaderData: (state, action: PayloadAction<HeaderValue>) => {
    //   state.title = action.payload.title;
    //   // state.subtitle = action.payload.subtitle || "";
    //   state.subtitle = {
    //     left: "",
    //     image: "",
    //     right: "",
    //   };
    //   state.image = action.payload.image || "";
    // },
    setHeaderData: (state, action: PayloadAction<HeaderValue>) => {
      state.title = action.payload.title;

      if (action.payload.subtitle !== undefined) {
        state.subtitle = action.payload.subtitle;
      }

      if (action.payload.image !== undefined) {
        state.image = action.payload.image;
      }
    },
    clearHeaderData: (state) => {
      state.title = "";
      // state.subtitle = "";
      state.subtitle = {
        left: "",
        image: "",
        right: "",
      };
      state.image = "";
    },
  },
});

export const { setHeaderData } = headerSlice.actions;
export default headerSlice.reducer;
