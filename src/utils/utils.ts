export const formatTime = (time: any) => {
    const [hour, minute] = time.split(":");
    return `${hour.trim().padStart(2, '0')}:${minute.trim()}`;
};

export const getUserData = () => {
    return JSON.parse(localStorage.getItem("userData") || "{}");
};