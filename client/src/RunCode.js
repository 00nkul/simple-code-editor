import axios from "axios";

const makeRequest = async (code , language) => {
    let reqConfig = {
        url: `http://localhost:5000/run`,
        method: 'POST',
        data:{code , language}
    }

    try {
        let response = await axios.request(reqConfig);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default makeRequest;