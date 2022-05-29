import md5 from "md5";

const encrypt = (password) => md5(password);

export default encrypt;
