//https://laundry-app-seven.vercel.app/
const UrlGEn = (endpoint) => {
  const url="https://laundry-app-beta.vercel.app/"
  return url+endpoint
}

export default UrlGEn
export const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
}
