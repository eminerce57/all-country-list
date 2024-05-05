import axios from "axios";
import "js-loading-overlay";
import router from "../router";
import Swal from "sweetalert2";
const API_URL =  "https://localhost:7220/api/";

export const axiosApp = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("token"),
  },
});

axiosApp?.interceptors?.request.use(
  function (config) {
    JsLoadingOverlay.show({
      spinnerIcon: "ball-atom",
      spinnerColor: "#007bff",
      spinnerSize: "2x",
    });
    return config;
  },
  function (error) {
    console.log("ERROR := ", error);
    return Promise.reject(error);
  }
);
axiosApp?.interceptors?.response.use(
  (response) => {
    JsLoadingOverlay.hide();
    return response;
  },
  (error) => {
    JsLoadingOverlay.hide();


    throw error;
  }
);

//***sitesi genel gidenler için yapıldı ilerde kaldırılabilir !!! */
export const axiosPublicApp = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json;",
  },
});

axiosPublicApp.interceptors.request.use(
  function (config) {
    JsLoadingOverlay.show({
      spinnerIcon: "ball-atom",
      spinnerColor: "#007bff",
      spinnerSize: "2x",
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosPublicApp.interceptors.response.use(
  (response) => {
    JsLoadingOverlay.hide();
    if (!response.data.status) {
      // if (response.data.message.indexOf("token bilgisi geçersiz") >= 0) {
      //       localStorage.clear();
      //       router.push("/login");
      // }
    }
    return response;
  },
  (error) => {
    Swal.fire({
      title: `Hata!`,
      text: `${error?.response?.data}.(${error?.message})`,
      icon: "error",
      confirmButtonText: "Tamam",
    });
    throw error;
  }
);

export const axiosFileApp = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    token: localStorage.getItem("token"),
  },
});

axiosFileApp.interceptors.request.use(
  function (config) {
    config.headers.token = localStorage.getItem("token");
    config.headers.site = localStorage.getItem("site");
    JsLoadingOverlay.show({
      spinnerIcon: "ball-atom",
      spinnerColor: "#007bff",
      spinnerSize: "2x",
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosFileApp.interceptors.response.use(
  (response) => {
    JsLoadingOverlay.hide();
    if (!response.data.status) {
      // if (response.data.message.indexOf("token bilgisi geçersiz") >= 0) {
      //       localStorage.clear();
      //       router.push("/login");
      // }
    }
    return response;
  },
  (error) => {
    JsLoadingOverlay.hide();
    console.log(error);
    if (error.response.data == "Token Hatalı") {
      localStorage.clear();
      router.push("/auth/login");
    }
    console.log(error?.response?.data?.statusCode);
    if (error?.response?.data?.statusCode == 401) {
      router.push("/auth/login");
    } else {
      if (error?.response?.data?.message) {
        Swal.fire({
          title: `Hata!`,
          text: `${error?.response?.data.message}.`,
          icon: "error",
          confirmButtonText: "Tamam",
        });
      } else {
        Swal.fire({
          title: `Hata!`,
          text: `${error?.response?.data}.`,
          icon: "error",
          confirmButtonText: "Tamam",
        });
      }
    }

    throw error;
  }
);
