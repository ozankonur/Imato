import { BACKEND_BASE } from "../../config";
import client from "../client"

interface ImageList{
    page: number,
    limit: number
}

const getImageList = (data: ImageList) =>  client.get(`/v2/list?page=${data.page}&limit=${data.limit}`);

const getRandomImage = () => BACKEND_BASE + '/id/167/800/500.jpg?hmac=PUdCM4XkqvXKNj5MlSYNPeJ4ORtVihWHj8z_6RAX0Yc'

export default {getImageList, getRandomImage};