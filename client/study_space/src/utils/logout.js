import axios from "axios";

const logout = async () => {
  try {
    const res = await axios.get("http://localhost:8000/user/logout");
  } catch (e) {
    console.log(e);
  }
};

export default logout;
