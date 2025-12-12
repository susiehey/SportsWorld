import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";

const endpoint = "http://localhost:5048/athlete";
const endpointImageUpload = "http://localhost:5048/api/imageupload";

const postAthlete = async (athlete: IAthlete, image: File) => {

    const response = await axios.post(endpoint, athlete);

    const formData = new FormData();
    formData.append("file", image);

    const response2 = await axios({
        url: endpointImageUpload,
        method: "POST",
        data: formData,
        headers: {"Content-Type": "multipart/form-data"}
    });

    formData.delete("file");
    //needs try catch

}

export default {postAthlete}