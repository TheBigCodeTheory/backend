export function jwtSecret() {
  return { secret: process.env.SECRET };
}
