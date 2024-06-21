import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  AuthProvider,
  ModalRoomChatProvider,
  RoomProvider,
  ThemeProvider,
} from "@/contexts";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RoomProvider>
            <ModalRoomChatProvider>
              <App />
              <ToastContainer
                style={{
                  zIndex: 10005,
                }}
              />
            </ModalRoomChatProvider>
          </RoomProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
