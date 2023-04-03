export function exclude(user, keys) {
    for (const key of keys) {
        delete user[key];
    }
    return user;
}
//# sourceMappingURL=index.js.map