const users = [
    { id:"alex" , pw:"1234"}
];

export function signIn({ id, password }) {
    const user = users.find(
        (user) => user.id === id && user.pw === password
    );
    if (user === undefined) throw new Error();
    return true;
}