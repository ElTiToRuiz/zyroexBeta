import { User } from "../../context/authContext";

type HanddleUser = {
    user: User;
    userList: User[];
    setUserList: (users: User[]) => void;
}

export const handleNewUser = ({user, userList, setUserList}:HanddleUser) => {
    console.log('new user event', user);
    const newUserList = [...userList, user];    
    setUserList(newUserList);
}

export const handleUpdateUser = ({user, userList, setUserList}:HanddleUser) => {
    console.log('user upadate event', user);
    const newUserList = userList.map((u) => u.id === user.id ? user : u);
    setUserList(newUserList);
}

export const handleDeleteUser = ({user, userList, setUserList}:HanddleUser) => {
    console.log('delete user event', user);
    console.log('userList', userList);
    const newUserList = userList.filter((u) => u.id !== user.id);
    console.log('newUserList', newUserList);
    setUserList(newUserList);
}