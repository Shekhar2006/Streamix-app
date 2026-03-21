import { axiosInstance } from "./axios";

// signup
export const signup = async (signupData) => {
      const response = await axiosInstance.post("/auth/signup", signupData);
      return response.data;
};

// onboarding
export const completeOnboarding = async (onboardingData) => {
      const response = await axiosInstance.post("/auth/onboarding", onboardingData);
      return response.data;
}

// authUsers
export const getAuthUser = async () => {
      const res = await axiosInstance.get("/auth/me", {
            headers: {
                  "Cache-Control": "no-cache"
            }
      });
      return res.data;
};

// login

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

