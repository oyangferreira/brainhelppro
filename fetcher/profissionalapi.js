const baseURL = "https://brainhelp-c0b63-default-rtdb.firebaseio.com/";

const addProfissional = (user, id) => {
  return fetch(`${baseURL}/profissional/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao adicionar profissional");
    }
    return response.json();
  })
  .catch(error => {
    console.error("Erro ao adicionar profissional:", error);
    throw error;
  });
};

const getProfissional = (id) => {
  return fetch(`${baseURL}/profissional/${id}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao obter profissional");
      }
      return response.json();
    })
    .catch(error => {
      console.error("Erro ao obter profissional:", error);
      throw error;
    });
};

const loadProfissional = () => {
  return fetch(`${baseURL}/profissional.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar profissionais");
      }
      return response.json();
    })
    .then(data => {
      const list = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          list.push(data[key]);
        }
      }
      return list;
    })
    .catch(error => {
      console.error("Erro ao carregar profissionais:", error);
      throw error;
    });
};

export { addProfissional, getProfissional, loadProfissional };
