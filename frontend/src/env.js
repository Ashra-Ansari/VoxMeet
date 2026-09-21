let IS_PROD = true;
const server = IS_PROD
  ? "https://voxmeet-0g91.onrender.com/"
  : "http://localhost:8000";

export default server;
