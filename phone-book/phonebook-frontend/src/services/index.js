import axios from "axios";

const baseurl = process.env.REACT_APP_BACKEND_URL;

const getAll = () => {
  return axios.get(baseurl);
};

const addPerson = (person) => {
  return axios.post(baseurl, person);
};

const deletePerson = (id)=>{
    return axios.delete(`${baseurl}/${id}`)
}

const updatePerson = (id,person)=>{
    return axios.put(`${baseurl}/${id}`,person)
}

export default { getAll, addPerson, deletePerson,updatePerson };
