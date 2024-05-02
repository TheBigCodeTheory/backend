export const expirationTime = 180000;

export const generateCode = (): string => {
  return String(
    Math.ceil(Math.random() * 9) * 100000 + Math.ceil(Math.random() * 9999),
  );
};

export const isCodeExpired = (createdAt: Date) => {
  const elapsedTime = Date.now() - createdAt.getTime();
  return elapsedTime > expirationTime;
};
