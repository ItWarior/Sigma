const normalizeUser = (userToNormalize: any) => {
  const propertyToRemove: string[] = ['password', '__v'];
  const user: any = userToNormalize.toJSON();

  propertyToRemove.forEach((property: string) => {
    delete user[property];
  });

  return user;
};

export default normalizeUser;
