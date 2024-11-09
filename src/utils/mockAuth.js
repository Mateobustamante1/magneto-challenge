const mockUsers = [
    { username: "test1", password: "12345" },
    { username: "test2", password: "12345" }
  ];
  
  export const authenticate = (username, password) => {
    return mockUsers.some(user => user.username === username && user.password === password);
  };